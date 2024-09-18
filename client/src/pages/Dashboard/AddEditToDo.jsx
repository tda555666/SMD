import TagInput from "@/components/Input/TagInput";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { userContext } from "@/context/userContext"; 

const AddEditToDo = ({ addTask, onClose, taskId, initialData }) => {
    const { user } = useContext(userContext); 

    const [tags, setTags] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        if (initialData) {
            setTags(initialData.tags || []);
            setTitle(initialData.title || "");
            setContent(initialData.content || "");
        }
    }, [initialData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user || !user.id) {
            console.error("User ID is not available.");
            return;
        }
    
        try {
            let response;
            const taskData = {
                title,
                content,
                tags: Array.isArray(tags) ? tags.map(tag => tag.trim()) : []
            };
    
            if (taskId) {
                response = await axios.put(`${baseAPIURL}/tasks/${taskId}`, taskData, getAuthConfig());
            } else {
                response = await axios.post(`${baseAPIURL}/tasks/${user.id}`, taskData, getAuthConfig());
            }
    
            if (response.status === 200 || response.status === 201) {
                // Include the task ID to ensure proper updates
                addTask({ ...taskData, _id: taskId || response.data._id });
                onClose();
            } else {
                console.error("Unexpected response status:", response.status);
            }
        } catch (error) {
            console.error("Error saving task:", error.message);
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col gap-2'>
                    <label className='input-label'>TITLE</label>
                    <input
                        type="text"
                        className='text-2xl text-slate-950 outline-none'
                        placeholder='Go to GYM at 5'
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                        required
                    />
                </div>

                <div className="flex flex-col gap-2 mt-4">
                    <label className="input-label">CONTENT</label>
                    <textarea
                        className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
                        placeholder="Content"
                        rows={10}
                        value={content}
                        onChange={({ target }) => setContent(target.value)}
                        required
                    />
                </div>

                <div className="mt-3">
                    <label className="input-label">TAGS</label>
                    <TagInput tags={tags} setTags={setTags} />
                </div>

                <button type="submit" className="btn-primary font-medium mt-5 p-3">
                    {taskId ? "UPDATE" : "ADD"}
                </button>
            </form>
        </div>
    );
};

export default AddEditToDo;