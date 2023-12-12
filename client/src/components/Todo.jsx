import { useEffect, useRef, useState } from "react";
import TodoList from "./TodoList";
import { FaRegSquarePlus } from "react-icons/fa6";
import { IoMdNuclear } from "react-icons/io";
import { GrCompliance } from "react-icons/gr";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState();
    const [desc, setDesc] = useState();
    const [editData, setEditData] = useState();
    const titleRef = useRef(null)
    const descRef = useRef(null)

    let domain = "https://todo-mern-3cld.vercel.app/"

    // Fetch all the todo
    const fetchALLTodo = async () => {
        try {
            const res = await fetch(`${domain}/todos`, {
                method: "get"
            })
            const data = await res.json();
            setTodos(data)
        } catch (error) {
            console.log(error.message);
        }
    }

    // handle the fetch all data
    useEffect(() => {
        fetchALLTodo()
    }, [todos])

    // Handle Input function
    const handleInput = (e) => {
        if (e.target.name === "title") {
            setTitle(e.target.value)
        }
        else if (e.target.name === "desc") {
            setDesc(e.target.value)
        }
    }

    // handle AddTodo Button 
    const handleAddToDo = async () => {
        try {

            if (title && desc) {
                if (title.length <= 40) {

                    const res = await fetch(`${domain}/todos`, {
                        method: "post",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ title, desc }),
                    });
                    const data = await res.json();
                    console.log(data);
                    toast.success('Todo Add Successfully', {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                }
                else {
                    toast.error('Please! minimize title length', {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                }
            }
            else {
                toast.error('Please! add some data', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });

            }
            setDesc("")
            setTitle("")
            titleRef.current.value = null
            descRef.current.value = null
        } catch (error) {
            console.log(error.message);
            toast.error('Something went wrong!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    // Handle Function for Edit
    const handleEditTodo = async (id, title, desc) => {
        try {
            const res = await fetch(`${domain}/todos/${id}`, {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, desc }),
            });
            const data = await res.json();
            console.log(data);
            toast.success('Edited Successfully', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    // Handle Function for Delete
    const handleDeleteTodo = async (id) => {
        try {
            const res = await fetch(`${domain}/todos/${id}`, {
                method: "delete",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            console.log(data);
            toast.success('Deleted Successfully', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } catch (error) {
            console.log(error.message);
            toast.error('Something went wrong!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }

    }

    // Clear All Todo Function
    const handleClearAll = async () => {
        try {
            const res = await fetch(`${domain}/clear-todos`, {
                method: "delete",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            console.log(data);
            toast.success('All Todo Clear Successfully', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } catch (error) {
            console.log(error.message)
        }
    }

    // Clear all completed task
    const handleClearCompleted = async () => {
        try {
            const res = await fetch(`${domain}/clear-complete-todo`, {
                method: "delete"
            });
            const data = await res.json()
            console.log(data);
            toast.success('Completed Tasks Delete Successfully', {
                position: "bottom-left",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } catch (error) {
            console.log(error);
            toast.error('Oops! Something went wrong!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div className="h-auto  mt-20 w-full flex justify-center items-center flex-col">
                <div className="border border-gray-500 bg-gray-900 p-3 rounded-lg w-[16rem] md:w-[20rem]">
                    <div className="flex flex-col">
                        <div className="tracking-wide">
                            <label htmlFor="title" className="text-white my-3">Title</label>
                            <input ref={titleRef} type="text" name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-700 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white mt-2" required onChange={handleInput} />
                        </div>
                        <div className="mt-4 tracking-wide">
                            <label htmlFor="description" className="text-white my-3">Description</label>
                            <input ref={descRef} type="text" name="desc" id="desc" className="bg-gray-50 border border-gray-300 text-gray-700 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white mt-2" onChange={handleInput} required />
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-center mt-4 gap-4">
                        <button className="bg-gray-700 text-white flex justify-center items-center p-2 rounded-md group" onClick={handleAddToDo}> <FaRegSquarePlus className="mx-2 group-active:animate-ping hidden md:inline  " />Add Todo</button>
                        <button className="bg-gray-700 text-white flex justify-center items-center p-2 rounded-md group" onClick={handleClearAll}> <IoMdNuclear className="mx-2 group-active:animate-ping hidden md:inline " />Clear ALL</button>
                        <button className="bg-gray-700 text-white flex justify-center items-center p-2 rounded-md group" onClick={handleClearCompleted}> <GrCompliance className="mx-2 group-active:animate-ping hidden md:inline " />Clear Completed</button>
                    </div>
                </div>
            </div>

            <div className="flex justify-center flex-wrap my-8 space-x-4">

                <div className="text-white bg-gray-600 p-3 rounded-md flex justify-center items-center my-2">
                    All Todos: <span className="py-1 px-2 rounded-md ml-3 bg-cyan-950">{todos.length}</span>
                </div>
                <div className="text-white bg-gray-600 p-3 rounded-md flex justify-center items-center my-2">
                    Complete Todos: <span className="py-1 px-2 rounded-md ml-3 bg-cyan-950">{todos.filter(todo => todo.completed).length}</span>
                </div>
                <div className="text-white bg-gray-600 p-3 rounded-md flex justify-center items-center my-2">
                    Remaining Todos: <span className="py-1 px-2 rounded-md ml-3 bg-cyan-950">{todos.filter(todo => !todo.completed).length}</span>
                </div>
            </div>
            <div className="mt-8 flex flex-wrap justify-center w-full dark:bg-slate-800 ">
                {todos.map((todo) => {
                    return (
                        <div key={todo._id} className="m-2 mb-8 dark:bg-slate-800">
                            <TodoList todo={todo} editData={editData} setEditData={setEditData} handleEditTodo={handleEditTodo} handleDeleteTodo={handleDeleteTodo} />
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Todo