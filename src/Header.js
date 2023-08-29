import React from "react";
import { Divider } from "@chakra-ui/react";
import { FiBell, FiSearch, FiChevronDown } from "react-icons/fi";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import styles from "./header.module.css";

function Header() {
    return (
        <>
            <div className="flex h-full flex-row justify-between items-center py-2 px-4  shadow-md border-b w-full">
                <div className="flex">
                    <h1 className="text-gray text-4xl font-bold mr-2">
                        FataFat<span className="text-orange-500 text-3xl">.tech</span>
                    </h1>
                </div>
                <div
                    className="px-20  justify-between items-center flex"
                    id="right_wrapper"
                >
                    <div className="flex items-center space-x-2">
                        <div className="flex items-center rounded-lg p-1 pr-2 bg-gray-200 ">
                            <FiSearch />
                            <input
                                type="text"
                                placeholder="Search or type a Command"
                                className="px-2 text-md bg-transparent outline-none placeholder-gray-500 w-32 md:w-64 lg:w-96 text-md"
                            />
                        </div>
                        <FiBell />
                        <Divider orientation="vertical" width={"10px"} color={"black"} />
                        <div className="text-black cursor-pointer relative group">
                            Help{" "}
                            <span className="inline-flex">
                                <FiChevronDown />
                            </span>
                            <div className="absolute z-10 left-0 mt-1 w-48 bg-white rounded-lg shadow-lg hidden group-hover:block">
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                                    Option 1
                                </a>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                                    Option 2
                                </a>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                                    Option 3
                                </a>
                            </div>
                        </div>
                        <div className="relative  ">
                            <Avatar
                                className="block h-[40px] w-[40px] object-contain"
                                name="Dan Abrahmov"
                                src="https://img.freepik.com/free-photo/cheerful-indian-businessman-smiling-closeup-portrait-jobs-career-campaign_53876-129416.jpg?w=1060&t=st=1692946272~exp=1692946872~hmac=9741e380a267cab6b2abd3962c38cfdc2d425dbca928dc89f6f5110ad5bec3da"
                            />
                        </div>
                    </div>
                </div>
                <div className="sm:hidden flex flex-row justify-center items-center">
                    <p className="text-lg font-medium p-2 py-8">Kunal</p>
                    <Avatar
                        name="Dan Abrahmov"
                        src="https://img.freepik.com/free-photo/cheerful-indian-businessman-smiling-closeup-portrait-jobs-career-campaign_53876-129416.jpg?w=1060&t=st=1692946272~exp=1692946872~hmac=9741e380a267cab6b2abd3962c38cfdc2d425dbca928dc89f6f5110ad5bec3da"
                    />
                </div>
            </div>
        </>
    );
}

export default Header;