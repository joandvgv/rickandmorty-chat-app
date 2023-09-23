import ChatCard from "@/app/components/organisms/ChatCard";
import { GET_CHARACTERS_QUERY } from "@/graphql/characters-queries";
import { GET_MESSAGES_QUERY } from "@/graphql/chat-queries";
import { MessageData } from "@/graphql/types/chat";
import { ChatClient, RickMortyClient } from "@/lib/client";
import Image from "next/image";
import RickMortyLogo from "public/images/rick-morty-logo.svg";

export default async function App() {
  const chatclient = ChatClient();
  const rickMortyClient = RickMortyClient();

  const { data: messageData } = await chatclient.query<{
    getMessages: MessageData[];
  }>({
    query: GET_MESSAGES_QUERY,
    variables: {
      threadId: "chat",
    },
  });
  const messages = messageData?.getMessages ?? [];
  const charactersInvolved = messages.map((message) => message.character);

  await rickMortyClient.query<Character[]>({
    query: GET_CHARACTERS_QUERY,
    variables: { ids: charactersInvolved },
  });

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
        />
      </div>
    </main>
  );
}
