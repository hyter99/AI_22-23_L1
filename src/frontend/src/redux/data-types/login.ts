interface Login {
  accessToken: string;
  user: {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

export type AdminLogin = Login;