import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/client";
import { useRouter } from "next/router";

const LoginPage: React.FC = () => {
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
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
