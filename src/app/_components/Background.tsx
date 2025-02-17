"use client";

import React, { useEffect, useRef } from "react";

const GRID_LINES_COUNT = 10;

export function BackGround() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Create grid lines
    const createGridLines = () => {
      for (let i = 0; i <= GRID_LINES_COUNT; i++) {
        const horizontalLine = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line"
        );
        const verticalLine = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line"
        );
        const position = (i / GRID_LINES_COUNT) * 100 + "%";

        horizontalLine.setAttribute("x1", "0");
        horizontalLine.setAttribute("y1", position);
        horizontalLine.setAttribute("x2", "100%");
        horizontalLine.setAttribute("y2", position);
        horizontalLine.setAttribute("stroke", "#082f49");
        horizontalLine.setAttribute("stroke-width", "0.5");

        verticalLine.setAttribute("x1", position);
        verticalLine.setAttribute("y1", "0");
        verticalLine.setAttribute("x2", position);
        verticalLine.setAttribute("y2", "100%");
        verticalLine.setAttribute("stroke", "#082f49");
        verticalLine.setAttribute("stroke-width", "0.5");

        svg.appendChild(horizontalLine);
        svg.appendChild(verticalLine);
      }
    };

    // Resize handler
    const handleResize = () => {
      svg.setAttribute("width", window.innerWidth.toString());
      svg.setAttribute("height", window.innerHeight.toString());
    };

    createGridLines();
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className="fixed  top-0 left-0 w-screen h-full -z-10"
      style={{ backgroundColor: "#000000" }}
    />
  );
}
