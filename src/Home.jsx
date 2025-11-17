import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { createBank, deleteBank, editBank, getBank } from './Services/allApi';

const Home = () => {

  const [inputAccNo,setInputAccNo] = useState("")
  const [inputName,setInputName] = useState("")
  const [inputAmount,setInputAmount] = useState("")
  const [inputData,setInputData] = useState([])
  const [editData, setEditData] = useState({})
  const [editId,setEditId] = useState(null)

  useEffect(()=>{
    load()
  },[])

  const onAddClick = async () =>{
    let reqBody = {
  accNo: inputAccNo,
  name: inputName,
  message: `${inputAmount} rupees added to the Account`,
  balance: Number(inputAmount)  
}
    if(inputAccNo=="" || inputName=="" || inputAmount==""){
      alert("Please Fill Out All Details")
    }else{
      let apiResponse = await createBank(reqBody) 
    if(apiResponse.status==201){
      alert("Created Successfully")
      load()
      setInputAccNo("")
          setInputName("")
          setInputAmount("")
          setEditId(null)
    }else{
      alert("Something went wrong")
    }
    }
    }

    const load = async() =>{
      let apiResponse = await getBank()
      if(apiResponse.status==200){
        setInputData(apiResponse.data)
      }
      else{
        alert("Error Occurred")
      }

    }

     const onDeleteClick=async(id)=>{
        let apiResponse = await deleteBank(id)
        if(apiResponse.status==200){
          alert("Successfully deleted")
          load()
        }
        else{
          alert("Something went wrong")
        }
      }

      const onEditBtnClick=(bankObj)=>{
        setInputAccNo(bankObj.accNo)
        setInputName(bankObj.name)
        setInputAmount(bankObj.balance)
        setEditId(bankObj.id)
      }

      const editClick = async ()=>{
        const newBalance = Number(inputAmount)
        let reqBody={
          accNo:inputAccNo,
          name:inputName,
          balance:newBalance,
          message:`${newBalance} rupees updated in the Account`
        }
        let apiResponse = await editBank(editId,reqBody)
        console.log(apiResponse)
        if(apiResponse.status==200){
          alert("Successful")
          load()
          setInputAccNo("")
          setInputName("")
          setInputAmount("")
          setEditId(null)
        }
        else{
          alert("Error Occurred During Edit")
        }
      }

  const creditAmount = async (id, currentBalance,name,accNo) => {
  let credit = prompt("Enter the amount to credit");
  if(credit == "" || isNaN(credit)){
    alert("Please enter a valid Amount")
    return 
  }
  if(credit<0){
    alert("Enter an amount greater than Zero ")
    return
  }
  const creditValue = Number(credit)
  const newBalance = Number(currentBalance) + creditValue;
  const reqBody = { accNo,
  name,
  message:`${creditValue} rupees Credited to the Account`,
  balance: newBalance, };
  const apiResponse = await editBank(id, reqBody);
  if (apiResponse.status === 200) {
    alert("Amount Credited");
    setInputAmount("")
    load();
  } else {
    alert("Credit Failed");
  }
};
const debitAmount = async (id, currentBalance,name,accNo) => {
  let debit = prompt("Enter the amount to debit");
  if(debit=="" || isNaN(debit)){
    alert("Please Enter a valid Amount")
    return
  }
  let debitValue = Number(debit);
  if(debitValue>currentBalance || debitValue<0){
    alert("Insufficient Amount or a Negative Value cannot be entered")
    return
  }
  const newBalance = Number(currentBalance) - debitValue;
  const reqBody = { 
  accNo,
  name,
  message:`${debitValue} rupees Debited from the Account`,
  balance: newBalance };
  const apiResponse = await editBank(id, reqBody);
  if (apiResponse.status === 200) {
    alert("Amount Debited");
    setInputAmount("")
    load();
  } else {
    alert("Debit Failed");
  }
};

  return (
    <>

        <div className="container bg-dark p-5">
            <h1 className='text-light text-center'>BANK MANAGEMENT</h1>
            <div className='d-md-flex justify-content-center align-items-center p-5 gap-5 text-sm-center'>
                <input onChange={(e)=>setInputAccNo(e.target.value)} type="text" placeholder='Account Number'value={inputAccNo}/>
                <input onChange={(e)=>setInputName(e.target.value)} type="text" placeholder='Name' value={inputName}/>
                <input onChange={(e)=>setInputAmount(e.target.value)} type="text" placeholder='Amount' value={inputAmount} disabled={editId!=null}/>
            </div>
            {
              editId? <div className='text-center p-5'><button onClick={editClick} className='btn btn-warning'>Edit</button></div> :<div className='text-center p-5'><button onClick={onAddClick} className='btn btn-warning'>Add</button></div>
            }
            <Table className='p-5' striped bordered hover>
      <thead>
        <tr>
          <th>Index</th>
          <th>Account Number</th>
          <th> Name</th>
          <th>Amount</th>
          <th>Actions</th>
          <th>Balance</th>
        </tr>
      </thead>
      <tbody>
       
       {
        inputData.length>0?<>{
           inputData.map((eachElement,index)=>(
            <tr key={index}>
          <td>{index+1}</td>
          <td>{eachElement.accNo}</td>
          <td>{eachElement.name}</td>
          <td>{eachElement.message}</td>
          <td><button onClick={()=>onEditBtnClick(eachElement)} className='btn btn-warning me-1'>Update</button><button onClick={()=>
            onDeleteClick(eachElement.id)
          }  className='btn btn-danger'>Delete</button> <button onClick={()=>creditAmount(eachElement.id,eachElement.balance,eachElement.name,eachElement.accNo)} className='btn btn-warning'>Credit</button> <button onClick={()=>debitAmount(eachElement.id,eachElement.balance, eachElement.name,eachElement.accNo)} className='btn btn-danger'>Debit</button> </td>
          <td>{Number(eachElement.balance)}</td>
        </tr>
           ))
        }</>: <h1 className='text-light'>NO DATA FOUND</h1>
       }

      </tbody>
    </Table>
        </div>

    </>
  )
}

export default Home