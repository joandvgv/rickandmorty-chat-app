import ChatCard from "@/components/organisms/ChatCard";
import Image from "next/image";
import RickMortyLogo from "public/images/rick-morty-logo.svg";

export default function Home() {
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
        <ChatCard className="h-full w-full" />
      </div>
    </main>
  );
}
