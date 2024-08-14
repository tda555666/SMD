import TagInput from "@/components/Input/TagInput"
import { useState } from "react"

const AddEditToDo = () => {

    const [tags, setTags] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    return (
    <div>
        <div className='flex flex-col gap-2'>
            <label className='input-lable'>TITLE</label>
            <input
                type="text"
                className='text-2xl text-slate-950 outline-none'
                placeholder='Go to GYM at 5'
                value={title}
                onChange={({ target }) => setTitle(target.value)}
            />
        </div>

        <div className="flex flex-col gap-2 mt-4">
            <label className="input-lable">COUNTENT</label>
            <textarea
                type="text"
                className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
                placeholder="Content"
                rows={10}
                value={content}
                onChange={({ target }) => setContent(target.value)}
                />
        </div>

        <div className="mt-3">
            <label className="input-lable">TAGS</label>
            <TagInput  tags={tags} setTags={setTags}/>
        </div>

        <button className="btn-primary font-medium mt-5 p-3">
            ADD
        </button>
    </div>
    )
}

export default AddEditToDo
