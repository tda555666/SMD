import PasswordInput from "../../components/Input/PasswordInput";
import { validateEmail } from "../../utils/helper";
import { Link ,useNavigate } from "react-router-dom";
import { useState ,useContext ,useEffect } from "react";
import { login } from "../../services/auth"
import { userContext } from "../../context/userContext";


const Login = () => {
  const [error, setError] = useState(null);
  const [ formData, setFormData ] = useState({email:'',password:''});
  const [ errMsg, setErrMsg ] = useState('');
  const navigate = useNavigate();
  const { setUser , user} = useContext(userContext);

  const onChange = (e) => {

    setFormData({...formData, [e.target.name]:e.target.value});

  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!formData.password) {
      setError("Please enter your password.");
      return;
    }
    setError("");
    

    if (Object.values(formData).every(v => v)) {

      const result = await login(formData);

      console.log('IN LOGIN')
      if (result.status) {
        let curr = JSON.parse(localStorage.getItem('smduser'));
        console.log(curr);
        setUser(curr)
        
        setFormData({email:'',password:''});
        navigate('/dashboard');

      } else {

        setErrMsg(result.message);

      }

    }
  };

  useEffect(() => {
    console.log('Updated User:', user);
  }, [user]);

  return (
    <>
      <div className="flex justify-center items-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleSubmit}>
            <h4 className="text-2xl font-semibold mb-7 text-primary">Login</h4>
            <div className="flex flex-col space-y-2">
              <input name="email" type="text" placeholder="Email" value={formData.email} onChange={onChange} className="input-box" required/>
            </div>
            <PasswordInput value={formData.password} name="password" onChange={onChange}/>

            {error && <p className="text-red-500">{error}</p>}
            <button type="submit" className="btn-primary">
              Login
            </button>
          </form>
          <p className="text-sm mt-4 text-center">
            Not registered yet?{" "}
            <Link
              to="/signup"
              className="text-indigo-700 font-semibold underline"
            >
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
