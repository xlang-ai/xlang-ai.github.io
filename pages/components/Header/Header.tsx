import React, { useState } from "react";

import Image from "next/image";
import { publicFilePath } from "@/pages/utils";
import PopupCenter from "@/pages/utils/popup"; 

const Header = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-14 md:h-20 bg-inherit py-4 px-10 flex justify-between items-center z-10">
      <div className="flex gap-3 items-center">
        <Image
          src={publicFilePath("/xlang-ai.png")}
          alt="Xlang"
          width={30}
          height={30}
          className="rounded-md"
        />
        <div className="font-bold">Xlang AI</div>
      </div>

      <ul className="flex gap-3">
        <a className="btn btn-primary text-sm" href="https://forms.gle/Mcyq88JugmMYEar58">Join Us</a>
        {/* <li className="btn">Demo</li> */}
      </ul>
    </div>
  );
};

export default Header;
