import React from "react";

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import ChatInput from "@/components/atoms/ChatInput";
import ChatInputContainer from "./ChatInputContainer";
import { getClient } from "@/lib/client";
import { GET_MESSAGES_QUERY } from "@/graphql/chat-queries";
import ChatBubble from "../atoms/ChatBubble";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

type QueryData = {
  getMessages: {
    message: string;
    character: string;
    time: string;
  }[];
};

export default async function ChatCard(props: Props) {
  const client = getClient();
  const { data } = await client.query<QueryData>({
    query: GET_MESSAGES_QUERY,
    variables: {
      threadId: "chat",
    },
  });

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
      <CardBody>
        {data.getMessages.map(({ message }: any) => {
          return <ChatBubble key={message} message={message} />;
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
