import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import '../Home/home.css'
import Swal from 'sweetalert2'
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updatetodo } from '../../Redux/action/TodoAction';
const Edit = () => {
    const location = useParams();
    const navigate =  useNavigate();
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');
  const [inputValuedes, setInputdes] = useState('');
    const { isAuthenticated, error, users } = useSelector((state) => state.user);
  const addItem = () => {
    if (inputValue.trim() === "") {
        Swal.fire({
                    icon: 'error',
                    title: "You must fill the input",
                    confirmButtonColor: '#18a0fb',
                })
      return;
    }
    console.log(location)
    const formData = new FormData();
    formData.append('title', inputValue);
    formData.append('description', inputValuedes);
    dispatch(updatetodo(formData ,location.id))
    
  };
    const{todo,isadded,isupdate} = useSelector((state) => state.todo);
useEffect(()=>{
    console.log(isupdate)
    if(isupdate){
        Swal.fire({
          icon: 'success',
          title: "Todo updated successfully",
          confirmButtonColor: '#18a0fb',
      });
      dispatch({
        type:'todo_error'
      })
      navigate('/home')
      }
},[isupdate,dispatch,navigate])
  return (
    <div>
        <header className="header">
        {console.log(users)}
        <h1>Welcome {users.userName} in TODO List app</h1>
        <button onClick={()=>{
          localStorage.removeItem("Token");
          dispatch({
            type:'logout'
          })
          navigate('/')
        }} className='logoutbtn'>Logout</button>
      </header>
      <div className='input_boxes'>
      <div className="input-field">
          <input 
            type="text" 
            placeholder="title" 
            id="add-item" 
            
            value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)}
          />
          </div>
        <div className="input-field">
          <input 
            type="text" 
            placeholder="description" 
            id="add-item" 
            value={inputValuedes} 
            maxLength={150}
            onChange={(e) => setInputdes (e.target.value)}
          />

          <span onClick={addItem} className="fa fa-plus add">+</span>
        </div>
        </div>
    </div>
  )
}

export default Edit