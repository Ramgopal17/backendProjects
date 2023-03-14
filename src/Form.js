import React,{useRef} from "react";

const Form=()=>{
    const refObject=useRef()

    function handleSubmit(e){
        e.preventDefault()
        console.log(refObject.current.value)

    }
return (
        <>
        <form action="" onSubmit={handleSubmit}>
<label htmlFor="">First Name</label><br />
<input type="text" ref={refObject} />
<button>Submit</button>


        </form>
        </>
    )
}

export default Form