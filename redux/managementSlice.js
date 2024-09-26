import { getGuardParamsRequest, getGuardRequest, postGuardRequest } from "@/services/requestService";
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

export const createManagementDispatch = (formData,router) => async(dispatch) => {
    postGuardRequest({controller:'admin'},formData).then().catch(err=> console.log(err))
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
        getGuardParamsRequest({controller:'management/getManagementsWithMonth'},{month,year})
        .then(res=> {
            dispatch(getManagements(res.data))
        })
    } catch (error) {
        console.log(error)
    }
}

export const {getManagements} = managementSlice.actions
export default managementSlice.reducer;