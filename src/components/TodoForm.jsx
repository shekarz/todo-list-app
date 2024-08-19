import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { MdAddCircle } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { IoMdCloseCircle } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";

const TodoForm = ({ addTodos, currentTodo }) => {
 const [title, setTitle] = useState("");
 const [content, setContent] = useState("");
 const [labels, setLabels] = useState([]);
 const [newLabel, setNewLabel] = useState("");

 useEffect(() => {
  if (currentTodo) {
   setTitle(currentTodo.title);
   setContent(currentTodo.content);
   setLabels(currentTodo.labels);
  } else {
   setTitle("");
   setContent("");
   setLabels([]);
  }
 }, [currentTodo]);

 const handleAddTodo = () => {
  if (content === "") {
   return alert("write something to add it to todo-list!!");
  }
  const newTodo = {
   id: currentTodo ? currentTodo.id : uuidv4(),
   title: title ? title : "",
   content,
   labels,
   isCompleted: currentTodo ? currentTodo.isCompleted : false,
  };
  addTodos(newTodo);
  setTitle("");
  setContent("");
  setLabels([]);
 };

 const addLabel = () => {
  if (newLabel.trim()) {
   setLabels([...labels, newLabel.trim()]);
   setNewLabel("");
  }
 };

 const removeLabel = (labelToRemove) => {
  setLabels(labels.filter((label) => label !== labelToRemove));
 };

 return (
  <div className="bg-slate-100 shadow-xl rounded-lg p-7 w-[360px] flex flex-col gap-2">
   <Input
    style={{ boxShadow: "none" }}
    onChange={(e) => setTitle(e.target.value)}
    value={title}
    type="text"
    placeholder="Title"
   />
   <Textarea
    style={{ boxShadow: "none" }}
    onChange={(e) => setContent(e.target.value)}
    value={content}
    placeholder="Write todo..."
   />
   <div className="flex gap-3 items-center">
    <input
     className="outline-none text-sm rounded-md px-4 py-2"
     value={newLabel}
     onChange={(e) => setNewLabel(e.target.value)}
     type="text"
     placeholder="Label name"
    />
    <button
     onClick={addLabel}
     className="bg-amber-300 text-sm font-semibold text-white rounded-md px-4 py-2"
    >
     Add Label
    </button>
   </div>
   <div className="flex flex-wrap gap-2 mt-2">
    {labels.map((label, index) => (
     <span
      className="flex items-center gap-2 rounded-full px-3 py-1 text-xs bg-gray-300"
      key={index}
     >
      {label}
      <IoMdCloseCircle
       className="cursor-pointer"
       onClick={() => removeLabel(label)}
      />
     </span>
    ))}
   </div>
   <Button
    className="gap-1.5 bg-indigo-600 hover:bg-indigo-500"
    onClick={handleAddTodo}
   >
    {currentTodo ? <GrUpdate size={18} /> : <MdAddCircle size={20} />}
    {currentTodo ? "Update" : "Add"}
   </Button>
  </div>
 );
};

export default TodoForm;
