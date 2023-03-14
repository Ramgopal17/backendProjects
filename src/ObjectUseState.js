import React,{useState} from 'react'
import { data } from './PropDrillingExp'

function ObjectUseState() {
  
 const [allValue,setValues]=useState({firstName:"Radhe",lastName:"krisha"})
 function update(){
    setValues({...allValue,firstName:"Ram"})  
 }
  return (
    <div>
        <h1>first Name is {allValue.firstName} and Last name:{allValue.lastName}</h1>
      <button onClick={update}>update</button>
    </div>
  )
  }

export default ObjectUseState
