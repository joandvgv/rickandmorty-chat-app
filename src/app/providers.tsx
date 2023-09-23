"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ApolloWrapper } from "./components/ApolloWrapper";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <ApolloWrapper> {children}</ApolloWrapper>
    </NextUIProvider>
  );
}
