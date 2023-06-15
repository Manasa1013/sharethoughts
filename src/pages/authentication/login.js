import { Link } from "react-router-dom";
import { useState } from "react";
import { LockClosedIcon } from "@heroicons/react/20/solid";
export const Login = () => {
  const [loginField, setLoginField] = useState({
    userName: "kritinandana@gmail.com",
    password: "KritiN@1",
  });
  const [loginErrorField, setLoginErrorField] = useState({
    userNameError: "",
    passwordError: "",
  });

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
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Log in
          </h2>
        </div>
        <form className="mt-8 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label
                htmlFor="user-name"
                className="text-gray-900 block pr-3 py-4"
              >
                User Name
              </label>
              <input
                id="user-name"
                name="user-name"
                type="text"
                autoComplete="username"
                required
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                placeholder="James_Cameron"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-gray-900 block pr-3 pb-3 pt-3"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                placeholder="theWay^OfWater2"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-teal-600/100 py-2 px-4 text-sm font-semibold text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              Log in
            </button>
          </div>
        </form>
        <div
          style={{ margin: "0.5rem 0.25rem" }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center ">
            <p className="text-gray-700 text-sm">Don't have an account?</p>
            <Link className="text-teal-700 font-medium pl-2" to="/signup">
              Signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
