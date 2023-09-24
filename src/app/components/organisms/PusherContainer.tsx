"use client";
import { GET_MESSAGES_QUERY } from "@/graphql/chat-queries";
import { MessageData } from "@/graphql/types/chat";
import { useApolloClient } from "@apollo/client";
import Pusher from "pusher-js";
import { useEffect } from "react";
const PUSHER_MESSAGE_EVENT = "message";

export default function PusherContainer() {
  const client = useApolloClient();
  useEffect(() => {
    const currentCharacter = localStorage.getItem("currentCharacter");
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

    return () => {
      pusher.unsubscribe(process.env.NEXT_PUBLIC_PUSHER_CHANNEL!);
    };
  }, []);

  return <></>;
}
