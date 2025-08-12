import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "./components/ui/button";
import Navbar from "./components/Navbar";
import { Textarea } from "./components/ui/textarea";

function App() {
  const [title, settitle] = useState("");
  const [description, setDescrition] = useState(" ");

  const handleChange = () => {
    console.log(title, description);
  };
  return (
    <div className="">
      <Navbar />

      <div className="flex items-center  w-full mt-4">
        <div className="flex flex-col">
          <input
            value={title}
            onChange={(e) => settitle(e.target.value)}
            placeholder=" enter your todo..."
            className="border flex-1 mb-2"
          />
          <Textarea
            value={description}
            onChange={(e) => setDescrition(e.target.value)}
          />
        </div>
        <Button onClick={handleChange} className="ml-4">
          hello world
        </Button>
      </div>
    </div>
  );
}

export default App;
