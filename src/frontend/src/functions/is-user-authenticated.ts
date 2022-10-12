const isUserAuthenticated = (accessToken: string): boolean => {
  if(accessToken !== "") {
      return true;
  }

  return false;
};

export default isUserAuthenticated;