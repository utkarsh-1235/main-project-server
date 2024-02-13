import { Route, Routes } from "react-router-dom"
import Register from "./Components/Layouts/Register"
import React from "react";
import Login from "./Components/Forms/Login";
import AppLayout from "./Components/Layouts/AppLayout";
import TeacherForm from "./Components/Forms/TeacherForm";

function App() {


   

 return (
          <Routes>
            <Route path='/' element={<AppLayout/>}>
        <Route path="/register" element={<Register/>}>
        <Route path="reg_teacher" element={<TeacherForm />} />
        </Route>
        <Route path="/login" element={<Login/>}></Route>
        </Route>
      </Routes>

  )

}

export default App
