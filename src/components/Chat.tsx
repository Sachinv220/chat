/** @format */

import React from "react";

interface Props {
  chat: Chat;
}

const Chat: React.FC<Props> = ({ chat }) => {
  return (
    <div className="bg-slate-200 dark:bg-slate-900 px-1 pt-2 h-16">
      <h1 className="font-semibold text-xl">{chat.name}</h1>
    </div>
  );
};

export default Chat;
