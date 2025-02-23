"use client";
import BentoGridMaker from "@/app/_components/bentomaker/bento-grid-maker";
import { BackGround } from "@/app/_components/Background";
import { LineShadowText } from "@/components/magicui/line-shadow-text";
import { useTheme } from "next-themes";
import { Badge } from "@/components/ui/badge";
const page = () => {
  const theme = useTheme();
  const shadowColor = theme.resolvedTheme === "white" ? "white" : "white";
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <BackGround />
        <div className="flex flex-row items-center  pt-4 justify-center mx-auto gap-2 md:flex">
          <Badge
            variant="secondary"
            className="animate-pulse text-lg bg-emerald-500/10 text-emerald-400">
            🎉 We're live on Product Hunt!
          </Badge>
          <a
            href="https://www.producthunt.com/posts/bento-grid-maker"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-90">
            <img
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=888981&theme=dark"
              alt="Bento Grid Maker on Product Hunt"
              className="h-[60px] w-[300px]"
              width="300"
              height="60"
            />
          </a>
        </div>
      <div className="py-4">
        <h1 className="text-balance text-center text-white text-4xl font-semibold leading-none tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Bento Grid{" "}
          <LineShadowText className="" shadowColor={shadowColor}>
            Maker
          </LineShadowText>
        </h1>
      </div>
      {/* <div className="flex flex-row items-center justify-center mx-auto gap-2 md:flex">
        <Badge
          variant="secondary"
          className="animate-pulse text-lg bg-emerald-500/10 text-emerald-400">
          🎉 We're live on Product Hunt!
        </Badge>
        <a
          href="https://www.producthunt.com/posts/bento-grid-maker"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-opacity hover:opacity-90">
          <img
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=888981&theme=dark"
            alt="Bento Grid Maker on Product Hunt"
            className="h-[60px] w-[300px]"
            width="300"
            height="60"
          />
        </a>
      </div> */}
      <div className="flex-1 overflow-hidden">
        <BentoGridMaker />
      </div>
    </div>
  );
};

export default page;
