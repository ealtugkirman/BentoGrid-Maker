import React from "react";
import BentoGridMaker from "@/app/_components/bentomaker/bento-grid-maker";
import { BackGround } from "@/app/_components/Background";

const page = () => {
  return (
    <div className="min-h-screen px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <BackGround />
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Bento Grid Maker</h1>
        <BentoGridMaker />
      </div>
    </div>
  );
};

export default page;
