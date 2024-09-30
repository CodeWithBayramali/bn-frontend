import { deleteGuardRequest, getGuardRequest, postGuardRequest, postJsonGuardRequest, putGuardRequest } from "@/services/requestService";
import { createSlice } from "@reduxjs/toolkit";
import { getAllManagementDispatch } from "./managementSlice";

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        users: []
    },
    reducers: {
        getUsers: (state,action) => {
            state.users = action.payload
        }
    }
})

export const createUserDispatch = (userData) => async (dispatch) => {
    postJsonGuardRequest({controller:'admin/createUser'},userData)
    .then(res=> {
        try {
            dispatch(getAllUserDispatch())
        } catch (error) {
            alert(error.respon.data)
        }
    })
    .catch(err => alert(err.response.data))
} 

export const getAllUserDispatch = () => async (dispatch) => {
    getGuardRequest({controller:'admin'}).then(res=> {
        dispatch(getUsers(res.data))
    }).catch(err => console.log(err))
}

export const updateUserDispatch = (id,role) => async (dispatch) => {
    putGuardRequest({controller:'admin/changeRole'},id,role).then(res => {
        dispatch(getAllUserDispatch())
    }).catch(err => console.log(err))
}

export const deleteUserDispatch = (id) => async (dispatch) => {
    deleteGuardRequest({controller:'admin/deleteUser'},id).then(res=> {
        dispatch(getAllUserDispatch())
    })
    .catch(err=> console.log(err))
}

export const deleteManagementDispatch = (id) => async (dispatch) => {
    deleteGuardRequest({controller:'admin'},id).then(res=> {
        return window.location.reload()
    })
}

export const { getUsers, updateUserRole } = adminSlice.actions;
export default adminSlice.reducer;