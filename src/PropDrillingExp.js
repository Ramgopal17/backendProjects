import React, { createContext } from 'react'
import ChildA from './ChildA'
let data=createContext()
let data1=createContext()
// -------------------- related to prop driling-------------


// function PropDrillingExp() {
//  let name="Ram"
//   return (
// <>
//        <ChildA name={name}/>
// </>
//   )
// }

// --------------related to  context  api
// function PropDrillingExp() {
//     let name="Ram"
//      return (
//    <>
//          <data.Provider value ={name}>
//          <ChildA />

//          </data.Provider>
//    </>
//      )
//    }


//--------------- related to useContext hooks-----------------


function PropDrillingExp() {
 let name="Ram"
 let gender="male"
  return (
<>
<data.Provider value={name}>
    <data1.Provider value={gender}>
       <ChildA />
       </data1.Provider>
      </data.Provider>
</>
  )
}
export default PropDrillingExp
export {data,data1}