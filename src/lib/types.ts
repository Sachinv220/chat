/** @format */

import { type } from "os";

export type Chat = {
  name: string;
  id: string;
  participants: {
    name: string | null;
    id: string;
    image: string;
    email: string | null;
  }[];
};

export type Message = {
  id: string;
  message: string;
  dateTime: Date;
  user: {
    image: string | null;
    id: string;
    name: string | null;
    email: string | null;
  };
};
