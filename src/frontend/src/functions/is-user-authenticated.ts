const IsUserAuthenticated = (accessToken: string): boolean => {
  if(accessToken !== "") {
      return true;
  }

  return false;
};

export default IsUserAuthenticated;