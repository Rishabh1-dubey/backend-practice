import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { Card, CardContent } from "./ui/card";

const Home = () => {
  const [title, settitle] = useState("");
  const [description, setDescrition] = useState("");

  const [todos, setTodos] = useState([]);

  //   create todo
  const handleChange = async () => {
    console.log(title, description);

    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/todos",
        { title, description },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setTodos([...todos, res.data.newtodo]);
        settitle("");
        setDescrition("");
      }
    } catch (error) {
      toast.error(error.response?.data?.error);
    }
  };

  //   get add todo
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/user/alltodos",
          { withCredentials: true }
        );

        if (res.data.success) {
          console.log(res.data.alltodos);
          setTodos(res.data.Alltodo);
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  //   delete todo

  const handleDelete = async (id) => {
    try {
       const res = await axios.delete(
      `http://localhost:8000/api/v1/user/delete-todo/${id}`
    );

    if (res.data.success) {
      setTodos(todos.filter((todo) => todo._id !== id));
      toast.success(res.data.message)
    } 
    } catch (error) {
        console.log(error)
    }
  };





  return (
    <div>
      <Navbar />

      <div className="flex items-center max-w-6xl  mt-4">
        <div className=" w-fit flex flex-col">
          <Input
            value={title}
            onChange={(e) => settitle(e.target.value)}
            placeholder=" enter your todo..."
            className="border flex-1 mb-2 text-white"
          />
          <Textarea
            value={description}
            onChange={(e) => setDescrition(e.target.value)}
          />
        </div>
        <Button onClick={handleChange} className="ml-4 cursor-pointer">
          Add New Todo
        </Button>
      </div>
      <div className="w-fit mx-auto grid grid-cols-5 gap-3.5 mt-4">
        {todos.map((todo) => (
          <Card className="bg-white" key={todo._id}>
            <CardContent>
              <p className="font-bold">
                <span className="text-xl text-blue-600">Title:</span>{" "}
                {todo.title}
              </p>
              <p className="font-bold">
                <span className="text-xl">description: </span>
                {todo.description}
              </p>
             <div className=" mr-6">
                 <Button  onClick={()=>handleDelete(todo._id)} className="mt-4 bg-green-600">Delete Todo</Button>
            
             </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
