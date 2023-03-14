import React, { useState ,useMemo} from 'react'

function UseMemoEXp() {
    const [add,setAdd]=useState(0)
    const [minus,setMinus]=useState(100)
    function addition(){
        setAdd(add+1)
    }
    function subtract(){
        setMinus(minus-1)
    }
    // function multiply(){
    //     console.log("********************")
    //    return add*10
    // }
    const multiplication=useMemo(function multiply(){
        console.log("********************")
       return add*10
    },[add])
  return (
    <div>
      <h1>learning useMemo</h1>
      {multiplication} <br />
      <button onClick={addition}>plus</button>
      <span>{add}</span><br />
      <button onClick={subtract}>subtract </button>
      <span>{minus}</span><br />
    
    </div>
  )
}

export default UseMemoEXp
