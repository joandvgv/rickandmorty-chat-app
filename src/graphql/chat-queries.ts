import { gql } from "@apollo/client";

export const GET_MESSAGES_QUERY = gql`
  query getMessages {
    getMessages(threadId: "chat") {
      character
      message
      time
    }
  }
`;
