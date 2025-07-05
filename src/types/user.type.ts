interface IRegisterUser {
  name: string;
  email: string;
  password: string;
}

interface ILoginUser {
  email: string;
  password: string;
}

interface IUpdateMe {
  name: string;
  email: string;
}

interface IChangeMePassword {
  current_password: string;
  password: string;
}

export { IRegisterUser, ILoginUser, IUpdateMe, IChangeMePassword };
