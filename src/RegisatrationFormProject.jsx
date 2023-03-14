import React,{useState,useEffect} from 'react'
import "./index"
function RegisatrationFormProject() {
  const  data={name:"",email:"",password:""}
    const [inputData,setInputData]=useState(data)
    const [flag,setFlag]=useState(false)
    useEffect(()=>{
        console.log("registered ")
    })
    function handleData(e){
        setInputData({...inputData,[e.target.name]:e.target.value})
        console.log(inputData)

    }
    function handleSubmit(e){
        e.preventDefault()
        if(!inputData.name||!inputData.email||!inputData.password){
            alert("all feild are mandatoty")
        }else{
            setFlag(true)

        }
    }

  return (
    <>
    <pre>{(flag)?<h2>Hello {inputData.name},you have registered succesfully </h2>:""}</pre>
    <form action="" onSubmit={handleSubmit}>
    <div>
  <h1>  Registration form</h1>
      <input type="text" name="name" value={inputData.name} placeholder="enter your name" onChange={handleData}/> <br />
      <input type="email" name="email" value={inputData.email} placeholder="enter your email" onChange={handleData}/> <br />
      <input type="password" name="password"value={inputData.password} placeholder="enter your password" onChange={handleData}/> <br />
      <button type="submit" > submit</button>

    </div>
    </form>
    </>
  )
}

export default RegisatrationFormProject
