"use client";
import BentoGridMaker from "@/app/_components/bentomaker/bento-grid-maker";
import { BackGround } from "@/app/_components/Background";
import { LineShadowText } from "@/components/magicui/line-shadow-text";
import { useTheme } from "next-themes";

const page = () => {
  const theme = useTheme();
  const shadowColor = theme.resolvedTheme === "white" ? "white" : "white";
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <BackGround />
      <div className="py-4">
        <h1 className="text-balance text-center text-white text-4xl font-semibold leading-none tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Bento Grid {" "}
          <LineShadowText className="" shadowColor={shadowColor}>
            Maker 
          </LineShadowText>
        </h1>
      </div>
      <div className="flex-1 overflow-hidden">
        <BentoGridMaker />
      </div>
    </div>
  );
};

export default page;
