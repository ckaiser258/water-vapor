// [[...id]] so that we can add subsequent routes after this and if needed and include /profile.
//  ex: '/profile/1/games'

import { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { NextPage } from "next";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import User from "../../components/users/User";
import { Query } from "../../generated/graphql";
import GameForm from "../../components/games/GameForm";
import FolderForm from "../../components/folders/FolderForm";

const GAMES_BY_USER_QUERY = gql`
  query gamesByUser($userId: ID!) {
    getGamesByUser(userId: $userId) {
      id
      title
      description
      createdAt
      updatedAt
    }
    getFolders(userId: $userId) {
      id
      name
    }
  }
`;

const ProfilePage: NextPage = () => {
  const router = useRouter();
  const [session, loading] = useSession();
  const { data, error } = useQuery<Query>(GAMES_BY_USER_QUERY, {
    variables: {
      userId: session?.userId,
    },
    // Prevent a 400 error from Apollo on initial render
    skip: !session?.userId,
  });

  useEffect(() => {
    // If not logged in, redirect to login page
    if (!session?.userId && !loading) {
      router.push("/login");
    }
  }, [session, router, loading]);

  const { getGamesByUser, getFolders } = data || {};

  if (error) console.error(error);

  return (
    <>
      {loading && <p>Loading...</p>}
      <User user={session?.user} />
      <ul>
        {getGamesByUser?.map((game) => (
          <li key={game.id}>{game.title}</li>
        ))}
      </ul>
      {getGamesByUser && getFolders && (
        <>
          <FolderForm games={getGamesByUser} />
          <GameForm folders={getFolders} />
        </>
      )}
    </>
  );
};

// **NOTE**: Leaving this here as an example of how to query gql with variables in getServerSideProps:

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const session = await getSession(context);
//   // If not signed in, redirect to login page
//   if (!session || !session.user) {
//     return { redirect: { destination: "/login", permanent: false } };
//   }

//   const { data, loading, error } = await client.query({
//     query: GAMES_BY_USER_QUERY,
//     variables: { userId: session.userId },
//   });
//   const currentUserGames = data.getGamesByUser;

//   const props = {
//     session,
//     currentUserGames,
//     loading,
//     error: error ? error : null,
//   };
//   return { props };
// };

export default ProfilePage;
