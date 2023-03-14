import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Form from './Form';
import PropsExp from './PropsExp';
import UseStateExp from './UseStateExp';
import UseRefExp from './UseRefExp';
import PropDrillingExp from './PropDrillingExp';
import UseMemoEXp from './UseMemoEXp';
import UseCallbackExp from './UseCallbackExp';
import LiftingUpStateExp from "./LiftingUpStateExp"
import List from "./List"
import RegisatrationFormProject from './RegisatrationFormProject';
import ObjectUseState from './ObjectUseState';
import ArrayUseState from './ArrayUseState';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <PropsExp name="ram"/>
    <PropsExp name="shyam"/>
    <PropsExp name="praveen"/>
    <UseStateExp/> */}
    {/* <Form/> */}
    {/* <UseRefExp/> */}
    {/* <PropDrillingExp/> */}
    {/* <UseMemoEXp/> */}
   {/* < UseCallbackExp/> */}
   {/* <LiftingUpStateExp/> */}
   {/* <List/> */}
   <RegisatrationFormProject/>
   {/* <ObjectUseState/>
   <ArrayUseState/> */}
  </React.StrictMode>
);

