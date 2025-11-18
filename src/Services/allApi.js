import axiosConfig from "./axiosConfig";
import { BaseURL } from "./baseUrl";

export const createBank = async (reqBody) =>{
    return await axiosConfig("Post",`${BaseURL}/bank`,reqBody)
}

export const getBank = async ()=>{
    return await axiosConfig("Get",`${BaseURL}/bank`,"")
}

export const deleteBank=async (id)=>{
    return await axiosConfig("Delete",`${BaseURL}/bank/${id}`,{})
}

export const editBank = async (id,reqBody)=>{
    return await axiosConfig("Put",`${BaseURL}/bank/${id}`,reqBody)
}
