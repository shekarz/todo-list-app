import React from "react";
import { MdOutlineLabel } from "react-icons/md";

const Sidebar = ({ labelsList, selectedLabel, onLabelClick }) => {
 return (
  <div className="w-[190px] h-[calc(100vh-50px)] z-0 fixed left-0 py-4">
   <h2 className="text-lg font-semibold mb-2 ml-3">Labels</h2>
   <ul className="flex flex-col">
    {labelsList.map((label, index) => (
     <li
      onClick={() => onLabelClick(label)}
      className={`flex items-center gap-2 cursor-pointer rounded-e-full px-3 py-2 hover:bg-gray-200 ${
       selectedLabel === label ? "bg-amber-200" : "text-gray-800"
      }`}
      key={index}
     >
      <MdOutlineLabel size={20} />
      {label}
     </li>
    ))}
   </ul>
   <button
    onClick={() => onLabelClick(null)}
    className="mt-4 ml-2 text-blue-600 underline"
   >
    Clear Label Filter
   </button>
  </div>
 );
};

export default Sidebar;
