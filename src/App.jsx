import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

function App() {
 const [todosList, setTodosList] = useState([]);
 const [currentTodo, setCurrentTodo] = useState(null);
 const [searchInput, setSearchInput] = useState("");
 const [labelsList, setLabelsList] = useState([]);
 const [selectedLabel, setSelectedLabel] = useState(null);

 // Load saved todos from localStorage when component mounted
 useEffect(() => {
  const storedTodos = localStorage.getItem("todosList");
  const storedLabels = localStorage.getItem("labelsList");

  if (storedTodos) setTodosList(JSON.parse(storedTodos));
  if (storedLabels) setLabelsList(JSON.parse(storedLabels));
 }, []);

 //  Save todos to localStorage
 useEffect(() => {
  console.log("saving todosList", todosList);
  localStorage.setItem("todosList", JSON.stringify(todosList));
 }, [todosList]);

 // Save labels to localStorage
 useEffect(() => {
  console.log("saving labelsList", labelsList);
  localStorage.setItem("labelsList", JSON.stringify(labelsList));
 }, [labelsList]);

 // Add todos to todosList
 const addTodos = (todo) => {
  if (currentTodo) {
   setTodosList(
    todosList.map((todoItem) => (todoItem.id === todo.id ? todo : todoItem))
   );
   setCurrentTodo(null);
  } else {
   setTodosList([...todosList, todo]);
  }

  //  Update the labelsList
  const newLabels = todo.labels.filter((label) => !labelsList.includes(label));
  setLabelsList((prevLabels) => [...prevLabels, ...newLabels]);
 };

 //  editing a todo
 const editTodo = (todo) => {
  setCurrentTodo(todo);
 };

 //  deletiing a todo
 const deleteTodo = (id) => {
  const filteredTodos = todosList.filter((todoItem) => todoItem.id !== id);
  setTodosList(filteredTodos);
 };

 //  toggle between mark as completed and uncompleted
 const handleComplete = (todo) => {
  const updatedTodos = todosList.map((todoItem) => {
   if (todoItem.id === todo.id) {
    return { ...todoItem, isCompleted: !todoItem.isCompleted };
   }
   return todoItem;
  });
  setTodosList(updatedTodos);
 };

 //  filter todos by title or content or labels
 const filteredTodosList = todosList.filter((todoItem) => {
  const searchInputLower = searchInput.toLowerCase();
  const matchedSearch =
   todoItem.title.toLowerCase().includes(searchInputLower) ||
   todoItem.content.toLowerCase().includes(searchInputLower) ||
   todoItem.labels.some((label) =>
    label.toLowerCase().includes(searchInputLower)
   );

  const matchedLabel =
   !selectedLabel || todoItem.labels.includes(selectedLabel);

  return matchedSearch && matchedLabel;
 });

 return (
  <>
   <Navbar setSearchInput={setSearchInput} />
   <div className="h-full py-16 flex items-center justify-center">
    <Sidebar
     labelsList={labelsList}
     selectedLabel={selectedLabel}
     onLabelClick={setSelectedLabel}
    />
    <div className="flex flex-auto overflow-y-auto flex-col p-4 justify-center items-center">
     <h1 className="text-xl font-bold mb-4">Todo List</h1>
     <TodoForm addTodos={addTodos} currentTodo={currentTodo} />
     <div className="w-full min-h-60 flex flex-row-reverse flex-wrap justify-center p-7 gap-7 mt-8 rounded-lg">
      {todosList.length < 1 ? (
       <h2 className="text-2xl font-bold pb-2 text-slate-600">No Todos Yet</h2>
      ) : (
       filteredTodosList.map((todoItem) => (
        <TodoItem
         key={todoItem.id}
         todoItem={todoItem}
         editTodo={editTodo}
         deleteTodo={deleteTodo}
         toggleComplete={handleComplete}
        />
       ))
      )}
     </div>
    </div>
   </div>
  </>
 );
}

export default App;
