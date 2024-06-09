import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from './utils/AuthContext';
import { Link } from 'react-router-dom'
import "./css/loginform.css";
import { FaUser, FaLock } from 'react-icons/fa';


function LoginForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm();
  // useContext() metodas yra naudojamas, kad pasiekti AuthContext objektą
  // kaip lifte mes paspaudžiame mygtuką ir galime pasiekti, bet kokį aukšta
  const { loginUser } = useContext(AuthContext);
  const [serverError, setServerError] = useState(null);

  const { user, token } = useContext(AuthContext);
  useEffect(() => {
    // If user is logged in then redirect him to home page
    if (token && user) {
      navigate("/");
      return;
    }
  }, [token, user, navigate])

  const onSubmit = async (data) => {
    try {
      const result = await loginUser(data);
      // jeigu gauname result ir result turi tokeną, tai nukreipiame vartotoją į dashboard puslapį arba admin-dashboard puslapį
      if (result && result.token) {
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = error.response.data.errors;
        for (let i = 0; i < errors.length; i++) {
          setError(errors[i].path, {
            type: "manual",
            message: errors[i].msg
          });
        }
      }
      else {
        setServerError(error.message);
      }
    }
  };

  return (
    <>

      <div className='wrapper-body'>
        <div className='wrapper'>
          <div className="from-box login">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1 className='loginName'>Login</h1>
              <div className='field-box'>

                <div className='input-box'>
                  <input type="text" placeholder='Username' {...register('login', { required: 'Username/Email is required' })} />
                  <FaUser className='icon' />
                </div>
                {errors.login && <p className='input_error'>{errors.login.message}</p>}
              </div>
              <div className='field-box'>
                <div className='input-box'>
                  <input type="password" placeholder='Password' {...register('password', { required: 'Password is required' })} />
                  <FaLock className='icon' />
                </div>
                {errors.password && <p className='input_error'>{errors.password.message}</p>}
              </div>
              <div className='remeber-forgot'>
                <label><input type="checkbox" />Remeber me</label>
                <Link to="/signup">Forgot password? </Link>
              </div>
              <button type='submit'>Login</button>
              <div className='register-link'>
                <p>Don't have an account? <Link to="/signup">Register</Link></p>
              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
