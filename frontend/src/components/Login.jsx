import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onhandleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const loginHandler = async () => {
    
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        user,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      navigate("/home")
      console.log(res.data.message)
      if (res.data.message) {
        toast.success(res.data.message);
        alert(res.data.message);
      }
    } catch (error) {
      alert(error.response.data.message)
    }
  };
  return (
    <div>
      <Input
        type="text"
        name="email"
        value={user.email}
        onChange={onhandleChange}
      />
      <Input
        type="text"
        name="password"
        value={user.password}
        onChange={onhandleChange}
      />
      <Button className="cursor-pointer" onClick={loginHandler}>Login</Button>
    </div>
  );
};

export default Login;
