export const initialSearchState = {
  results: [],
  query: "",
  searchQuery: "",
  token: "",
  searchStatus: "start",
};

export function searchReducer(state = initialSearchState, action) {
  switch (action.type) {
    case "query":
      return { ...state, query: action.payload };
    case "searchQuery":
      return { ...state, searchQuery: action.payload };
    case "results":
      return { ...state, results: action.payload };
    case "searching":
      return { ...state, searchStatus: "loading" };
    case "loaded":
      return { ...state, searchStatus: "ready" };
    default:
      throw new Error("Unknown action");
  }
}
