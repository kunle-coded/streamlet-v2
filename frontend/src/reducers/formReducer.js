export const initialFormState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  existingEmail: "",
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
    case "loggedIn":
      return { ...state, status: "authorised" };
    default:
      throw new Error("Unknown action");
  }
}
