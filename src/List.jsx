import React from 'react'

function List() {
    // if there is duplicate value in that case we will use index
    const IPL=["CSK","MI","RCB","CSK"] 
 let a= IPL.map((x,index)=><h1 key={index}>{x} index {index}</h1>)

  return (
    <div>
      {a}
    </div>
  )
}

export default List
