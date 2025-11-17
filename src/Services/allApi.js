import axiosConfig from "./axiosConfig";

export const createBank = async (reqBody) =>{
    return await axiosConfig("Post","http://localhost:3000/bank",reqBody)
}

export const getBank = async ()=>{
    return await axiosConfig("Get","http://localhost:3000/bank","")
}

export const deleteBank=async (id)=>{
    return await axiosConfig("Delete",`http://localhost:3000/bank/${id}`,{})
}

export const editBank = async(id,reqBody)=>{
    return await axiosConfig("Put",`http://localhost:3000/bank/${id}`,reqBody)
}
