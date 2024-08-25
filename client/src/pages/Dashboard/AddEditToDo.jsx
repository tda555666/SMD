import TagInput from "@/components/Input/TagInput";
import { useState } from "react";
import axios from "axios"; // Import axios for making HTTP requests

const AddEditToDo = ({ onClose, type, initialData }) => {
    const [tags, setTags] = useState(initialData ? initialData.tags.join(", ") : "");
    const [title, setTitle] = useState(initialData ? initialData.title : "");
    const [content, setContent] = useState(initialData ? initialData.content : "");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "/api/tasks", // Replace with your API endpoint
                {
                    title,
                    content,
                    tags: tags.split(", ").map(tag => tag.trim())
                },
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`, // Use localStorage or other storage to get the token
                        "Content-Type": "application/json"
                    }
                }
            );
            if (response.status === 200) {
                // Assuming you want to refresh the page or redirect after successful task creation
                window.location.reload(); // Or use a routing library to navigate to the task list
            }
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col gap-2'>
                    <label className='input-lable'>TITLE</label>
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
                    <label className="input-lable">CONTENT</label>
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
                    <label className="input-lable">TAGS</label>
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
