import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
// import UserContext from "../../Hooks/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { loginTeacher, selectUser, selectError, clearError } from "../../Redux/Slices/authSlice";
import { PiUserThin, PiSpinnerGapBold } from "react-icons/pi";

// import ErrorStrip from "../ErrorStrip";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const error = useSelector(selectError);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [buttonText, setButtonText] = useState("Login");
  const [message, setMessage] = useState("");

  const slowLoadingIndicator = () => {
    setTimeout(() => {
      setMessage(
        "NOTE: Web Services on the free instance type are automatically spun down after 15 minutes of inactivity. When a new request for a free service comes in, Render spins it up again so it can process the request. This will cause a delay in the response of the first request after a period of inactivity while the instance spins up."
      );
    }, 4000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setButtonText("Loading...");
    slowLoadingIndicator();
    dispatch(loginTeacher({ username, password, userType }));
  };

  useEffect(() => {
    if (user?._id) {
      navigate("/dash");
    }
    if (error) {
      // Handle error here (e.g., display error message)
      // You can use setError in the local state to display the error
      // setError(error);
      dispatch(clearError());
      setButtonText("Login");
    }
  }, [user, error, navigate, dispatch]);

  return (
    <>
      {!user?._id ? (
        <main className="relative z-0 flex h-screen flex-col items-center justify-center bg-gradient-to-b text-slate-950 dark:from-slate-800 dark:to-slate-950 dark:text-slate-300">
          {message && !error && (
            <header className="absolute top-0 w-full bg-violet-500/50 p-2 text-xs dark:bg-slate-700/50 lg:text-base">
              {message}
            </header>
          )}
          
          <img src="http://erp.imsec.ac.in/assets/img/logo.jpg" alt="IMSEC Logo" className="object-fill h-32 w-92 space-y-0" />

          <section className="z-0 w-[65%] justify-self-center rounded-lg bg-slate-100 opacity-80 hover:opacity-100 focus:opacity-100  dark:bg-[#060913] sm:w-[min(50%,360px)] md:w-[min(40%,360px)] xl:w-[min(23%,360px)] ">
            <form
              className="tracking-wide placeholder:text-slate-200 dark:placeholder:text-violet-200 "
              onSubmit={(e) => handleLogin(e)}
            >
              <section className="flex flex-col items-center justify-start ">
                <div className="flex w-full text-lg ">
                  <label
                    className="radio relative flex w-1/2 cursor-pointer flex-col items-center rounded-tl-lg p-4 dark:border-l-[1.5px] dark:border-t-[1.5px]  dark:border-solid dark:border-violet-900"
                    htmlFor="teacher"
                  >
                    Teacher
                    <input
                      className="absolute opacity-0"
                      type="radio"
                      value="teacher"
                      id="teacher"
                      name="userType"
                      onClick={() => setUserType("teacher")}
                    />
                  </label>
                </div>
                <div className="flex w-full justify-center p-1 pt-0 text-8xl dark:border-x-[1.5px] dark:border-solid dark:border-violet-900 md:p-3 md:pt-0">
                  <PiUserThin className="animate-slide rounded-full border-2 border-slate-900 p-1 font-light dark:border-slate-300 md:p-2" />
                </div>
              </section>
              <section className="rounded-b-lg px-4 pb-4 dark:border-x-[1.5px] dark:border-b-[1.5px] dark:border-solid dark:border-violet-900">
                <input
                  className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
                  placeholder="username"
                  id="username"
                  type="text"
                  required
                  autoComplete="off"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
                  placeholder="password"
                  id="password"
                  type="password"
                  required
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="mb-1 flex h-10 w-full items-center justify-center gap-1 rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 p-1 font-bold tracking-wide text-slate-200 hover:bg-violet-900 focus:bg-violet-900 disabled:cursor-wait dark:border-violet-300 dark:bg-violet-600 dark:text-slate-50 dark:hover:bg-slate-900 dark:focus:bg-slate-900 lg:mb-2 "
                  type="submit"
                  value="Login"
                  disabled={buttonText !== "Login"}
                  onClick={(e) => handleLogin(e)}
                >
                  {!(buttonText === "Login") && (
                    <PiSpinnerGapBold className="animate-spin" />
                  )}
                  {buttonText}
                </button>
                {error ? <ErrorStrip error={error} /> : ""}
                <p className="inline text-slate-600 dark:text-violet-200">
                  Click to{" "}
                </p>
                <button
                  type="button"
                  className="font-semibold text-violet-600 decoration-2 hover:underline focus:underline   dark:text-violet-400"
                  onClick={() => navigate("./register/reg_student")}
                >
                  Register
                </button>
              </section>
            </form>
          </section>
        </main>
      ) : (
        <Navigate to="./dash" />
      )}
    </>
  );
};

export default Login
