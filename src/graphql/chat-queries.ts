import { gql } from "@apollo/client";

export const GET_MESSAGES_QUERY = gql`
  query GetMessages($threadId: String!) {
    getMessages(threadId: $threadId) {
      id
      character
      message
      time
    }
  }
`;

export const PUT_MESSAGE_QUERY = gql`
  mutation SendMessage(
    $threadId: String!
    $message: String!
    $character: String!
  ) {
    putMessage(threadId: $threadId, message: $message, character: $character) {
      message
      time
      character
    }
  }
`;
