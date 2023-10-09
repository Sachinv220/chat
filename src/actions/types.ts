/** @format */
import { Session } from "next-auth";

export type Message = {
  user: Session["user"];
  message: string;
  id: string;
  dateTime: Date;
};

export type Chat = {
  id: string;
  name: string;
  participants: Array<Session["user"]>;
};

