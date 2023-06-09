"use client";

import React from "react";
import Image from "next/image";
import "./hero.css";
import { textLinearGradientClassName } from "@/app/styles/styles";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "tabler-icons-react";
import { TypeAnimation } from "react-type-animation";
import { publicFilePath } from "@/app/utils";

const Hero = () => {
  return (
    <div className="h-screen w-screen relative p-10 pt-14 md:pt-20 flex flex-col justify-center items-center">
      {/* Image */}
      <div className="-z-1 opacity-70">
        <Image
          src={publicFilePath("/hero.jpg")}
          alt="hero image"
          fill={true}
          style={{
            objectFit: "cover",
            objectPosition: "center",
            animation: "hero-pulsing-animation 3s ease-in-out infinite",
          }}
        />
      </div>
      <div className="relative flex flex-col h-full justify-center items-center">
        <div>
          <Image
            src={publicFilePath("/xlang-ai.png")}
            alt="Xlang"
            width={100}
            height={100}
            className="rounded-md"
          />
        </div>
        <div className="mb-3">
          <div
            className={`text-[64px] font-bold cursor-pointer hover:tracking-wider transition-all duration-100 ${textLinearGradientClassName}`}
          >
            <Link href="/">Xlang AI</Link>
          </div>
        </div>
        <div className="text-center text-white text-[24px] max-w-xl mb-8 leading-7 tracking-wide">
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
        <Link
          href="https://github.com/xlang-ai"
          className="group btn btn-pill btn-primary w-fit text-sm shadow-md shadow-white"
        >
          <div className="flex flex-row gap-1 justify-center items-center">
            <span>Join Waitlist</span>
            <ArrowRight className="w-[20px] h-[20px] -rotate-45 transition group-hover:rotate-0" />
          </div>
        </Link>

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
