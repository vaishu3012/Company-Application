import React from "react";
import './App.css';
import Companies from './Components/Companies/Companies';
import Clients from "./Components/Clients/Client";
import Users from "./Components/User/User";

function App(){
 return(
  <div className="App">
    <Users/>
    <Clients/>
    <Companies/>
  </div>
 )
}
export default App;