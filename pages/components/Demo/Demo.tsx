import React from "react";
import Link from "next/link";
import { ArrowRight } from "tabler-icons-react";
import { publicFilePath } from "@/pages/utils";

const Demo = () => {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-10">
      <h2 className="title">Demo Video</h2>
      <div className="w-full max-w-[80%]">
        {/* Demo Video */}
        <div className="w-full h-auto mt-8">
          <video className="w-full h-full" controls>
            <source
              src={publicFilePath("/xlang-chat-demo.mp4")}
              type="video/mp4"
            />
          </video>
        </div>

        {/* Live Demo Button */}
        <div className="flex justify-end mt-6">
          <Link
            href="https://chat.xlang.ai/"
            className="group btn btn-pill btn-primary w-fit text-sm shadow-md shadow-white"
          >
            <div className="flex flex-row gap-1 justify-center items-center">
              <span>Live Demo</span>
              <ArrowRight className="w-[20px] h-[20px] -rotate-45 transition group-hover:rotate-0" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Demo;
