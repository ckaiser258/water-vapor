import { User } from ".prisma/client";

const getUserById = async (parent, args, context) => {
  const user: User = context.prisma.user.findUnique({
    where: {
      id: args.id,
    },
  });
  return user;
};

export default getUserById;
