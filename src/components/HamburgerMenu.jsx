import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {HiMenuAlt2} from "react-icons/hi";
import ThemeSwitcher from "./ThemeSwitcher";
import Logo from "./Logo";
import {Subtitle} from "@tremor/react";
import {Link} from "react-router-dom";

function HamburgerMenu({props}) {

    let [isOpen, setIsOpen] = useState(false)

    return (
        <div className="flex lg:hidden items-center justify-center bg-transparent">
            <div>
                <HiMenuAlt2 className={"block sm:hidden w-6 h-6 text-yellow-600 hover:text-yellow-700 ring-0 focus:outline-none"} onClick={() => setIsOpen(true)}/>

                <Transition.Root show={isOpen} as={Fragment}>
                    <Dialog as="div" className="fixed z-50 inset-0 overflow-y-auto" onClose={setIsOpen}>
                        <div className="flex items-start justify-center text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                            </Transition.Child>

                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >

                                {/* This is the modal itself */}
                                <div className="inline-block align-top bg-gray-100 dark:bg-slate-900 rounded-lg text-left shadow-xl transform transition-all w-screen m-2">

                                    <button
                                        type="button"
                                        className="absolute top-0 right-0 p-1 m-3 transition-colors duration-200 transform rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none"
                                        onClick={()=> setIsOpen(false)}
                                        aria-label="Close modal"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor" aria-hidden="true"
                                             className="w-6 h-6 text-gray-500 dark:text-gray-300">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M6 18L18 6M6 6l12 12"/>
                                        </svg>
                                    </button>

                                    <Dialog.Title className="ml-2 px-2 py-3">
                                        <Logo/>
                                    </Dialog.Title>

                                    {/* Modal content */}
                                    <div className="px-4 py-3">
                                        {/* TODO - add menu links here */}
                                        <div className={"py-2"}>
                                            <Subtitle className={"flex flex-row items-center space-x-2"}>
                                                <div>Theme</div>
                                                <ThemeSwitcher/>
                                            </Subtitle>
                                        </div>

                                        <div className={"py-2"}>
                                            <ul>
                                                <li>
                                                    <Link to="/" className={"text-yellow-600 text-sm font-bold hover:text-yellow-700"}>DATA</Link>
                                                </li>
                                                <li>
                                                    <Link to="/wallet" className={"text-yellow-600 text-sm font-bold hover:text-yellow-700"}>WALLET</Link>
                                                </li>
                                                <li>
                                                    <Link to="/messages" className={"text-yellow-600 text-sm font-bold hover:text-yellow-700"}>MESSAGES</Link>
                                                </li>
                                                <li>
                                                    <Link to="/transactions" className={"text-yellow-600 text-sm font-bold hover:text-yellow-700"}>TRANSACTIONS</Link>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className={"flex flex-row items-start py-4 "}>
                                            {/*<ConnectButton />*/}
                                        </div>

                                        {/*<SearchComponent/>*/}
                                    </div>
                                    {/* end Modal content */}

                                </div>

                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>
            </div>
        </div>
    )
}

export default HamburgerMenu;