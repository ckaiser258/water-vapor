export interface User {
  id: number;
  name: string;
  email: string;
  emailVerified: Date;
  image: String;
  games: Game[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Game {
  id: string;
  createdAt: Date;
  title: string;
  description: string;
  user?: User;
  userId?: number;
}
