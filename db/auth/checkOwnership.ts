import { AuthenticationError } from "apollo-server-errors";
import { AppContext } from "../../types";

const checkOwnership = <T extends { userId: string }>(
  context: AppContext,
  objectToCheck: T
) => {
  if (
    //Not logged in
    !context.token ||
    // Not the same user and/or object doesn't exist
    !objectToCheck ||
    // Double check not the same user in the case the prisma query doesn't look for that itself
    objectToCheck.userId !== context.token.sub
  ) {
    throw new AuthenticationError("Not authorized");
  }
};

export default checkOwnership;
