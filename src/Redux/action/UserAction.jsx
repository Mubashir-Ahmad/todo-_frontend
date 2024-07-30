import axios from "axios";


const login = (formContent) => async (dispatch) => {
  console.log("saass",formContent);
  dispatch({
    type: "login_request",
  });
  try {
    const headers = { "Content-Type": "application/json" };
    const response = await axios.post(
      "https://todo-backend-cyan-xi.vercel.app/api/users/login",
      formContent,
      { headers: headers }
    );
    console.log("response", response.data);
   if(response.data.success === false){
      console.log('`````````````````````',response);
      dispatch({
        type: "Same_user_exist",
        payload: response.data.message
      });
    }
    dispatch({
      type: "login_success",
      payload: response.data.user,
    });
    const token = response.data.token;
    localStorage.setItem("Token", token);
  } catch (error) {
    console.log("login_error",error);
    dispatch({
      type: "login_error",
      payload: error.response,
    });
  }
};

// user create 
const register = (formdata)=> async(dispatch)=>{
    try{
      dispatch({
        type: "login_request",
      });
      const headers = {
        "Content-Type": "application/json"
      };
      const response = await axios.post(
        "https://todo-backend-cyan-xi.vercel.app/api/users/signup",
        formdata,
        { headers: headers }
      );
      if(response.data.success === true){
        console.log('response!!!!!!!!!!!!!!!!!!!!!!',response);
      dispatch({
        type: "create_user_success",
        payload:response.data.user
      });
    }
    else if(response.data.success === false){
      console.log('`````````````````````',response);
      dispatch({
        type: "Same_user_exist",
        payload: response.data.message
      });
    }
  }
    catch(error){
      console.log('create_user_error',error)
      dispatch({
        type: "login_error",
        payload: error.response,
      });
    }
  }

  const loaduser = () => async (dispatch) => {
    try {
      let token = localStorage.getItem("Token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get("https://todo-backend-gamma-nine.vercel.app/users/load_user", {
        headers: headers,
      });
      console.log("response", response);
      dispatch({
        type: "login_success",
        payload: response.data.user,
      });
      if(response.data.sucess == false){
        console.log('responce',response)
        dispatch({
          type: "login_error",
          payload: response.data.message,
        });
      }
    } catch (error) {
      console.log("loadusererror", error);
      dispatch({
        type: "login_error",
        payload: error,
      });
    }
  };
export {login ,register,loaduser}