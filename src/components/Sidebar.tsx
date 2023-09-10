import { Input } from "./ui/input";
import UserNav from "./UserNav";
import { FC } from "react";

interface Props {
  name?: string;
  email?: string;
  image?: string;
}

const Sidebar: FC<Props> = ({ name, email, image }) => {
  return (
    <nav className="flex flex-col w-3/12 h-screen px-1 shadow-md border-r-2">
      <form className="flex w-full gap-1 h-20 shadow-sm">
        <Input
          type="email"
          placeholder="Chat with a friend"
          className="mt-5 w-full shadow-md"
        />
      </form>
      <div className="mt-auto">
        <UserNav image={image} name={name} email={email} />
      </div>
    </nav>
  );
};

export default Sidebar;
