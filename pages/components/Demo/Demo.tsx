import React from "react";
import Link from "next/link";
import { ArrowRight } from "tabler-icons-react";
import { publicFilePath } from "@/utils";

const Demo = () => {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-10">
      <h2 className="title">Demo Video</h2>
      <div className="w-full max-w-[80%]">
        {/* Demo Video */}
        <div className="w-full h-auto mt-8">
          <video className="w-full h-full" controls>
            <source
              src={publicFilePath("/xlang-chat-demo-v2.mp4")}
              type="video/mp4"
            />
          </video>
        </div>
      </div>
    </div>
  );
};

export default Demo;
