import { DELETE_MESSAGES_MUTATION } from "@/graphql/chat-queries";
import { useMutation } from "@apollo/client";
import { Button } from "@nextui-org/react";

export default function ClearMessagesButton() {
  const [clearMessages, { loading }] = useMutation(DELETE_MESSAGES_MUTATION, {
    variables: {
      threadId: process.env.NEXT_PUBLIC_THREAD_ID,
    },
    update(cache) {
      cache.modify({
        fields: {
          getMessages() {
            return [];
          },
        },
      });
    },
  });

  return (
    <Button
      color="danger"
      variant="bordered"
      size="sm"
      isLoading={loading}
      onClick={() => clearMessages()}
    >
      Clear
    </Button>
  );
}
