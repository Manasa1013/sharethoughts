import { Link } from "react-router-dom";
import { useState } from "react";
import { showToast } from "../../features/toast/toastSlice";
import { useDispatch } from "react-redux";
import { signupHandler } from "../../features/authentication/authenticationSlice";
export const Signup = () => {
  const dispatch = useDispatch();

  const [field, setField] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });
  const [errorField, setErrorField] = useState({
    firstNameError: "",
    lastNameError: "",
    userNameError: "",
    passwordError: "",
  });
  const nameRegexPattern = new RegExp(
    "^(?=.{5,14}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$"
  );

  const passwordRegexPattern = new RegExp(
    "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,18}$",
    "i"
  );
  function handleSubmit(e) {
    e.preventDefault();

    console.log(field);
    submitHandler();
  }
  async function submitHandler() {
    //if there are any errors,show message

    if (
      errorField.firstNameError.length > 0 ||
      errorField.lastNameError.length > 0 ||
      errorField.userNameError.length > 0 ||
      errorField.passwordError.length > 0
    ) {
      dispatch(showToast("Please correct errors at the fields"));
      return;
    } else if (
      //if fields are not entered with details,show messae
      field.firstName.length <= 0 ||
      field.lastName.length <= 0 ||
      field.username.length <= 0 ||
      field.password.length <= 0
    ) {
      dispatch(showToast("Please enter details"));
      return;
    } else {
      let data = await dispatch(
        signupHandler({
          firstName: field.firstName,
          lastName: field.lastName,
          username: field.username,
          password: field.password,
        })
      );
      console.log(data);
      if (data.error) dispatch(showToast(data.payload));
      else {
        dispatch(
          showToast(
            "Successfully signed up",
            data.payload?.createdUser.firstName
          )
        );
        resetValues();
      }
    }
  }
  function resetValues() {
    setField((prev) => ({
      ...prev,
      firstName: "",
      lastName: "",
      username: "",
      password: "",
    }));
  }
  function validateFields(
    regexPattern,
    fieldName,
    errorName,
    errorText,
    errorField,
    setErrorField
  ) {
    let errorFieldName = Object.keys(errorField).find(
      (item) => item === errorName
    );
    if (regexPattern.test(fieldName)) {
      // console.log("pattern matched", errorFieldName);
      setErrorField((prev) => {
        return { ...prev, [errorFieldName]: "" };
      });
    } else {
      // console.log("pattern not matched", errorFieldName);
      setErrorField((prev) => {
        // console.log(errorName, errorText, "printing at line 34");
        return { ...prev, [errorFieldName]: errorText };
      });
    }
  }
  return (
    <div className="flex min-h-full items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-1 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign up
          </h2>
        </div>
        <form className="mt-2 space-y-4" onSubmit={(e) => handleSubmit(e)}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label
                htmlFor="first-name"
                className="text-gray-900 block pr-3 py-2 text-sm md:text-base"
              >
                First Name
              </label>
              <input
                id="first-name"
                name="first-name"
                value={field.firstName}
                type="text"
                required
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                placeholder="James"
                onInput={(e) => {
                  // console.log(e.target.value, "firstName");
                  return setField((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }));
                }}
                onBlur={(e) => {
                  // console.log("the username field lost focus");
                  let errorAlertMessage =
                    "Must have atleast 5-14 characters and includes only .,_";
                  validateFields(
                    nameRegexPattern,
                    field.firstName,
                    "firstNameError",
                    errorAlertMessage,
                    errorField,
                    setErrorField
                  );
                }}
              />
              <p className="text-sm text-pink-600">
                {errorField.firstNameError}
              </p>
            </div>
            <div>
              <label
                htmlFor="last-name"
                className="text-gray-900 block pr-3 py-2 text-sm md:text-base"
              >
                Last Name
              </label>
              <input
                id="last-name"
                name="last-name"
                type="text"
                value={field.lastName}
                required
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                placeholder="Cameron"
                onInput={(e) => {
                  // console.log(e.target.value, "username");
                  return setField((prev) => ({
                    ...prev,
                    lastName: e.target.value,
                  }));
                }}
                onBlur={(e) => {
                  // console.log("the username field lost focus");
                  let errorAlertMessage =
                    "Must have atleast 5-14 characters and includes only .,_";
                  validateFields(
                    nameRegexPattern,
                    field.lastName,
                    "lastNameError",
                    errorAlertMessage,
                    errorField,
                    setErrorField
                  );
                }}
              />
              <p className="text-sm text-pink-600">
                {errorField.lastNameError}
              </p>
            </div>

            <div>
              <label
                htmlFor="user-name"
                className="text-gray-900 block pr-3 py-2 md:text-base text-sm"
              >
                User Name
              </label>
              <input
                id="user-name"
                name="user-name"
                type="text"
                value={field.username}
                autoComplete="username"
                required
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                placeholder="James_Cameron"
                onInput={(e) => {
                  // console.log(e.target.value, "username");
                  return setField((prev) => ({
                    ...prev,
                    username: e.target.value,
                  }));
                }}
                onBlur={(e) => {
                  // console.log("the username field lost focus");
                  let errorAlertMessage =
                    "Must have atleast 5-14 characters and includes only .,_";
                  validateFields(
                    nameRegexPattern,
                    field.username,
                    "userNameError",
                    errorAlertMessage,
                    errorField,
                    setErrorField
                  );
                }}
              />
              <p className="text-sm text-pink-600">
                {errorField.userNameError}
              </p>
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-gray-900 block pr-3 pb-2 pt-2 text-sm md:text-base"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={field.password}
                autoComplete="current-password"
                required
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                placeholder="theWay^OfWater2"
                onInput={(e) => {
                  // console.log(e.target.value, "username");
                  return setField((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }));
                }}
                onBlur={(e) => {
                  // console.log("the username field lost focus");
                  let errorAlertMessage =
                    "Must have 8 to 18 characters with one capital and one special character";
                  validateFields(
                    passwordRegexPattern,
                    field.password,
                    "passwordError",
                    errorAlertMessage,
                    errorField,
                    setErrorField
                  );
                }}
              />
              <p className="text-sm text-pink-600">
                {errorField.passwordError}
              </p>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-teal-600/100 py-2 px-4 text-sm font-semibold text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              Sign up
            </button>
          </div>
          <div>
            <button
              type="button"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-teal-600/100 py-2 px-4 text-sm font-semibold text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              onClick={(e) => {
                setField((prev) => ({
                  ...prev,
                  firstName: "Taylor",
                  lastName: "Swift",
                  username: "taylor_swift",
                  password: "Taylor@1",
                }));
                handleSubmit(e);
              }}
            >
              Sign up as Guest
            </button>
          </div>
        </form>
        <div
          style={{ margin: "0.5rem 0.25rem" }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center ">
            <p className="text-gray-700 text-sm">Have an account already?</p>
            <Link className="text-teal-700 font-medium pl-2" to="/login">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
