"use client";
import { ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";
import {
  NextSSRApolloClient,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";

export function makeClient() {
  const chatLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
  });

  const rickMortyLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_RICK_MORTY_CLIENT_URI,
  });

  const link = ApolloLink.split(
    (operation) => operation.getContext().clientName === "rickMorty",
    rickMortyLink,
    chatLink
  );

  const ssrLink = ApolloLink.from([
    new SSRMultipartLink({
      stripDefer: true,
    }),
    link,
  ]);

  const isServer = typeof window === "undefined";

  return new NextSSRApolloClient({
    cache: new InMemoryCache(),
    connectToDevTools: process.env.NODE_ENV !== "production",
    link: isServer ? ssrLink : link,
  });
}
