import { getGuardRequest } from "@/services/requestService";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const authSlice = createSlice({
    name:'auth',
    initialState: {
        token: null,
        user: null
    },
    reducers: {
        signIn:(state,action) => {
          state.token = action.payload.accessToken
        },
        logOut:(state,action) => {
            state.token = null
        },
        getToken: (state,action) => {
            state.token = localStorage.getItem('access-token')
        },
        getUser: (state,action) => {
            state.user = action.payload
        },
        removeUser: (state,action) => {
            state.user = null
        }
    }
})

export const signInDispatch = (userData) => async(dispatch) => {
    await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/authenticate`,userData)
    .then(
        (res)=> {
            try {
            localStorage.setItem('access-token',res.data.accessToken)
            dispatch(signIn(res.data.accessToken))
            dispatch(getUser(res.data.userDto))
            if(res.status === 200) {
                location.reload()
            }
            } catch (error) {
                console.log(res.data)
            }
    }).catch(err=> {
        console.log(err)
    }).finally(err => {
        console.log(err)
    })
}

export const getUserDispatch = () => async(dispatch) => {
    const decode = jwtDecode(localStorage.getItem('access-token'))
    await getGuardRequest({controller:'auth/getUser'},decode.userId).then(res=> {
        console.log(res.data)
    })
}

export const logOutDispatch = () => async(dispatch) => {
    dispatch(logOut())
    localStorage.removeItem('access-token')
    dispatch(removeUser())
    location.reload()
}


export const { signIn, logOut, getToken, getUser, removeUser } = authSlice.actions
export default authSlice.reducer;