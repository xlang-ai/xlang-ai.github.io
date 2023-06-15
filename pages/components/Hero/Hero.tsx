"use client";

import React from "react";
import { textLinearGradientClassName } from "@/pages/styles/styles";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "tabler-icons-react";
import { TypeAnimation } from "react-type-animation";
import PopupCenter from "@/pages/utils/popup";
import { useSession } from "next-auth/react";

const Hero = () => {
  const { data: session, status } = useSession();

  return (
    <div className="h-screen w-screen relative p-10 pt-14 md:pt-20 flex flex-col justify-center items-center">
      <div className="relative flex flex-col h-full justify-center items-center">
        <div className="text-center md:full">
          <h1 className={`text-3xl font-light leading-tight sm:text-4xl xl:text-5xl xl:text-[60px]`}>
            <div className={`hero-height`}>Connect Your Data with 🔗</div>
            <div className={`${textLinearGradientClassName} hero-height`}>Next-Level Language Interfaces</div>
          </h1>
        </div>
        <div className="text-center text-white mb-10 text-base leading-normal md:w-11/12 top-margin">
          <TypeAnimation
            sequence={[
              "We are building the most powerful framework for building natural language interface in all-procedure data science scenario", // Types 'One'
              1000, // wait 1s
            ]}
            wrapper="span"
            speed={75}
            deletionSpeed={80}
            cursor={true}
            repeat={Infinity}
          />
        </div>

        {/* Join Waitlist Button */}
        <div className="group btn btn-pill btn-primary w-fit text-sm shadow-md shadow-white">
          <div className="flex flex-row gap-1 justify-center items-center">
            {session ? (
              <span>{session.user.name}, You're already in the Waitlist</span>
            ) : (
              <span onClick={() => PopupCenter("/google-signin", "Waitlist Login")}>Join Waitlist</span>
            )}
            <ArrowRight className="w-[20px] h-[20px] -rotate-45 transition group-hover:rotate-0" />
          </div>
        </div>

        {/* Down Arrow */}
        <div className="absolute bottom-0 left-auto flex justify-center items-center">
          <ArrowDown
            className="w-[36px] h-[36px] cursor-pointer"
            style={{ animation: "arrowAnimation 2s infinite" }}
            onClick={() => {
              window.scrollTo({
                top: window.innerHeight,
                behavior: "smooth",
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
