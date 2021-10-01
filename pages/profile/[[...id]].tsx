// [[...id]] so that we can add subsequent routes after this and if needed and include /profile.
//  ex: '/profile/1/games'

import { getSession, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React from "react";
import User from "../../components/user";

const ProfilePage = () => {
  const router = useRouter();
  const [session, loading] = useSession();
  return !session && !loading ? (
    router.push("/login")
  ) : (
    <User user={session?.user} />
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  return {
    props: { session },
  };
};

export default ProfilePage;
