/** @format */

type Chat = {
  name: string;
  id: string;
  participants: {
    name: string | null;
    id: string;
    image: string;
    email: string | null;
  }[];
};
