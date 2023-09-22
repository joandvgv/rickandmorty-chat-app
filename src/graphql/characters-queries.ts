import { gql } from "@apollo/client";

export const GET_CHARACTERS_QUERY = gql`
  query GetCharacters($ids: [ID!]!) {
    charactersByIds(ids: $ids) {
      id
      name
      image
    }
  }
`;

export const GET_CHARACTER_BY_ID_FRAGMENT = gql`
  fragment MyCharacter on Character {
    id
    image
    name
  }
`;
