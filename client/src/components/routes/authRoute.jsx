import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading, showLoading } from "../../redux/features/alertSlice.js"
import axios from "axios"
import { setUser } from '../../redux/features/auth/authSlice.js'
import { useNavigate, Navigate } from 'react-router-dom'

// AuthRoute is an extension of the authMiddleware here we are connecting the frontend and backend
// we are passing the contents of the header file to the backend to verify whether a user exists or not 
// if the user is not authenticated he cannot access any of the priavte routes
export const AuthRoute = ({children}) => {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const userData = async () => {
    try{
        dispatch(showLoading())
        const { response } = await axios.post("/api/v1/user/getUserData", {
            token: localStorage.getItem("token")},{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        )
        dispatch(hideloading())
        if(response.success){
            dispatch(setUser(response.data))
        }
        else{
            localStorage.clear();
            navigate("/login")
        }
    }
    catch(error){
        // we have to delete the contents of local storage, we are saving our token there, in case there is an error while login we have to make sure that if there is token it should be deleted
        localStorage.clear()
        dispatch(hideLoading())
        console.log(error);
    }
  }

  useEffect(() => {
    if(!user){
        userData();
    }
  });

  if(localStorage.getItem("token")){
    return children
  }
  else{
    return <Navigate to="/login" />;
  }
}
