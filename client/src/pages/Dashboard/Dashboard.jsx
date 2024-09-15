import Notecard from "@/components/Cards/Notecard";
import AddEditToDo from "./AddEditToDo";
import { useState , useEffect} from "react";
import Modal from "react-modal";
import { MdAdd } from "react-icons/md";
import { getData , deleteTask} from "@/services/getData";

const Dashboard = ({userId,setUser}) => {
    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShow: false,
        type: "add",
        data: null,
    });

    const[tasks, setTasks] = useState([])

    const handleCloseModal = () => {
        setOpenAddEditModal({
            isShow: false,
            type: "add",
            data: null,
        });
    };

    useEffect(()=> {
        (async function () {
            let result = await getData(userId, 'tasks', setUser)
             if(result.status){
                setTasks(result.data)
                console.log(result.data[0]);
                console.log('this is tasks' + tasks);
                
                
            }
        })();
    },[])

    const handleDelete = async (taskId, tasks) => {
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

   
    

    function addTask(newTask){
        setTasks([...tasks, newTask])
    }

    const cardsArr = tasks.length===0 ? <p>no more tasks</p> : 
        tasks.map((t,id)=> (
        <Notecard 
            key={t._id}
            title={t.title}
            date={t.createdAt}
            content={t.content}
            tags={t.tags.join(', ')}
            isPinned={true}

           
           

            onEdit={() => {<AddEditToDo taskId={t._id}/>}}
            onDelete={() =>  handleDelete(t._id, tasks)}

            onPinNote={() => {}}
            onCheckboxChange={() => {handleCheckboxChange(t._id)}}
        />
        
        
    ));
    

    return (
        <>
            <div className="container mx-auto">
                <div className="grid grid-cols-3 gap-4 mt-8">
                    {cardsArr}
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
                <AddEditToDo onClose={handleCloseModal} 
                                type={openAddEditModal.type} 
                                initialData={openAddEditModal.data} 
                                addTask={addTask}/>
            </Modal>
        </>
    );
};

export default Dashboard;
