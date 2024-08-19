import React from "react";
import { Input } from "./ui/input";

const Navbar = ({ setSearchInput }) => {
 return (
  <div className="fixed z-10 w-full top-0 left-0 shadow-lg px-7 py-4 flex items-center h-16 bg-slate-100 gap-96">
   <h1 className="text-xl font-bold">Todo App</h1>
   <Input
    onChange={(e) => setSearchInput(e.target.value)}
    style={{ boxShadow: "none" }}
    className="w-[460px] h-11"
    type="text"
    placeholder="Search"
   />
  </div>
 );
};

export default Navbar;
