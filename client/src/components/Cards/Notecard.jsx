import { MdOutlinePushPin } from "react-icons/md";

import {MdCreate, MdDelete} from "react-icons/md";
const Notecard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  isChecked,
  onEdit,
  onDelete,
  onPinNote,
  onCheckboxChange
}) => {
  return (
    <div
      className={`border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out ${isChecked && 'opacity-30 '}`}
    >
      <div className="flex items-center justify-between">
      <input
          type="checkbox"
          checked={isChecked}
          onChange={onCheckboxChange}
          className="mr-2"
        />
        <div className="">
          <h6 className="text-sm font-medium">{title}</h6>
          <span className="text-sm text-slate-500">{date}</span>
        </div>

        <MdOutlinePushPin className={`icon-btn ${isPinned ? 'text-primary' : 'text-slate-300'}`} onClick={onPinNote} />
      </div>

      <p className="">{content?.slice(0, 60)}</p>
    <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-2 text-xs text-slate-500 mt-2">
          {tags}
        </div>
        <div className="flex items-center gap-2">
          <MdCreate
            className={`icon-btn hover:text-green-600 ${isChecked && 'opacity-50'}`}
            onClick={onEdit}
            style={{ pointerEvents: isChecked ? 'none' : 'all' }}
          />
          <MdDelete
            className={`icon-btn hover:text-red-500 ${isChecked && 'opacity-50'}`}
            onClick={onDelete}
            style={{ pointerEvents: isChecked ? 'none' : 'all' }}
          />
        </div>
      </div>
    </div>
  );
};



export default Notecard;
