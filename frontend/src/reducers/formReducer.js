export const initialFormState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  existingEmail: "",
  loginErrorMessage: "",
  signupSuccessMessage: "",
  token: "",
  userRating: [],
  userExists: false,
  status: "unauthorised",
};

export function formReducer(state = initialFormState, action) {
  switch (action.type) {
    case "username":
      return { ...state, username: action.payload };
    case "email":
      return { ...state, email: action.payload };
    case "password":
      return { ...state, password: action.payload };
    case "confirmPassword":
      return { ...state, confirmPassword: action.payload };
    case "registered":
      return { ...state, existingEmail: action.payload };
    case "userExists":
      return { ...state, userExists: action.payload };
    case "error":
      return { ...state, loginErrorMessage: action.payload };
    case "signupSuccessful":
      return { ...state, signupSuccessMessage: action.payload };
    case "loggedIn":
      return { ...state, status: "authorised" };
    case "allow":
      return { ...state, token: action.payload };
    case "rating":
      return { ...state, userRating: action.payload };
    default:
      throw new Error("Unknown action");
  }
}
