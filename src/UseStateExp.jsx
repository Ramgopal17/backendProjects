import { useState,useEffect } from "react";

function UseStateExp(){

    const [count,setCount]=useState(0)
    const [data,setData]=useState("Ram")
    useEffect(()=>{
        console.log("component mounted")
    },[count])
    
    function updateCount(){
        setCount(count+1)
    }
    function updateData(){
        setData("Seeta")
    }
return (
        <>
        <h1>button clicked +{count}  times</h1>
        <button onClick={updateCount}>click me</button>
        <h1>{data}</h1>
        <button onClick={updateData}>update data</button>
    </>
    )
}
export default UseStateExp

