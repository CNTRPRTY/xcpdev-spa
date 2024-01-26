import React from 'react';
import { Outlet, Link } from "react-router-dom";
// import logo from './logo.svg';
import './App.css';
import {Subtitle} from "@tremor/react";
import NavMenu from "./components/NavMenu";
import Logo from "./components/Logo";

class App extends React.Component {

  // function App() {

    render() {
        return (
            <main className="App">
                <div className={"p-4"}>

                    {/* Header */}
                    <div className={"flex flex-row items-center mb-24"}>
                        {/* Logo section */}
                        <Logo/>
                        {/* Navigation menu section */}
                        <NavMenu/>
                    </div>

                    <Outlet/>
                </div>
            </main>
        );
    }
}

export default App;
