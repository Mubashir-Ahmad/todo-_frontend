import axios from "axios";
const createtodo = (formContent) => async (dispatch) => {
    dispatch({
        type: "todo_request",
      });
      try {
        const token = localStorage.getItem("Token");
        console.log(token)
        const headers = { "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         };
         const response = await axios.post(
            "https://todo-backend-cyan-xi.vercel.app/api/todo/createtodo",
            formContent,
            { headers: headers }
          );
          console.log(response)
          dispatch({
              type: "create_todo_success",
              payload: response.data.data,
            });
        }catch(error){
console.log(error)
        }
    }

const gettodo = () => async (dispatch) => {
    dispatch({
        type: "todo_request",
      });
      try {
        const token = localStorage.getItem("Token");
        const headers = { "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         };
        const response = await axios.get(
          "https://todo-backend-cyan-xi.vercel.app/api/todo/gettodo",
          { headers: headers }
        );
        console.log(response)
        dispatch({
            type: "todo_success",
            payload: response.data.data,
          });
    }
    catch(error){
        console.log("todo_error",error);
    dispatch({
      type: "todo_error",
      payload: error.response,
    });
    }
}
const deletetodo = (id) => async (dispatch) => {
    console.log('idsss',id._id)
    dispatch({
        type: "todo_request",
      });
      try{
        const token = localStorage.getItem("Token");
        const headers = { "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         };
        const response = await axios.delete(
          `https://todo-backend-cyan-xi.vercel.app/api/todo/todos/${id._id}`,
          { headers: headers }
        );
        console.log(response)
        dispatch({
            type: "delete_todo_success",
          });
      }
      catch(error){
        console.log("todo_error",error);
        dispatch({
          type: "todo_error",
          payload: error.response,
        });
      }
    }
    const updatetodo = (formContent,id) => async (dispatch) => {
        console.log('idsss',id)
        dispatch({
            type: "todo_request",
          });
          try{
            const token = localStorage.getItem("Token");
            const headers = { "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
             };
            const response = await axios.put(
              `https://todo-backend-cyan-xi.vercel.app/api/todo/todos/${id}`,formContent,
              { headers: headers }
            );
            console.log(response)
            dispatch({
                type: "update_todo_success",
              });
          }
          catch(error){
            console.log("todo_error",error);
            dispatch({
              type: "todo_error",
              payload: error.response,
            });
          }
        }

export {gettodo,createtodo,deletetodo,updatetodo}