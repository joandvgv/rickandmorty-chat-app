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

export const GET_CHARACTERS_COUNT_QUERY = gql`
  query GetCharacters {
    characters {
      info {
        count
      }
    }
  }
`;

export const NEW_MESSAGE_FRAGMENT = gql`
  fragment NewMessage on Message {
    id
    message
    time
    character
  }
`;

export const GET_CHARACTER_BY_ID_FRAGMENT = gql`
  fragment MyCharacter on Character {
    id
    image
    name
  }
`;
