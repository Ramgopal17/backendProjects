import React from "react";
import ChildC from "./ChildC";
// -------------------- related to prop driling-------------
// function ChildB({name}){
//     return (
//         <>
// <ChildC name={name}/>
// <ChildC/>
//         </>
//     )

// }
// --------------related to  context  api
// function ChildB(){
//     return (
//         <>
//          <ChildC/>
//         </>
//     )
// }


//--------------- related to useContext hooks-----------------
function ChildB(){
    return (
        <>
         <ChildC/>
        </>
    )
}
export default ChildB