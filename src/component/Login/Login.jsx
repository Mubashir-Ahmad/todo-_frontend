import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {load_user, login, register } from '../../Redux/action/UserAction';
import './login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
function Login() {
  const navigate = useNavigate();
  // const alert = useAlert();
  const dispatch = useDispatch();
  const { isAuthenticated, error, loading,isadded, users } = useSelector((state) => state.user);

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switchTab = useRef(null);
  const id = useLocation();

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');



  useEffect(() => {
  
    if (error) {
      toast.error(error, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
    if(isadded == true){
      Swal.fire({
        icon: 'success',
        title: "user Added successfully",
        confirmButtonColor: '#18a0fb',
    });
    dispatch({
      type:'logout'
    })
    navigate('/')
    }
    if(isAuthenticated == true)
    {
      console.log(isAuthenticated)
      navigate('/home');
    }
  },[error,navigate,isAuthenticated,isadded])


  const switchtab = (e, tab) => {
    if (tab === 'login') {
      switchTab.current.classList.add('shifttoNeutral');
      switchTab.current.classList.remove('shifttoRight');

      registerTab.current.classList.remove('shifttoNeutralForm');
      loginTab.current.classList.remove('shifttoLeft');
    } else if (tab === 'register') {
      switchTab.current.classList.add('shifttoRight');
      switchTab.current.classList.remove('shifttoNeutral');

      registerTab.current.classList.add('shifttoNeutralForm');
      loginTab.current.classList.add('shifttoLeft');
    }
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', loginEmail);
    formData.append('password', loginPassword);
    dispatch(login(formData));
  }
  const registerSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    dispatch(register(formData));
  };


  return (
    <>
      <div className="Login-container">
        <div className="Login-box">
          <div>
            <div className="login-toggle">
              <p onClick={(e) => switchtab(e, 'login')}>LOGIN</p>
              <p onClick={(e) => switchtab(e, 'register')}>REGISTER</p>
            </div>
            <button ref={switchTab}></button>
          </div>
          <form className="loginform" ref={loginTab} onSubmit={loginSubmit}>
                        <div className="loginEmail">
                            {/* <MailOutlineIcon /> */}
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                            />
                        </div>
                        <div className="loginPassword">
                            {/* <LockOpenIcon /> */}
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                            />
                        </div>
                        <input type="submit" value="Login" className="loginbtn" />
                    </form>
          <form className="signupform" ref={registerTab} onSubmit={registerSubmit} enctype="multipart/form-data">
                        <div className="signupname">
                            {/* <FaceIcon /> */}
                            <input
                                type="text"
                                // name="name"
                                value={name}
                                placeholder="Name"
                                required
                                onChange={(e)=>setName(e.target.value)}
                            />
                        </div>
                        <div className="signupemail">
                            {/* <MailOutlineIcon /> */}
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                name="email"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                        </div>
                        <div className="signupassword">
                            {/* <LockOpenIcon /> */}
                            <input
                                type="password"
                                name="password"
                                value={password}
                                placeholder="Password"
                                required
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                        </div>
                        <input type="submit" value="register" className="siginbtn" />
                    </form>
        </div>
      </div>
                <ToastContainer
                  position="bottom-center"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                   pauseOnHover
                  theme="light"
          />
    </>
  );
}

export default Login;
