import React,{useState} from 'react'

function Child(props) {
    const[name,setName]=useState("Ram")
    function handleSubmit(e){
        e.preventDefault()
        props.getData(name)

    }
  return (
    <div>
        <form action="" onSubmit={handleSubmit}>
      <input type="text"  value={name} onChange={(e)=>setName(e.target.value)}/>
     <button>Submit</button>
      </form>
    </div>
  )
}

export default Child
