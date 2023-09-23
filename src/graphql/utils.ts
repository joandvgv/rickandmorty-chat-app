// import { RickMortyClient } from "@/graphql/client";

import { ApolloClient } from "@apollo/client";
import { GET_CHARACTER_BY_ID_FRAGMENT } from "./characters-queries";

export const getCharacterById = (client: ApolloClient<object>, id: string) => {
  return (
    client.readFragment({
      id: `Character:${id}`,
      fragment: GET_CHARACTER_BY_ID_FRAGMENT,
    }) ?? {}
  );
};
