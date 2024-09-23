import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const managementSlice = createSlice({
    name:'management',
    initialState: {
        managements: []
    },
    reducers: {
        getManagements:(state,action) => {
            state.managements = action.payload
        }
    }
})

export const createManagementDispatch = (formData) => async(dispatch) => {
    axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API}/management`,formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${localStorage.getItem('access-token')}`
        }
    }).then(res=> console.log(res))
    .catch(err=> {
        console.log(err)
    })
}

export const getAllManagementDispatch = (page,size) => async (dispatch) => {
    try {
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/management`, {
            params: {page:page,size:size}
        }).then(res => {
            dispatch(getManagements(res.data))
        }).catch(err => {console.log(err)})
    } catch (error) {
        console.log(error)
    }
}

export const getAllManagementWithDate = (month,year) => async (dispatch) => {
    try {
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/management/getManagementsWithMonth`, {
            params: {month:month,year:year}
        }).then(res => {
            dispatch(getManagements(res.data))
        })
    } catch (error) {
        
    }
}

export const {getManagements} = managementSlice.actions
export default managementSlice.reducer;