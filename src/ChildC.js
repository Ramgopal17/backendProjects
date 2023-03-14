import React, { useContext } from "react";
import {data,data1} from "./PropDrillingExp"
// -------------------- related to prop driling-------------

// function ChildC({name}){
//     return (
//         <>
//      <h1>Componet c displaying {name}</h1>
//         </>
//     )

// }


// --------------related to  context  api
// function ChildC(){
//     return (
//         <>
//    <data.Consumer>
//     { (name)=>{
//         return (
//           <h1>my name is {name}</h1>
//         )
//     }
// }
//    </data.Consumer>
//         </>
//     )

// }


//--------------- related to useContext hooks-----------------


function ChildC(){
   const name =useContext(data)
   const gender=useContext(data1)
    return (
  <>
        <h1>hello my name is {name} and gender   is  {gender}</h1>
  </>
    )

}



export default ChildC