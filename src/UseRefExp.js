import React ,{useRef, useState} from 'react'

function UseRefExp() {
    const [name,setName]=useState("Ram")
    const refElement=useRef()
    console.log(refElement)
    function reset(){
        setName("")
        refElement.current.focus()
    }
    function handleChange(){
        refElement.current.style.color="blue"
        refElement.current.value="jainy"
    }
  return (
    <div>
      <h1>learning useRef</h1>
      <input ref={refElement}type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
      <button onClick={reset}>Reset</button>
      <button onClick={handleChange}>handleInput</button>
    </div>
    
  )
}

export default UseRefExp
