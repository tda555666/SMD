import { FaRegEye } from 'react-icons/fa6';
import { FaRegEyeSlash } from 'react-icons/fa6';
import { useState } from 'react';
import PropTypes from 'prop-types';

const PasswordInput = ({ value, onChange, placeholder }) => {

    PasswordInput.propTypes = {
        value: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        placeholder: PropTypes.string
    };
    const [isShowPassword, setIsShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setIsShowPassword(!isShowPassword);
    };

    return (
        <div className="flex  items-center bg-transparent  rounded  my-3">
            <div className='input-box flex justify-center items-center'>
                <input
                    type={isShowPassword ? "text" : "password"}
                    placeholder={placeholder || "Password"}
                    value={value}
                    onChange={onChange}
                    className="w-full text-sm bg-transparent rounded outline-none"
                    required
                    name='password'
                />
                {isShowPassword ?(
                <FaRegEye
                    size={22}
                    type="button"
                    onClick={toggleShowPassword}
                    className="text-primary cursor-pointer"
                />
                ) : (
                <FaRegEyeSlash
                    size={22}
                    type="button"
                    onClick={toggleShowPassword}
                    className="text-slate-400 cursor-pointer"
                />)}
            </div>
        </div>
    );
}

export default PasswordInput;