import { gql } from "@apollo/client";

export const GET_MESSAGES_QUERY = gql`
  query GetMessages($threadId: String!) {
    getMessages(threadId: $threadId) {
      character
      message
      time
    }
  }
`;
