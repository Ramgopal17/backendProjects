import {React} from "react";
import ChildB from "./ChildB";
import { memo } from "react";

// function ChildA({name}){

//     return (
//         <>
//         <ChildB name={name}/>
//         </>
//     )

// }
// --------------related to  context  api---------------------
// function ChildA(){

//     return (
//         <>
//         <ChildB/>
//         </>
//     )

// }


//--------------- related to useContext hooks-----------------
// function ChildA(){

//     return (
//         <>
//         <ChildB/>
//         </>
//     )

// }

// -------------- related to useCallback------------------


function ChildA(){
console.log("child Component")
    return (
        <>
     
        </>
    )

}
export default memo(ChildA)