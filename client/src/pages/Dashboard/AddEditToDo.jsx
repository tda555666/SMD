import TagInput from "@/components/Input/TagInput";
import { useState, useContext } from "react";
import axios from "axios";
import { userContext } from "@/context/userContext"; // Ensure this import is correct

const AddEditToDo = ({ addTask, onClose, type, initialData }) => {
    const { user } = useContext(userContext); // Get user context

    // Initialize state for tags, title, and content
    const [tags, setTags] = useState(
        initialData && Array.isArray(initialData.tags) ? initialData.tags : []
    );
    const [title, setTitle] = useState(initialData ? initialData.title : "");
    const [content, setContent] = useState(initialData ? initialData.content : "");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user || !user.id) {
            console.error("User ID is not available.");
            return;
        }
        try {
            const response = await axios.post(
                `${baseAPIURL}/tasks/${user.id}`, // Make sure baseAPIURL is defined
                {
                    title,
                    content,
                    tags: Array.isArray(tags) ? tags.map(tag => tag.trim()) : []
                },
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
                        "Content-Type": "application/json"
                    }
                }
            );
            
            if (response.status === 201) {
                addTask({
                    title,
                    content,
                    tags: Array.isArray(tags) ? tags.map(tag => tag.trim()) : []
                });
                onClose(); // Close the modal
            }
        } catch (error) {
            console.error("Error adding task:", error.message);
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
                    ADD
                </button>
            </form>
        </div>
    );
};

export default AddEditToDo;
