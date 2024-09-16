import React, { useState, useEffect } from "react";
import Notecard from "../../components/Cards/Notecard";
import AddEditToDo from "./AddEditToDo";
import Modal from "react-modal";
import { MdAdd, MdChat } from "react-icons/md";
import { getData, deleteTask } from "@/services/getData";
import { useChat } from "../../context/chatContext"; // Import the custom hook for Chat context

const Dashboard = ({ userId, setUser }) => {
    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShow: false,
        type: "add",
        data: null,
    });

    const [tasks, setTasks] = useState([]);
    const { Chat } = useChat(); // Use the Chat component from context

    const [chatModal, setChatModal] = useState(false);
  
    const handleToggleChatModal = () => {
      setChatModal((prev) => !prev); // Toggle the chat modal visibility
    };

    useEffect(() => {
        (async function () {
            let result = await getData(userId, 'tasks', setUser);
            if (result.status) {
                setTasks(result.data);
                console.log(result.data[0]);
                console.log('this is tasks' + tasks);
            }
        })();
    }, [userId, setUser]);

    const handleCloseModal = () => {
        setOpenAddEditModal({
            isShow: false,
            type: "add",
            data: null,
        });
    };

  

    const handleDelete = async (taskId) => {
        try {
            await deleteTask(taskId);
            setTasks(tasks.filter(task => task._id !== taskId));
        } catch (error) {
            console.error('Error during task deletion:', error);
        }
    };

    const handleCheckboxChange = (taskId) => (event) => {
        const isChecked = event.target.checked;
        setTasks(tasks.map(task =>
            task._id === taskId ? { ...task, isChecked } : task
        ));
    };

    const handleEdit = (task) => {
        setOpenAddEditModal({
            isShow: true,
            type: "edit",
            data: task,
        });
    };

    function addTask(newTask) {
        setTasks([...tasks, newTask]);
    }

    const cardsArr = tasks.length === 0 ? (
        <p>No more tasks</p>
    ) : (
        tasks.map((t) => (
            <Notecard
                key={t._id}
                title={t.title}
                date={t.createdAt}
                content={t.content}
                tags={t.tags.join(', ')}
                isPinned={true}
                onEdit={() => handleEdit(t)}
                onDelete={() => handleDelete(t._id)}
                onPinNote={() => {}}
                onCheckboxChange={() => handleCheckboxChange(t._id)}
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

            <div className="fixed bottom-5 right-5 flex gap-4">
                <button
                    className="w-16 h-16 flex items-center justify-center rounded-2xl text-white font-medium bg-primary"
                    onClick={() => {
                        setOpenAddEditModal({
                            isShow: true,
                            type: "add",
                            data: null,
                        });
                    }}
                >
                    <MdAdd className="text-[32px] text-white" />
                </button>

                <button
                    className="w-16 h-16 flex items-center justify-center rounded-2xl text-white font-medium bg-secondary"
                    onClick={handleToggleChatModal} // Toggle chat modal visibility
                    style={{ position: 'fixed', bottom: '20px', right: '20px' }} // Adjust position of the button
                >
                    <MdChat className="text-[32px] text-white" />
                </button>
            </div>

            <Modal
                isOpen={openAddEditModal.isShow}
                onRequestClose={handleCloseModal}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.2)",
                    },
                }}
                contentLabel=""
                className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
            >
                <AddEditToDo
                    onClose={handleCloseModal}
                    type={openAddEditModal.type}
                    initialData={openAddEditModal.data}
                    addTask={addTask}
                />
            </Modal>

            <Modal
            isOpen={chatModal} // Use boolean state to control modal visibility
            onRequestClose={handleToggleChatModal} // Close chat modal when overlay is clicked
            style={{
            overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.1)",
            },
            content: {
                position: 'absolute',
                top: '65px', // Distance from the top of the viewport
                left: '79%', // Distance from the right side of the viewport
                width: '300px', // Width of the modal
                height: '500px', // Height of the modal
            }
            }}
            contentLabel="Chat Modal"
            shouldCloseOnOverlayClick={true} // Allow closing modal by clicking overlay
            >
            <Chat
            onClose={handleToggleChatModal} 
            className="bg-secondary" // Close the chat modal when this function is called
            />
            </Modal>
        </>
    );
};

export default Dashboard;
