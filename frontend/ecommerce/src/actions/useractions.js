import axios from 'axios'
import { USER_LOGIN_FAIL,USER_LOGIN_SUCCESS,USER_LOGOUT,USER_SIGNUP_FAIL
    ,USER_SIGNUP_SUCCESS,USER_SIGNUP_REQUEST,USER_LOGIN_REQUEST
 } from '../constants/userconstants'
import {
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
} from '../constants/userconstants';


export const signup=(fname,lname,email,password)=> async(dispatch)=>{

    try{
        dispatch(
            {
                type:USER_SIGNUP_REQUEST
            }
        )
        const config={
            headers:{
                'Content-type':'application/json'
            }
        }
        const{data}=await axios.post('/api/users/register/',
        {
            'fname':fname,
            'lname':lname,
            'email':email,
            'password':password

        },config)
        dispatch({
            type:USER_SIGNUP_SUCCESS,
            payload:data
        })
    }
    catch(error){
        dispatch({
            type:USER_SIGNUP_FAIL,
            payload:error.response &&  error.response.data.detail
            ? error.response.data.detail
            :error.message,
        })
    }



} 
export const login=(email,password)=> async(dispatch)=>{

    try{
        dispatch(
            {
                type:USER_LOGIN_REQUEST
            }
        )
        const config={
            headers:{
                'Content-type':'application/json'
            }
        }
        const{data}=await axios.post('/api/users/login/',
        {


            'username':email,
            'password':password

        },config)
        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:data
        })
        localStorage.setItem('userInfo',JSON.stringify(data))
    }
    catch(error){
        dispatch({
            type:USER_LOGIN_FAIL,
            payload:error.response &&  error.response.data.detail
            ? error.response.data.detail
            :error.message,
        })
    }



} 
export const logout=()=>(dispatch)=>{
    localStorage.removeItem('userInfo');
    dispatch({type:USER_LOGOUT})

}
export const getUserDetails = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState(); // get token from logged-in user

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('/api/users/profiles/', config);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};