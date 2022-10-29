interface Login {
  accessToken: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

export type AdminLogin = Login;