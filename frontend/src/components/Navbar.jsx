import axios from "axios";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
const navigate = useNavigate()
const loginHandler=async()=>{
  const res = await axios.get("http://localhost:8000/api/v1/user/logout")
  if(res.data.success){
    toast.success(res.data.message)
    navigate("/")
  }
}

  return (
    <div className="max-w-6xl flex items-center justify-between border border-yellow-300">
      <h1 className="text-white">Risahbh dubey</h1>
      <Button className="cursor-pointer" onClick={loginHandler}>logout</Button>
    </div>
  );
};

export default Navbar;
