import { useEffect } from "react";
import { signIn, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { NextPage } from "next";

const LoginPage: NextPage = () => {
  const [session] = useSession();
  const router = useRouter();

  useEffect(() => {
    // If the user is already logged in, redirect to home page
    if (session?.userId) {
      router.push("/");
    }
  }, [session, router]);

  return (
    <div>
      <button onClick={() => signIn("github")}>Sign in with GitHub</button>
    </div>
  );
};

export default LoginPage;
