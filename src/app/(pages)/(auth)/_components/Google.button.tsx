import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";

interface GoogleSignInButtonProps {
  type: "login" | "signup";
}

const GoogleSignInButton = ({ type }: GoogleSignInButtonProps) => {
  return (
    <Button
      onClick={() => signIn()}
      variant={"outline"}
      className="w-full mb-3 mt-4 max-w-lg mx-auto flex items-center justify-center gap-2 !py-6 text-base"
    >
      <Image
        src={"/icons/google.webp"}
        alt="Google Signup on Chaise"
        height={24}
        width={24}
      />
      Sign{type == "login" ? " in" : " up"} with Google
    </Button>
  );
};

export default GoogleSignInButton;
