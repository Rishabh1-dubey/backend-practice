import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "./components/ui/button";
import Navbar from "./components/Navbar";
import { Textarea } from "./components/ui/textarea";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";


const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<Login/>
  },{
    
    path:"/home",
    element:<Home/>
  }
])





function App() {
  
  return (
    <div className="">
    <RouterProvider router={appRouter}/>
    </div>
  );
}

export default App;
