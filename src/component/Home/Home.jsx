import React, { useState,useEffect } from 'react';
import './home.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCheckCircle as faCheckCircleO, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'
import { createtodo, deletetodo, gettodo } from '../../Redux/action/TodoAction';
const TodoList = () => {
  const [uncomArray, setUncomArray] = useState({ 1: "Learn PHP", 2: "Learn ReactJs", 3: "Learn MySQL" });
  const [comArray, setComArray] = useState({ 1: "Learn HTML", 2: "Learn CSS", 3: "Learn JS" });
  const [inputValue, setInputValue] = useState('');
  const [inputValuedes, setInputdes] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const{todo,isadded,isdelete} = useSelector((state) => state.todo);
  useEffect(()=>{
    if(isadded){
      Swal.fire({
        icon: 'success',
        title: "Todo Added successfully",
        confirmButtonColor: '#18a0fb',
    });
    dispatch({
      type:'todo_error'
    })
    }
    if(isdelete){
      Swal.fire({
        icon: 'success',
        title: "Todo Delete successfully",
        confirmButtonColor: '#18a0fb',
    });
    dispatch({
      type:'todo_error'
    })
  }
    dispatch(gettodo());
  },[dispatch,isadded,isdelete])
  console.log(useSelector((state) => state.todo))
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
    const formData = new FormData();
    formData.append('title', inputValue);
    formData.append('description', inputValuedes);
    dispatch(createtodo(formData))
    
  };

  const removeItem = (id) => {
   dispatch(deletetodo(id));
  };

 

  const uncompleteTask = (id) => {
    const task = comArray[id];
    const newKey = Object.keys(uncomArray).length + 1;
    setUncomArray(prev => ({ ...prev, [newKey]: task }));
    setComArray(prev => {
      const { [id]: _, ...newArray } = prev;
      return newArray;
    });
  };

  return (
    <>
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
            className='as'
            value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)}
          />
          </div>
        <div className="input-field">
          <input 
            type="text" 
            placeholder="description" 
            id="add-item" 
            className='as'
            value={inputValuedes} 
            maxLength={150}
            onChange={(e) => setInputdes (e.target.value)}
          />

          <span onClick={addItem} className="fa fa-plus add">+</span>
        </div>
        </div>
      <div className="container">
       
        <div className="comp-tasks">
          <h2>Completed Tasks</h2>
          <ul className="items">
            {todo.length > 0 && todo?.map(key => (
              <li key={key} className="item" data-id="comp-tasks" data-sort={key}>
                <span>{key.title}</span>
                <i onClick={() => navigate(`/edit/${key._id}`)} className="fa fa-check-circle uncheck">
                  <FontAwesomeIcon icon={faCheckCircle} />
                </i>
                <i onClick={() =>
              removeItem(key)
              } className="fa fa-trash trash">
                  <FontAwesomeIcon icon={faTrash} />
                </i>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default TodoList;