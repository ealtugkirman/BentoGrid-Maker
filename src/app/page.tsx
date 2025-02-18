"use client";
import BentoGridMaker from "@/app/_components/bentomaker/bento-grid-maker";
import { BackGround } from "@/app/_components/Background";
import { LineShadowText } from "@/components/magicui/line-shadow-text";
import { useTheme } from "next-themes";

const page = () => {
  const theme = useTheme();
  const shadowColor = theme.resolvedTheme === "white" ? "white" : "white";
  return (
    <div className="min-h-screen bg-black px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <BackGround />
        <h1 className="text-balance py-6 text-center text-white text-5xl font-semibold leading-none tracking-tighter sm:text-6xl">
          Bento Grid {" "}
          <LineShadowText className="" shadowColor={shadowColor}>
             Maker 
          </LineShadowText>
        </h1>
        <BentoGridMaker />
      </div>
    </div>
  );
};

export default page;
