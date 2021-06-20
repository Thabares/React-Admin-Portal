import UserData from '../Data/UserData';
import ResponseCodes from '../Data/ResponseCodes';

export function verify(userObj) {
  const { email, password } = userObj;
  let responseCode = ResponseCodes.code.userNotFound;
  let user = UserData.users.find((x) => x.email === email);
  if (user !== undefined && user !== null) {
    responseCode = ResponseCodes.code.userFound;
    if (user.password === password) {
      responseCode = ResponseCodes.code.validUser;
      localStorage.setItem('userDetails', JSON.stringify(user));
    }
  }
  return responseCode;
}
