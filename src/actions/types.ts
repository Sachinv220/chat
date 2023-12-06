/** @format */
import { Session } from "next-auth";

export enum Response {
  SERVER_ERROR = 500,
}

export type Message = {
  user: Session["user"];
  message: string;
  id: string;
  dateTime: Date;
};

export type Chat = {
  id: string;
  name: string;
  messages: {
    user: {
      name: string | null;
    };
    id: string;
    message: string;
  }[];
  participants: Array<Session["user"]>;
};
