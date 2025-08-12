import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <div className="max-w-6xl flex items-center justify-between border border-yellow-300">
      <h1 className="text-white">Risahbh dubey</h1>
      <Button>logout</Button>
    </div>
  );
};

export default Navbar;
