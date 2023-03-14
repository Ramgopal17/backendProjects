import React,{useState,useCallback} from 'react'
import ChildA from './ChildA'

function useCallbackExp() {
    const [add,setAdd]=useState(0)
    const [count,setCount]=useState(0)
    // function Learning(){
    //     // some operation 
    // }
    const Learning=useCallback(()=>{

    },[add])
  return (
    <div>
        <ChildA Learning={Learning}/>
      <h1>learning useCallBack</h1>
      <h1>{add}</h1>
      <button onClick={()=>setAdd(add+1)}>Addition</button>
      {/* when we are clicking on addition button "child component " is getting rerender 
      it should only render when first time render  it should not happen it will decrease performance of app*/}
<h1>{count}</h1>
<button onClick={()=>setCount(count+1)}> count</button>
    </div>
  )
}

export default useCallbackExp
