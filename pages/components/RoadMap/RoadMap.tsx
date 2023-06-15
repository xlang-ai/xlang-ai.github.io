import React from "react";

import { ArrowRight, Check } from "tabler-icons-react";
import Link from "next/link";

const RoadMap = () => {
  return (
    <div className="p-6">
      <div className="title">RoadMap</div>
      <div className="mt-9">
        <div className="flex flex-col gap-1 w-1/3 m-auto border border-2 border-gray-300 dark:border-gray-400 rounded opacity-40">
          <h2 className="text-center bg-gray-300 dark:bg-gray-600 font-medium text-sm py-1">
            June 2023
          </h2>
          <div className="flex flex-col gap-1 w-full p-2">
            <RoadMapItem completed text="Python executor" />
            <RoadMapItem completed text="Public release" />
          </div>
        </div>

        <RoadMapLine completed />

        <div className="flex flex-col gap-1 w-1/3 m-auto border border-2 border-emerald-300 dark:border-emerald-400 rounded">
          <h2 className="text-center bg-emerald-300 dark:bg-emerald-600 font-medium text-sm py-1">
            July 2023
          </h2>
          <div className="flex flex-col gap-1 w-full p-2">
            <RoadMapItem text="Public release" />
            <RoadMapItem text="MongoDB connector" />
          </div>
        </div>

        <RoadMapLine />

        <div className="flex flex-col gap-1 w-1/3 m-auto border border-2 border-emerald-300 dark:border-emerald-400 rounded">
          <h2 className="text-center bg-emerald-300 dark:bg-emerald-600 font-medium text-sm py-1">
            August 2023
          </h2>
          <div className="flex flex-col gap-1 w-full p-2">
            <RoadMapItem text="Public release" />
            <RoadMapItem text="MongoDB connector" />
          </div>
        </div>
      </div>

      {/* Subsribe to News Button */}
      <div className="flex justify-center mt-10">
        <div className="group btn btn-pill btn-primary w-fit text-sm shadow-md shadow-white">
          <div className="flex flex-row gap-1 justify-center items-center">
            <span>Subscribe ours News</span>
            <ArrowRight className="w-[20px] h-[20px] -rotate-45 transition group-hover:rotate-0" />
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckBox = ({ ticked }: { ticked?: boolean }) => (
  <div className="border border-gray-700 dark:border-gray-300 border-2 w-4 h-4 flex items-center justify-center rounded-sm text-gray-800 dark:text-gray-200">
    {ticked && <Check size={20} />}
  </div>
);

const RoadMapItem = ({
  completed,
  text,
}: {
  completed?: boolean;
  text: string;
}) => (
  <div className="flex gap-2 items-center text-sm">
    <CheckBox ticked={completed} />
    <div className="text-gray-800 dark:text-gray-300 text-xs">{text}</div>
  </div>
);

const RoadMapLine = ({ completed }: { completed?: boolean }) => (
  <div
    className={`w-0.5 h-10 m-auto ${
      completed ? "bg-gray-400/40" : "bg-emerald-400"
    }`}
  />
);

export default RoadMap;
