import React, { useState, useEffect } from "react";
import Notecard from "../../components/Cards/Notecard";
import AddEditToDo from "./AddEditToDo";
import Modal from "react-modal";
import { MdAdd, MdChat } from "react-icons/md";
import { getData, deleteTask } from "@/services/getData";
import { useChat } from "../../context/chatContext";

const Dashboard = ({ userId, setUser }) => {
    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShow: false,
        type: "add",
        data: null,
        taskId: null,
    });

    const [tasks, setTasks] = useState([]);
    const { Chat } = useChat();
    const [chatModal, setChatModal] = useState(false);

    // Fetch tasks on component mount
    useEffect(() => {
        (async () => {
            const result = await getData(userId, 'tasks', setUser);
            if (result.status) {
                setTasks(result.data);
            }
        })();
    }, [userId, setUser]);

    // Close modal and reset state
    const handleCloseModal = () => {
        setOpenAddEditModal({ isShow: false, type: "add", data: null, taskId: null });
    };

    // Delete a task
    const handleDelete = async (taskId) => {
        try {
            await deleteTask(taskId);
            setTasks(tasks.filter(task => task._id !== taskId));
        } catch (error) {
            console.error('Error during task deletion:', error);
        }
    };

    // Open edit modal with task data
    const handleEdit = (task) => {
        setOpenAddEditModal({
            isShow: true,
            type: "edit",
            data: task,
            taskId: task._id,
        });
    };

    // Add a new task
    const addTask = (updatedTask) => {
        setTasks((prevTasks) => {
            // Check if we are updating an existing task
            const existingTaskIndex = prevTasks.findIndex(task => task._id === updatedTask._id);
            if (existingTaskIndex !== -1) {
                // Update the existing task
                const updatedTasks = [...prevTasks];
                updatedTasks[existingTaskIndex] = { ...updatedTasks[existingTaskIndex], ...updatedTask };
                return updatedTasks;
            } else {
                // Add the new task
                return [...prevTasks, updatedTask];
            }
        });
        handleCloseModal();
    };

    // Render task cards
    const cardsArr = tasks.length === 0 ? (
        <p>No more tasks</p>
    ) : (
        tasks.map((task) => (
            <Notecard
                key={task._id}
                title={task.title}
                date={task.createdAt}
                content={task.content}
                tags={task.tags.join(', ')}
                isPinned={true}
                onEdit={() => handleEdit(task)}
                onDelete={() => handleDelete(task._id)}
                onPinNote={() => {}}
            />
        ))
    );

    return (
        <>
            <div className="container mx-auto">
                <div className="grid grid-cols-3 gap-4 mt-8">
                    {cardsArr}
                </div>
            </div>

            <div className="fixed bottom-5 right-5 flex gap-4 z-50">
                <button
                    className="w-16 h-16 flex items-center justify-center rounded-2xl text-white font-medium bg-primary"
                    onClick={() => {
                        setOpenAddEditModal({
                            isShow: true,
                            type: "add",
                            data: null,
                            taskId: null,
                        });
                    }}
                >
                    <MdAdd className="text-[32px] text-white" />
                </button>

                <button
                    className="w-16 h-16 flex items-center justify-center rounded-2xl text-white font-medium bg-secondary"
                    onClick={() => setChatModal(prev => !prev)}
                >
                    <MdChat className="text-[32px] text-white" />
                </button>
            </div>

            <Modal
                isOpen={openAddEditModal.isShow}
                onRequestClose={handleCloseModal}
                style={{
                    overlay: { backgroundColor: "rgba(0, 0, 0, 0.2)" },
                    content: {
                        position: 'absolute',
                        top: '10%',
                        left: '50%',
                        transform: 'translate(-50%, 0)',
                        width: '40%',
                        maxHeight: '80%',
                        overflowY: 'auto',
                        padding: '20px',
                        borderRadius: '8px',
                        backgroundColor: 'white',
                    }
                }}
                contentLabel="Add/Edit ToDo Modal"
            >
                <AddEditToDo
                    onClose={handleCloseModal}
                    initialData={openAddEditModal.data}
                    taskId={openAddEditModal.taskId}
                    addTask={addTask}
                />
            </Modal>
            
            <Modal
                isOpen={chatModal}
                onRequestClose={() => setChatModal(false)}
                style={{
                    overlay: { backgroundColor: "rgba(0, 0, 0, 0.2)" },
                    content: {
                        position: 'absolute',
                        top: '10%',
                        left: '79%',
                        width: '300px',
                        height: '500px',
                        borderRadius: '8px',
                        padding: '20px',
                        backgroundColor: 'white',
                    }
                }}
                contentLabel="Chat Modal"
            >
                <Chat onClose={() => setChatModal(false)} />
            </Modal>
        </>
    );
};

export default Dashboard;