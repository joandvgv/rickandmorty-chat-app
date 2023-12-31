"use client";

import React, { useContext, useMemo } from "react";

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import ChatInput from "@/app/components/atoms/ChatInput";
import ChatInputContainer from "./ChatInputContainer";
import ChatBubble from "@/app/components/atoms/ChatBubble";

import { MessageData } from "@/graphql/types/chat";
import { getCharacterById } from "@/graphql/utils";
import { useApolloClient, useQuery } from "@apollo/client";
import { ChatContext } from "./PusherContainer";
import { GET_CHARACTERS_QUERY } from "@/graphql/characters-queries";
import { GET_MESSAGES_QUERY } from "@/graphql/chat-queries";
import { Skeleton } from "@nextui-org/skeleton";
import ClearMessagesButton from "../atoms/ClearMessagesButton";
import useScrollBottom from "@/app/hooks/useScrollBottom";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export default function ChatCard(props: Props) {
  const client = useApolloClient();
  const { currentCharacter } = useContext(ChatContext);

  const { data: messageData, loading } = useQuery<{
    getMessages: MessageData[];
  }>(GET_MESSAGES_QUERY, {
    variables: { threadId: process.env.NEXT_PUBLIC_THREAD_ID },
  });

  const messages = messageData?.getMessages ?? [];
  const charactersInvolved = messages.map((message) => message?.character);

  useQuery(GET_CHARACTERS_QUERY, {
    variables: { ids: charactersInvolved },
    context: {
      clientName: "rickMorty",
    },
  });
  const memoizedMessages = useMemo(() => [messages.length], [messages.length]);
  const chatContainerRef = useScrollBottom(memoizedMessages);

  return (
    <Card className={props.className}>
      <CardHeader className="grid grid-flow-col justify-between items-center gap-3">
        <div className="flex flex-col">
          <p className="text-small">Current Channel</p>
          <p className="text-small text-default-500">
            #travellers-from-other-universe
          </p>
        </div>
        <div className="flex justify-end col-span-2">
          {currentCharacter === "1" && <ClearMessagesButton />}
        </div>
      </CardHeader>
      <Divider />
      <Skeleton
        ref={chatContainerRef}
        isLoaded={!loading}
        className="h-full overflow-auto"
      >
        <CardBody className="space-y-2">
          {messages.map(({ message, id, character, time }: MessageData) => {
            const { image, name } = getCharacterById(client, character);
            return (
              <ChatBubble
                key={id}
                message={message}
                image={image}
                time={time}
                name={name}
                type={character === currentCharacter ? "end" : "start"}
              />
            );
          })}
        </CardBody>
      </Skeleton>

      <Divider />
      <CardFooter className="py-5">
        <ChatInputContainer character={currentCharacter!}>
          <ChatInput />
        </ChatInputContainer>
      </CardFooter>
    </Card>
  );
}
