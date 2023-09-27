/** @format */

export type Message = {
  user: {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
  };
  message: string;
  id: string;
  dateTime: Date;
};

export type Chat = {
  id: string;
  name: string;
  participants: {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
  }[];
};
