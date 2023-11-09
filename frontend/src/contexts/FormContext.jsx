/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";
import { initialFormState, formReducer } from "../reducers/formReducer";
import { initialSearchState, searchReducer } from "../reducers/searchReducer";
import { useNavigate } from "react-router-dom";

const FormContext = createContext();

function FormProvider({ children }) {
  const [
    {
      username,
      email,
      password,
      confirmPassword,
      loginErrorMessage,
      userExists,
      existingEmail,
      signupSuccessMessage,
      token,
      status,
      userRating,
    },
    formDispatch,
  ] = useReducer(formReducer, initialFormState);

  const [{ query, searchQuery, results, searchStatus }, searchDispatch] =
    useReducer(searchReducer, initialSearchState);

  const navigate = useNavigate();

  //   Functions

  // 1- form inputs handler
  function onFormInput(input) {
    if (input.name === "Username") {
      formDispatch({ type: "username", payload: input.value });
    }
    if (input.name === "Email") {
      formDispatch({ type: "email", payload: input.value });
      if (existingEmail !== email) {
        formDispatch({ type: "userExists", payload: false });
      }
    }
    if (input.name === "Password") {
      formDispatch({ type: "password", payload: input.value });
      formDispatch({ type: "error", payload: "" });
    }
    if (input.name === "Confirm password") {
      formDispatch({ type: "confirmPassword", payload: input.value });
    }
  }

  //   2- Sign up form handler
  const signupFormData = {
    username: username,
    email: email,
    password: password,
    confirmPassword: confirmPassword,
  };

  const postOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signupFormData),
  };

  async function onFormSubmit(e) {
    e.preventDefault();
    const formName = e.target.name;

    if (formName === "signup") {
      if (!(username && email && password)) return;

      try {
        const res = await fetch("/api/signup", postOptions);

        const data = await res.json();

        if (res.status === 409) {
          formDispatch({ type: "userExists", payload: true });
          formDispatch({ type: "registered", payload: data.userEmail });

          // setSuccessMessage("");
        } else {
          formDispatch({ type: "userExists", payload: false });
          formDispatch({ type: "signupSuccessful", payload: data.message });
          navigate("/user/success");
          // resetUserData();
          // setSuccessMessage(data);
          // setIsSuccess(true);
          // setIsSignup(false);
        }
      } catch (err) {
        console.log(err);
      }
    } else if (formName === "login") {
      try {
        const res = await fetch("/api/login", postOptions);
        console.log(res.status);

        if (res.status === 201) {
          formDispatch({ type: "success", payload: "authorised" });
          formDispatch({ type: "error", payload: "" });
          navigate("/");
        } else {
          const error = await res.text();
          formDispatch({ type: "error", payload: error });
          formDispatch({ type: "failure", payload: "unauthorised" });
        }

        const data = await res.text();
        formDispatch({ type: "allow", payload: data });
      } catch (err) {
        console.log(err);
        formDispatch({ type: "failure", payload: "unauthorised" });
      }
    }
  }

  // 3- Movie search query handler
  function onSearchQuery(input) {
    searchDispatch({ type: "query", payload: input });
  }

  //   4- Movie search handler
  const searchData = {
    query,
  };

  const searchPostOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(searchData),
  };

  const searchMovies = async () => {
    try {
      searchDispatch({ type: "searching" });
      const res = await fetch("/api/search", searchPostOptions);

      if (!res.ok) {
        throw new Error("Failed to load movies, please retry!");
      }

      const data = await res.json();
      const results = data.results;
      searchDispatch({ type: "results", payload: results });
      searchDispatch({ type: "loaded" });
    } catch (err) {
      console.log(err.message);
    }
  };

  //   5- Add user rating
  const onRateMovie = async (id, rating) => {
    if (status === "unauthorised") {
      return navigate("/user/login");
    }

    const ratingData = {
      movieId: id,
      rating: rating,
    };

    const ratingPostOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(ratingData),
    };

    try {
      const res = await fetch("/api/rating", ratingPostOptions);

      if (!res.ok) {
        throw new Error("Failed to load movies, please retry!");
      }

      const data = await res.json();
      formDispatch({ type: "rating", payload: data.userRating });
      // setUserRating(data.userRating);
    } catch (err) {
      console.log(err.message);
    }
  };

  function onMovieSearch() {
    searchMovies();
    searchDispatch({ type: "searchQuery", payload: query });
    searchDispatch({ type: "query", payload: "" });
  }

  const contextValue = {
    username,
    email,
    password,
    confirmPassword,
    loginErrorMessage,
    userExists,
    existingEmail,
    signupSuccessMessage,
    token,
    status,
    userRating,
    query,
    searchQuery,
    results,
    searchStatus,
    onFormInput,
    onSearchQuery,
    onFormSubmit,
    onMovieSearch,
    onRateMovie,
  };

  return (
    <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
  );
}

function useForms() {
  const context = useContext(FormContext);

  if (context === undefined)
    throw new Error("FormContext was used out of the FormProvider");
  return context;
}

export { FormProvider, useForms };
