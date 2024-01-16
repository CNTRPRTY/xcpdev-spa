import React from 'react';
import { Outlet, Link } from "react-router-dom";
// import logo from './logo.svg';
import './App.css';
import {Subtitle} from "@tremor/react";
import NavMenu from "./components/NavMenu";

class App extends React.Component {

  // function App() {

  render() {
    return (

      <main className="App">

        <div className={"p-4"}>

          {/* Header */}
          <div className={"flex flex-row items-center mb-24"}>
            {/* Logo section */}
            <div className={"flex flex-col flex-1"}>
              <Link to="/" className={"flex flex-row items-center"}>
                <div className={"text-black dark:text-neutral-400 text-3xl font-bold"}>xcp</div>
                <div className={"text-yellow-600 dark:text-yellow-600 text-3xl font-bold"}>.dev</div>
              </Link>
              <Subtitle className={"flex flex-row text-xs items-center font-bold"}>Counterparty Bitcoin Tools</Subtitle>
              {/* <h3>Counterparty Bitcoin data explorer</h3> */}
              {/* <h3>Counterparty Bitcoin explorer</h3> */}
              {/* <h3>Counterparty Bitcoin block explorer</h3> */}
            </div>
            {/* Navigation menu section */}
            <NavMenu />
          </div>
          <Outlet />
        </div>

      </main>

    );
  }

}

export default App;
