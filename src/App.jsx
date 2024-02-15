import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Register from "./Components/Layouts/Register"
import React from "react";
import Login from "./Components/Forms/Login";
import AppLayout from "./Components/Layouts/AppLayout";
import TeacherForm from "./Components/Forms/TeacherForm";
import Dash from "./Components/Layouts/Dash";
import { UserProvider } from "./Hooks/UserContext";
import { Toaster } from "react-hot-toast";

function App() {

 return (
  <UserProvider>
    <Routes>
        <Route path="/" element={<Dash />} />
        </Routes>
      <Toaster />
    </UserProvider> )

}

export default App
