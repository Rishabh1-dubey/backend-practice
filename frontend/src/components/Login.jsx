import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onhandleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const loginHandler = (e) => {
    setUser(e.target.value);
  };
  return (
    <div>
      <Input type="text" value={user.email} onChange={onhandleChange} />
      <Input  type="text" value={user.password} onChange={onhandleChange} />
      <Button onClick={loginHandler} />
    </div>
  );
};

export default Login;
