import React from "react";

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import ChatInput from "@/app/components/atoms/ChatInput";
import ChatInputContainer from "./ChatInputContainer";
import ChatBubble from "@/app/components/atoms/ChatBubble";

import { MessageData } from "@/graphql/types/chat";
import { getCharacterById } from "@/graphql/utils";
import PusherContainer from "./PusherContainer";
import { useApolloClient } from "@apollo/client";

type Props = {
  children?: React.ReactNode;
  className?: string;
  messages: MessageData[];
};

export default function ChatCard(props: Props) {
  const client = useApolloClient();
  return (
    <Card className={props.className}>
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-small">Current Channel</p>
          <p className="text-small text-default-500">
            #travellers-from-other-universe
          </p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="space-y-2">
        {props.messages.map(({ message, id, character, time }: any) => {
          const { image, name } = getCharacterById(client, character);
          return (
            <ChatBubble
              key={id}
              message={message}
              image={image}
              time={time}
              name={name}
            />
          );
        })}
      </CardBody>
      <Divider />
      <CardFooter>
        <ChatInputContainer>
          <ChatInput />
        </ChatInputContainer>
      </CardFooter>
    </Card>
  );
}
