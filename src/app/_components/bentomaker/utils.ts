import { IGridSettings } from './bento-grid-maker';

export const getAspectRatioClass = (ratio: string) => {
  switch (ratio) {
    case '16:9': return 'aspect-video';
    case '4:3': return 'aspect-4/3';
    case '3:2': return 'aspect-3/2';
    case '2:1': return 'aspect-2/1';
    default: return 'aspect-square';
  }
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

