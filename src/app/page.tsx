"use client";

import ChatCard from "@/app/components/organisms/ChatCard";
import {
  GET_CHARACTERS_COUNT_QUERY,
  GET_CHARACTERS_QUERY,
} from "@/graphql/characters-queries";
import { GET_MESSAGES_QUERY } from "@/graphql/chat-queries";
import { MessageData } from "@/graphql/types/chat";
import { useSuspenseQuery } from "@apollo/client";
import Image from "next/image";
import RickMortyLogo from "public/images/rick-morty-logo.svg";
import PusherContainer from "./components/organisms/PusherContainer";
import { useEffect, useRef } from "react";

export default function App() {
  const { data: messageData } = useSuspenseQuery<{
    getMessages: MessageData[];
  }>(GET_MESSAGES_QUERY, {
    variables: { threadId: process.env.NEXT_PUBLIC_THREAD_ID },
    fetchPolicy: "cache-and-network",
  });

  const messages = messageData.getMessages ?? [];
  const charactersInvolved = messages.map((message) => message.character);

  useSuspenseQuery(GET_CHARACTERS_QUERY, {
    variables: { ids: charactersInvolved },
    context: {
      clientName: "rickMorty",
    },
  });

  const { data: countData } = useSuspenseQuery<{
    characters: { info: Pagination };
  }>(GET_CHARACTERS_COUNT_QUERY, {
    context: {
      clientName: "rickMorty",
    },
  });

  const totalCharacters = countData.characters.info.count;
  const currentCharacter = (
    Math.floor(Math.random() * totalCharacters) + 1
  ).toString();

  const currentCharacterRef = useRef(localStorage.getItem("currentCharacter"));

  useEffect(() => {
    if (currentCharacterRef.current == null) {
      localStorage.setItem("currentCharacter", currentCharacter);
      currentCharacterRef.current = currentCharacter;
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center md:p-24 md:space-y-24 p-12 space-y-12">
      <div className="max-w-[40vw] md:max-w-xs">
        <Image
          src={RickMortyLogo}
          alt="Rick & Morty Logo"
          sizes="100vw"
          className="w-full h-auto"
          priority
        />
      </div>
      <div className="flex flex-col h-[60vh] w-full md:w-3/6">
        <ChatCard
          className="h-full w-full"
          messages={messageData.getMessages ?? []}
          character={currentCharacterRef.current!}
        />
        <PusherContainer currentCharacter={currentCharacterRef.current!} />
      </div>
    </main>
  );
}
