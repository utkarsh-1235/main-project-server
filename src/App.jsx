import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Register from "./Components/Layouts/Register"
import React, { Suspense, lazy } from "react";
import Login from "./Components/Forms/Login";
import AppLayout from "./Components/Layouts/AppLayout";
import TeacherForm from "./Components/Forms/TeacherForm";
import Dash from "./Components/Layouts/Dash";
import { UserProvider } from "./Hooks/UserContext";
import { Toaster } from "react-hot-toast";
import Loading from "./Components/Layouts/Loading";

const JoinPaper = lazy(() => import("./Components/Forms/JoinPaper"));

function App() {

 return (
  <UserProvider>
    <Routes>
      <Route path='/' element={<JoinPaper/>}></Route>
        {/* <Route path="/" element={<Dash />} > */}
        {/* <Route
            path="join_paper"
            element=
              // <Suspense fallback={<Loading />}>
                {<JoinPaper />}
              // </Suspense>
            
          /> */}
          {/* </Route> */}
         </Routes>
      <Toaster />
    </UserProvider> )

}

export default App
