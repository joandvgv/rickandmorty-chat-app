"use client";
import useCurrentCharacter from "@/app/hooks/currentCharacter";
import { GET_MESSAGES_QUERY } from "@/graphql/chat-queries";
import { MessageData } from "@/graphql/types/chat";
import { useApolloClient } from "@apollo/client";
import Pusher from "pusher-js";
import { useEffect, createContext, useMemo } from "react";
const PUSHER_MESSAGE_EVENT = "message";
const PUSHER_DELETE_EVENT = "bulkDelete";

type Props = {
  children?: React.ReactNode;
};

export const ChatContext = createContext<Partial<{ currentCharacter: string }>>(
  {}
);

export default function PusherContainer(props: Props) {
  const client = useApolloClient();
  const currentCharacter = useCurrentCharacter();
  const contextValue = useMemo(
    () => ({ currentCharacter }),
    [currentCharacter]
  );

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_CLIENT_ID!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    const channel = pusher.subscribe(process.env.NEXT_PUBLIC_PUSHER_CHANNEL!);

    channel.bind(PUSHER_MESSAGE_EVENT, (data: MessageData) => {
      if (data.character === currentCharacter) return;

      const queryData = client.readQuery<{ getMessages: MessageData[] }>({
        query: GET_MESSAGES_QUERY,
        variables: {
          threadId: process.env.NEXT_PUBLIC_THREAD_ID,
        },
      });
      const currentData = queryData?.getMessages ?? [];

      client.writeQuery({
        query: GET_MESSAGES_QUERY,
        data: {
          getMessages: [...currentData, { ...data, __typename: "Message" }],
        },
        variables: {
          threadId: process.env.NEXT_PUBLIC_THREAD_ID,
        },
      });
    });

    channel.bind(PUSHER_DELETE_EVENT, () => {
      client.writeQuery({
        query: GET_MESSAGES_QUERY,
        data: {
          getMessages: [],
        },
        variables: {
          threadId: process.env.NEXT_PUBLIC_THREAD_ID,
        },
      });
    });

    return () => {
      pusher.unsubscribe(process.env.NEXT_PUBLIC_PUSHER_CHANNEL!);
    };
  }, [currentCharacter]);

  if (!currentCharacter) return null;

  return (
    <ChatContext.Provider value={contextValue}>
      {props.children}
    </ChatContext.Provider>
  );
}
