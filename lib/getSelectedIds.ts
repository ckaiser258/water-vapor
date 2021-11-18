const getSelectedIds = (args: Record<string, boolean>) => {
  return Object.keys(args)
    .filter((gameId) => args[gameId])
    .map((gameId) => ({ id: gameId }));
};

export default getSelectedIds;
