import React, { FC } from 'react';
import { IGridSettings } from './bento-grid-maker';
import { getAspectRatioClass } from './utils';

interface IGridPreviewProps {
  gridSettings: IGridSettings;
}

export const GridPreview: FC<IGridPreviewProps> = ({ gridSettings }) => {
  const { columns, rows, gap, cornerType, useImages, aspectRatio } = gridSettings;

  // Create explicit grid-template-columns and grid-template-rows
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
    gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
    gap: `${gap * 0.25}rem`, // Convert gap to rem units
  };

  const cornerClass = cornerType === 'none' ? '' : `rounded-${cornerType}`;
  const aspectRatioClass = getAspectRatioClass(aspectRatio);

  const placeholderURL = (index: number) => 
    `https://source.unsplash.com/random/800x600?sig=${index}`;

  return (
    <div 
      style={gridStyle} 
      className="min-h-[400px] bg-gray-900 rounded-lg p-4"
    >
      {[...Array(columns * rows)].map((_, index) => (
        <div
          key={index}
          className={`
            bg-gray-800 border border-gray-700
            flex items-center justify-center p-4 
            ${cornerClass} ${aspectRatioClass}
            transition-all duration-200 hover:opacity-80
          `}
        >
          {useImages ? (
            <img
              src={placeholderURL(index)}
              alt={`Grid item ${index + 1}`}
              className={`w-full h-full object-cover ${cornerClass}`}
              loading="lazy"
            />
          ) : (
            <span className="text-sm text-gray-400">
              Grid Item {index + 1}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

