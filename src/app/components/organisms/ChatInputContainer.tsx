"use client";

import { NEW_MESSAGE_FRAGMENT } from "@/graphql/characters-queries";
import { PUT_MESSAGE_QUERY } from "@/graphql/chat-queries";
import { useMutation } from "@apollo/client";
import { startTransition } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

type Props = {
  children?: React.ReactNode;
  className?: string;
  character: string;
};

export default function ChatInputContainer(props: Props) {
  const formMethods = useForm({ mode: "all" });
  const [sendMessage] = useMutation(PUT_MESSAGE_QUERY, {
    update(cache, { data }) {
      const dataToPut = {
        ...data.putMessage,
        __typename: "Message",
      };

      cache.modify({
        fields: {
          getMessages(existingMessages = []) {
            const newMessageRef = cache.writeFragment({
              data: dataToPut,
              fragment: NEW_MESSAGE_FRAGMENT,
            });
            return [...existingMessages, newMessageRef];
          },
        },
      });
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (fieldsData, event) => {
    formMethods.reset();
    const id = uuidv4();

    startTransition(() => {
      sendMessage({
        variables: {
          message: fieldsData.message,
          character: props.character,
          threadId: process.env.NEXT_PUBLIC_THREAD_ID,
        },
        optimisticResponse: {
          putMessage: {
            __typename: "Message",
            id,
            character: props.character,
            message: fieldsData.message,
            time: Date.now().toString(),
          },
        },
      });
    });
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)} className="w-full">
        {props.children}
      </form>
    </FormProvider>
  );
}
