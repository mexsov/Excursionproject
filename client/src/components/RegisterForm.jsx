import { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import "./css/registrationform.css"
import { registerUser } from './api/apis';
import { Link } from 'react-router-dom'
import { AuthContext } from './utils/AuthContext';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';

function RegisterForm() {
  const {
    // register yra funkcija, kuri yra naudojama, kad registruoti formos laukus
    register,
    // handleSubmit yra funkcija, kuri yra naudojama, kad apdoroti formos duomenis ir išsiųsti užklausą į serverį
    handleSubmit,
    // formState yra objektas, kuris turi visas formos savybes, kurios yra naudojamos formos valdymui, 
    // kaip pavyzdžiui, klaidos, kurių yra formoje ar success, kuri yra naudojama, kad nurodyti, kad forma buvo sėkmingai išsiųsta
    formState: { errors },
    // setError yra funkcija, kuri yra naudojama, kad nurodyti klaidas formos laukuose
    setError,
  } = useForm();
  const [serverError, setServerError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const navigate = useNavigate();

  const { user, token } = useContext(AuthContext);
  useEffect(() => {
    // If user is logged in then redirect him to home page
    if (token && user) {
      navigate("/");
      return;
    }
  }, [token, user, navigate])

  const onSubmit = async (data) => {
    // prieš išsiunčiant užklausą į serverį, patikriname ar slaptažodžiai sutampa
    // Patikrinant ir kliento pusėje ar slaptažodis sutampa, nes taip išvengiame nereikalingų užklausų į serverį
    if (data.password !== data.repeatPassword) {
      setError('repeatPassword', {
        // type: 'manual' nurodo, kad klaida yra nurodyta rankiniu būdu
        type: 'manual',
        message: 'Passwords do not match',
      });
      return;
    }

    try {
      // išsiunčiame užklausą į serverį, kad užregistruoti vartotoją
      await registerUser(data).then(() => setSuccessMessage('Registration successful!'));
      setTimeout(() => navigate('/login'), 3000)

    } catch (error) {
      // console.log(error.response.data);
      // jeigu iš serverio gauname klaidą, tai ją apdorojame ir nurodome, kad klaida yra email lauke
      if (error.response && error.response.status === 400) {
        const errors = error.response.data.errors;
        for (let i = 0; i < errors.length; i++) {
          setError(errors[i].path, {
            type: "manual",
            message: errors[i].msg
          });
        }
      } else {
        setServerError('Something went wrong. Please try again later');
      }
    }
  };

  return (
    <>
      <div className='wrapper-body'>
        <div className='wrapper-register'>
          <div className="from-box register">
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <h1 className='loginName'>Registration</h1>

              <div className='field-box'>
                <div className='input-box'>
                  <input type="text" placeholder='Enter your username' {...register('username', {
                    required: {
                      value: true,
                      message: "Username is required"
                    },
                    minLength: {
                      value: 3,
                      message: "Username must be in between 3 and 20 characters"
                    },
                    maxLength: {
                      value: 20,
                      message: "Username must be in between 3 and 20 characters"
                    }
                  })} />
                  <FaUser className='icon' />
                </div>
                {errors.username && <p className='input_error'>{errors.username.message}</p>}
              </div>

              <div className='field-box'>
                <div className='input-box'>
                  <input type="text" placeholder='Enter your email address' {...register('email', {
                    required: {
                      value: true,
                      message: "Email is required"
                    },
                    pattern: {
                      value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: 'Please enter a valid email',
                    }
                  })} />
                  <FaEnvelope className='icon' />
                </div>
                {errors.email && <p className='input_error'>{errors.email.message}</p>}
              </div>

              <div className='field-box'>
                <div className='input-box'>
                  <input type="password" placeholder='Enter your password' {...register('password', {
                    required: {
                      value: true,
                      message: "Password is required"
                    },
                    minLength: {
                      value: 8,
                      message: "Password must be in between 8 and 128 characters"
                    },
                    maxLength: {
                      value: 128,
                      message: "Password must be in between 8 and 128 characters"
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&~#^_+=\-';,./|":<>?])[A-Za-z\d@$!%*?&~#^_+=\-';,./|":<>?]{8,128}$/,
                      message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
                    }
                  })} />
                  <FaLock className='icon' />
                </div>
                {errors.password && <p className='input_error'>{errors.password.message}</p>}
              </div>

              <div className='field-box'>
                <div className='input-box'>
                  <input type="password" placeholder='Enter again your password' {...register('repeatPassword', {
                    required: {
                      value: true,
                      message: "Password is required"
                    },
                    minLength: {
                      value: 8,
                      message: "Password must be in between 8 and 128 characters"
                    },
                    maxLength: {
                      value: 128,
                      message: "Password must be in between 8 and 128 characters"
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&~#^_+=\-';,./|":<>?])[A-Za-z\d@$!%*?&~#^_+=\-';,./|":<>?]{8,128}$/,
                      message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
                    }
                  })} />
                  <FaLock className='icon' />
                </div>
                {errors.repeatPassword && <p className='input_error'>{errors.repeatPassword.message}</p>}
              </div>

              <div className='remeber-forgot'>
                <label><input type="checkbox" required />I agree to the terms & conditions</label>
              </div>
              <button type='submit'>Register</button>
              <div className='register-link'>
                <p>Already have an account? <Link to="/login">Login</Link></p>
              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterForm;