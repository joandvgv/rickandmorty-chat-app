import React from "react";

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import ChatInput from "@/components/atoms/ChatInput";
import ChatInputContainer from "./ChatInputContainer";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export default function ChatCard(props: Props) {
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
        <p>Chat messages</p>
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
