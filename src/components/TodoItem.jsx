import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete, MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { BiSolidCheckCircle } from "react-icons/bi";

const TodoItem = ({ todoItem, editTodo, deleteTodo, toggleComplete }) => {
 const { id, title, content, isCompleted } = todoItem;

 return (
  <div className="flex flex-col justify-between border border-solid border-gray-300 rounded-lg p-4 w-[330px] min-h-40">
   <div className="">
    <h1 className="text-lg font-semibold">{title}</h1>
    <p
     className="cursor-pointer flex items-center gap-1 mt-2 text-sm"
     onClick={() => toggleComplete(todoItem)}
    >
     {isCompleted ? (
      <BiSolidCheckCircle className="text-orange-400" />
     ) : (
      <MdOutlineRadioButtonUnchecked />
     )}
     <span>{isCompleted ? "Mark as uncompleted" : "Mark as completed"}</span>
    </p>
    <p className={`mt-2 ${isCompleted ? "line-through text-orange-400" : ""}`}>
     {content}
    </p>
   </div>
   <div className="flex mt-4 gap-2">
    {todoItem.labels.map((label, index) => (
     <span className="rounded-full px-3 py-1 text-xs bg-gray-300" key={index}>
      {label}
     </span>
    ))}
   </div>
   <div className="flex justify-center gap-16 mt-4">
    <FaEdit
     onClick={() => editTodo(todoItem)}
     size={18}
     className="cursor-pointer"
    />
    <MdDelete
     onClick={() => deleteTodo(id)}
     size={18}
     className="cursor-pointer"
    />
   </div>
  </div>
 );
};

export default TodoItem;
