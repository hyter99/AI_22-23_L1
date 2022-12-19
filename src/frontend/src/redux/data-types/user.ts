export interface ILogin {
  accessToken: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    balanceCents: number;
  };
}

export interface INewUserData {
  firstName: string;
  lastName: string;
  email: string | null;
}