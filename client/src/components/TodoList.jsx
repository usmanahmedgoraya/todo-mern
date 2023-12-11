/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { MdDelete } from "react-icons/md";
import Modal from "./Modal";
import { useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TodoList = ({ todo, editData, setEditData, handleEditTodo, handleDeleteTodo }) => {

    const checkboxRef = useRef(null)

    const handleEdit = (title, desc) => {
        handleEditTodo(todo._id, title, desc)
    }

    const handleDelete = () => {
        handleDeleteTodo(todo._id)
    }

    const handleCompletedTodo = async () => {
        try {
            // Update the local state immediately for a responsive UI
            const updatedTodo = { ...todo, completed: !todo.completed };
            setEditData(updatedTodo);

            // Make the API call in the background
            const res = await fetch(`https://todo-mern-coral.vercel.app/${todo._id}`, {
                method: "put"
            });
            const data = await res.json();
            console.log(data.todo.completed);
            if(data.todo.completed === true){
                toast.success('Todo Uncompleted Successfully', {
                    position: "top-right",
                    autoClose: 1300,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
            else{
                toast.success('Todo Complete Successfully', {
                    position: "top-right",
                    autoClose: 1300,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={1300}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div className="block max-w-[20rem] p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 cursor-pointer">
                <div className="grid grid-cols-6 place-items-center">
                    {todo.completed !== undefined && 
                        <div className="checkbox-wrapper dark:text-white" >
                        <label>
                          <input checked={todo.completed} type="checkbox" className="dark:text-white" onChange={() => handleCompletedTodo(todo._id, !todo.completed)}/>
                          <span className="checkbox dark:text-white border-red-600" ></span>
                        </label>
                      </div>
                        
                    }

                    <div className="col-span-4 p-2">
                        <h5 className="text-xl break-normal font-bold tracking-tight text-gray-900 dark:text-white">{todo.title}</h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">{todo.desc}</p>
                    </div>
                    <div className="flex space-x-2 text-xl mt-2">
                        <Modal handleEdit={handleEdit}  />
                        <MdDelete className="cursor-pointer dark:text-white hover:text-red-700 dark:hover:text-red-500" onClick={handleDelete} />
                    </div>
                </div>
            </div>
        </>

    )
}

export default TodoList