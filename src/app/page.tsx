"use client";

import ChatCard from "@/app/components/organisms/ChatCard";
import Image from "next/image";
import RickMortyLogo from "public/images/rick-morty-logo.svg";
import PusherContainer from "./components/organisms/PusherContainer";
import { Suspense } from "react";
import { Skeleton } from "@nextui-org/skeleton";

export default function App() {
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
        <Suspense
          fallback={
            <Skeleton className="rounded-lg">
              <div className="h-[60vh] rounded-lg bg-default-300">LOADING</div>
            </Skeleton>
          }
        >
          <PusherContainer>
            <ChatCard className="h-full w-full" />{" "}
          </PusherContainer>
        </Suspense>
      </div>
    </main>
  );
}
