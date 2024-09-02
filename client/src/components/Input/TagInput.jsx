import { useState } from 'react';
import { MdAdd, MdClose } from 'react-icons/md';

function TagInput({ tags, setTags }) {
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const addNewTag = () => {
        if (inputValue.trim() !== "" && !tags.includes(inputValue.trim())) {
            setTags([...tags, inputValue.trim()]);
            setInputValue("");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            addNewTag();
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    return (
        <div>
            {tags.length > 0 && (
                <div className='flex items-center gap-2 flex-wrap mt-2'>
                    {tags.map((tag, index) => (
                        <span key={index} className='flex items-center text-sm text-slate-950 gap-2 bg-slate-200 px-3 py-1 rounded'>
                            # {tag}
                            <button onClick={() => handleRemoveTag(tag)}>
                                <MdClose className='' />
                            </button>
                        </span>
                    ))}
                </div>
            )}

            <div className='flex items-center gap-4 mt-3'>
                <input
                    type="text"
                    value={inputValue}
                    className='text-sm bg-transparent border px-3 py-2 rounded outline-none'
                    placeholder='Add tags'
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />

                <button
                    type="button"
                    className='w-8 h-8 flex items-center justify-center rounded-lg border-primary border hover:bg-primary'
                    onClick={addNewTag}
                >
                    <MdAdd className='text-2xl text-primary hover:text-white' />
                </button>
            </div>
        </div>
    );
}

export default TagInput;
