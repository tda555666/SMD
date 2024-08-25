import Notecard from "@/components/Cards/Notecard";
import Navbar from "@/components/Navbar/Navbar";
import AddEditToDo from "./AddEditToDo";
import { useState } from "react";
import Modal from "react-modal";
import { MdAdd } from "react-icons/md";

const Dashboard = () => {
    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShow: false,
        type: "add",
        data: null,
    });

    const handleCloseModal = () => {
        setOpenAddEditModal({
            isShow: false,
            type: "add",
            data: null,
        });
    };

    return (
        <>
            <div className="container mx-auto">
                <div className="grid grid-cols-3 gap-4 mt-8">
                    <Notecard
                        title="Notecard 1 Meeting on 13th August 2024"
                        date="13th August 2024"
                        content="Meeting with the team to discuss the project"
                        tags={["tag1", "tag2"]}
                        isPinned={true}
                        onEdit={() => {}}
                        onDelete={() => {}}
                        onPinNote={() => {}}
                    />
                </div>
            </div>

            <button
                className="w-16 h-16 flex items-center justify-center rounded-2xl text-white font-medium bg-primary fixed bottom-5 right-5"
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
                <AddEditToDo onClose={handleCloseModal} type={openAddEditModal.type} initialData={openAddEditModal.data} />
            </Modal>
        </>
    );
};

export default Dashboard;
