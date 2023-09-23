import { makeClient } from "@/graphql/client";
import { ApolloNextAppProvider } from "@apollo/experimental-nextjs-app-support/ssr";

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
