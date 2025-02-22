import { IGridSettings } from './bento-grid-maker';

export const getAspectRatioClass = (ratio: string) => {
  const aspectRatioClasses = {
    '1:1': 'aspect-square',
    '16:9': 'aspect-video',
    '4:3': 'aspect-[4/3]',
    '2:3': 'aspect-[2/3]',
    '3:2': 'aspect-[3/2]',
    'auto': '',
  };

  return aspectRatioClasses[ratio as keyof typeof aspectRatioClasses] || '';
};

export const getGeneratedCode = (settings: IGridSettings) => {
  const { columns, rows, gap, cornerType, aspectRatio } = settings;

  const gridStyles = [
    'display: grid',
    `grid-template-columns: repeat(${columns}, minmax(0, 1fr))`,
    `grid-template-rows: repeat(${rows}, minmax(0, 1fr))`,
    `gap: ${gap * 0.25}rem`
  ].join(';');

  const cornerClass = cornerType === 'none' ? '' : `rounded-${cornerType}`;
  const aspectRatioClass = getAspectRatioClass(aspectRatio);

  const itemClasses = [
    'bg-gray-800',
    'border',
    'border-gray-700',
    cornerClass,
    aspectRatioClass,
    'transition-all',
    'duration-200',
    'hover:opacity-80'
  ].filter(Boolean).join(' ');

  const items = Array(columns * rows).fill(0).map((_, i) => 
    `  <div class="${itemClasses}">Grid Item ${i + 1}</div>`
  ).join('\n');

  return `<div style="${gridStyles}" class="min-h-[400px] p-4">\n${items}\n</div>`;
};

