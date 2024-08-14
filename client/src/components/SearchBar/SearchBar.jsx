import { FaSearch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

import PropTypes from "prop-types";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  onClearSearch: PropTypes.func.isRequired,
};
  return (
    <div className="w-80 flex items-center px-4 bg-slate-100 rounded-md">
      <input
        type="text"
        placeholder="Search..."
        className="w-full text-xs bg-transparent py-[11px] outline-none"
        value={value}
        onChange={onChange}
        />

        {value && (
          <IoMdClose
            className="text-xl text-slate-500 cursor-pointer hover:text-black mr-3"
            onClick={onClearSearch}
          />
        )}
        <FaSearch
          className="text-xl text-slate-500 cursor-pointer hover:text-black"
          onClick={handleSearch}
        />
    </div>
  )
}

export default SearchBar
