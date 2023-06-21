import React from "react";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "tabler-icons-react";
import { publicFilePath } from "@/pages/utils";

interface Member {
  image: string;
  name: string;
}
const members: Member[] = [
  {
    image: publicFilePath("/test3.png"),
    name: "Euna",
  },
  {
    image: publicFilePath("/test.png"),
    name: "Ruben",
  },
  {
    image: publicFilePath("/test2.png"),
    name: "Derek",
  },
  {
    image: publicFilePath("/xlang-ai.png"),
    name: "Xlang AI",
  },
];

const Members = () => {
  return (
    <>
      <div className="p-10">
        <div className="title mb-7">Members</div>

        <div className="flex gap-x-6 gap-y-4 flex-wrap justify-center">
          {members.map((member) => {
            return (
              <div
                key={member.name}
                className="flex flex-col items-center gap-2"
              >
                <div className="relative w-20 h-20 rounded-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    style={{ objectFit: "cover", objectPosition: "center" }}
                  />
                </div>
                <a className="font-medium hover:underline cursor-pointer">
                  {member.name}
                </a>
              </div>
            );
          })}
        </div>
      </div>

      {/* Contact Us Button */}
      <div className="flex justify-center mb-10">
        <Link
          href="https://github.com/xlang-ai"
          className="group btn btn-pill btn-primary w-fit text-sm shadow-md shadow-white"
        >
          <div className="flex flex-row gap-1 justify-center items-center">
            <span>Contact Us</span>
            <ArrowRight className="w-[20px] h-[20px] -rotate-45 transition group-hover:rotate-0" />
          </div>
        </Link>
      </div>
    </>
  );
};

export default Members;
