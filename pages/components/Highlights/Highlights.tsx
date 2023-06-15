import React from "react";

import TextWithImage from "../TextWithImage";
import { publicFilePath } from "@/pages/utils";

const Highlights = () => {
  return (
    <div className="px-10">
      <div className="title mb-10">Highlights</div>

      <div className="flex flex-col gap-20 mt-5">
        <TextWithImage
          image={publicFilePath("/hero.jpg")}
          title="Text to Analytics"
          content="A powerful tool that transforms textual data into meaningful insights,
          enabling efficient analysis and decision-making processes."
          button={
            <button className="btn btn-secondary text-sm w-fit">
              Join the waitlist
            </button>
          }
        />
        
        <TextWithImage
          image={publicFilePath("/xlang-ai.png")}
          title="Your best AI assistant"
          content="Unleash the power of your digital companion - Xlang AI, guiding you effortlessly through every task, anticipating your needs with unrivaled intelligence and finesse."
          reverse
          button={
            <button className="btn btn-secondary text-sm w-fit">
              Join the waitlist
            </button>
          }
        />
      </div>
    </div>
  );
};

export default Highlights;
