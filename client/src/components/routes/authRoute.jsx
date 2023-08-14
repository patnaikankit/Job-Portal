import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideloading, showLoading } from "../../redux/features/alertSlice.js"
import axios from "axios"
import { setUser } from '../../redux/features/auth/authSlice.js'
import { useNavigate } from 'react-router-dom'

export const authRoute = ({children}) => {
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
            localStorage.clear()
            navigate("/login")
        }
    }
    catch(error){
        // we have to make to delete the contents of local storage we are saving our token there in case there is an error while login/registering a user
        localStorage.clear()
        dispatch(hideloading())
        console.log(error);
    }
  }

  useEffect(() => {

  })
}
