import { useCallback, useEffect, useReducer, useRef, useState } from "react";

export interface IBankDetails{
     balance:number;
     fdballance:number;  
}
const initialBankdetails:IBankDetails = {
    balance:0,
    fdballance:5000
}
const createReducer = (oldinterface:IBankDetails, action:any) => {
 let updatedBankDetails = {...oldinterface};
 if(action.type ==="BANKACTIONS.DEPOSIT"){
     updatedBankDetails.balance = oldinterface.balance + action.payload;
 }
 if(action.type === "Bankactions.Transfer"){
     updatedBankDetails.balance = oldinterface.balance - action.payload;
 }
 return updatedBankDetails;
}
const Bank = () => {

    const transferInput = useRef<any>();
    const [amount, setAmount] = useState<any>(0);
    const [state, dispatch] = useReducer(createReducer, initialBankdetails);
    const[number, setNumber] = useState<any>(0);

    useEffect (() =>{
        setNumber((preNumber:any) => preNumber + 1)
    },[state.balance]);

    const depositMoney = useCallback ( () => {
        dispatch({
            type:"BANKACTIONS.DEPOSIT", 
            payload:Number(transferInput.current.value)
        });
        transferInput.current.value = "";
    },[])
    const transferMoney = useCallback(()=>{
        dispatch({
            type: "Bankactions.Transfer",
            payload:Number(transferInput.current.value)
        });
        transferInput.current.value = "";
    },[])
    return<>
        <input type="number" placeholder="Enter Amount" ref={transferInput}></input>
        <button onClick={depositMoney}>Deposit</button>
         <button onClick={transferMoney}>Transfer</button>
        <div>My Balance:{state.balance}</div>
        <div>Number of Transactions :{number-1}</div>
    </>
}
export default Bank;
function dispatch(arg0: {}) {
    throw new Error("Function not implemented.");
}
