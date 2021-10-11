import React, { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';


function Home({ appState }) {
    const [open, setOpen] = useState(false)

    const status = [
        { value: 'todo', label: 'To-Do' },
        { value: 'inProgress', label: 'In Progress' },
        { value: 'finish', label: 'Finish' },
    ];

    const [task, updateTask] = useState({
        index: 0,
        name: "",
        type: "Add Task",
        button: "Add",
        status: "todo",
        origStatus: "todo",
    });

    const handleOpenTask = () => {
        updateTask({
            name:"",
            type: "Add Task",
            button: "Add",
            status: "todo",
            origStatus: "todo",
        });
        setOpen(true);
    };

    const handleTask = (type) => {

        if(task.name || task.name.length > 0){
            if(type == "Add Task"){
                appState[task.status].push({name: task.name});
            }
            else{
                if(task.status != task.origStatus){
                    appState[task.origStatus].splice(task.index,1);
                    appState[task.status].push({name: task.name});
                }

                appState[task.status][task.index].name = task.name;
            }
            setOpen(false);
        }
        else{
            alert("Task Title must not be blank");
        }
    };

    const handleChange = (e) => {
     
        updateTask({
            ...task,
            [e.target.name]: e.target.value,
        });
    };

    const editTask = (index, status) => {
    
        updateTask({
            ...task,
            index: index,
            name: appState[status][index].name,
            type: "Edit Task",
            button: "Save",
            status: status,
            origStatus: status,
        });
        
        setOpen(true);
    };

    return (
        <div className="bg-gray-100">
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setOpen}>
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="flex items-start">
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                                {task.type}
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <div className="w-full mx-auto px-2 py-2">
                                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                                        Task Title
                                                    </label>
                                                    <div className="mt-2 relative border-red-500 block">
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            id="name"
                                                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                            placeholder="Task Name"
                                                            autoFocus
                                                            defaultValue={task.name}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                   
                                                    <div className="col-span-6 sm:col-span-3 mt-4">
                                                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                                                            Status
                                                        </label>
                                                        <select
                                                            id="status"
                                                            name="status"
                                                            autoComplete="status"
                                                            value={task.status}
                                                            onChange={handleChange}
                                                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                        >
                                                            {status.map(({ value, label} ) => (
                                                               <option key={value} value={value}>{label}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="button"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => handleTask(task.type)}
                                    >
                                        {task.button}
                                    </button>
                                    <button      
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => setOpen(false)}
                                    >
                                    Cancel
                                    </button>
                                </div>
                            </div>
                            
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
            <div className="max-w-2xl mx-auto px-4 py-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <button
                    type="submit"
                    className="my-10 w-full bg-red-500 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={handleOpenTask}
                >
                    Add Task
                </button>
                <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <h1 className="block text-xl font-bold text-gray-700">
                            To Do
                        </h1>
                        <div className="flex flex-col">
                            {appState.todo.length === 0 &&
                                <h3>No items</h3>
                            }
                            {appState.todo.map((item, index) => (
                                <div key={index} className="group relative">
                                    <div className="w-auto h-auto my-4 p-4 block bg-blue-100 rounded-md ">
                                        <h3 className="text-gray-700 font-normal">
                                            {item.name}
                                        </h3>
                                        <div className="flex justify-end">
                                            <button onClick={() => editTask(index, "todo")} className="bg-gray-500 hover:bg-gray-700 px-6 py-1 rounded-md block text-white">
                                                Edit
                                            </button>
                                        </div>
                                        
                                    </div>
                                    
                                </div>
                            ))}
                        </div>
                   
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                         <h1 className=" block text-xl font-bold text-gray-700">
                            In Progress
                        </h1>
                        <div className="flex flex-col">
                            {appState.inProgress.length === 0 &&
                                <h3>No items</h3>
                            }
                            {appState.inProgress.map((item, index) => (
                                <div key={index} className="group relative">
                                    <div className="w-auto h-auto my-4 p-4 block bg-yellow-100 rounded-md ">
                                        <h3 className="text-gray-700 font-normal">
                                            {item.name}
                                        </h3>
                                        <div className="flex justify-end">
                                            <button onClick={() => editTask(index, "inProgress")} className="bg-gray-500 hover:bg-gray-700 px-6 py-1 rounded-md block text-white">
                                                Edit
                                            </button>
                                        </div>
                                        
                                    </div>
                                    
                                </div>
                            ))}
                        </div>
                      
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <h1 className="block text-xl font-bold text-gray-700">
                            Finish
                        </h1>
                        <div className="flex flex-col">
                            {appState.finish.length === 0 &&
                                <h3>No items</h3>
                            }
                            {appState.finish.map((item, index) => (
                                <div key={index} className="group relative">
                                    <div className="w-auto h-auto my-4 p-4 block bg-green-100 rounded-md ">
                                        <h3 className="text-gray-700 font-normal">
                                            {item.name}
                                        </h3>
                                        <div className="flex justify-end">
                                            <button onClick={() => editTask(index, "finish")} className="bg-gray-500 hover:bg-gray-700 px-6 py-1 rounded-md block text-white">
                                                Edit
                                            </button>
                                        </div>
                                        
                                    </div>
                                    
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                
            </div>
            
            
        </div>
    );
}

export default Home;