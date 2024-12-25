import React from "react";
import { auth } from "@/auth";
import Image from "next/image";
import SignIn from "./SignIn";
import SignOut from "./SignOut";

const Header = async () => {
  const session = await auth();
  console.log(session);
  return (
    <div>
      {session?.user ? (
        <div className="flex gap-5">
          <div>{session?.user?.name}</div> |
          <Image
            src={session?.user?.image}
            alt={session?.user?.name}
            width={32}
            height={32}
            className="rounded-full"
          />{" "}
          |
          <SignOut />
        </div>
      ) : (
        <SignIn />
      )}
    </div>
  );
};

export default Header;
