/** @format */
"use client";

import { Chat, Message } from "@/actions/types";
import { ReactNode, createContext, useContext } from "react";

type Props = {
  children: ReactNode;
  value: ContextType;
};

export type ContextType = {
  chats: Chat[];
};

const DataContext = createContext<ContextType>({
  chats: [],
});

export function DataProvider({ children, value }: Props) {
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useChatData() {
  return useContext(DataContext);
}
