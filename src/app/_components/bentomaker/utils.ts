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
  const { columns, rows, gap, items } = settings;

  const gridStyles = [
    'display: grid',
    `grid-template-columns: repeat(${columns}, minmax(0, 1fr))`,
    `grid-template-rows: repeat(${rows}, 1fr)`,
    `gap: ${gap * 0.25}rem`,
    'width: 100%',
    'min-height: 400px',
  ].join(';');

  const itemsCode = (items || []).map((item, i) => {
    const classes = [
      // Grid classes
      `col-span-${item.colSpan || 1}`,
      `row-span-${item.rowSpan || 1}`,
      
      // Border classes
      item.borderStyle !== 'none' && {
        'thin': 'border',
        'medium': 'border-2',
        'thick': 'border-4',
      }[item.borderStyle],
      
      // Corner classes
      item.cornerType !== 'none' && `rounded-${item.cornerType}`,
      
      // Aspect ratio
      getAspectRatioClass(item.aspectRatio),
      
      // Text classes
      item.textStyle?.size && `text-${item.textStyle.size}`,
      item.textStyle?.weight && `font-${item.textStyle.weight}`,
      item.textStyle?.align && `text-${item.textStyle.align}`,
      item.textStyle?.transform !== 'none' && item.textStyle.transform,
      
      // Utility classes
      'relative',
      'transition-all',
      'duration-200',
      'hover:opacity-80',
    ].filter(Boolean).join(' ');

    const styles = [
      item.backgroundColor && `background-color: ${item.backgroundColor}`,
      item.borderStyle !== 'none' && item.borderColor && `border-color: ${item.borderColor}`,
    ].filter(Boolean).join(';');

    const textContent = item.text 
      ? `\n        <span class="whitespace-pre-wrap" style="color: ${item.textColor}">${item.text}</span>\n      `
      : '';

    return `  <div class="${classes}"${styles ? ` style="${styles}"` : ''}>
    <div class="flex items-center justify-center h-full p-4">${textContent}</div>
  </div>`;
  }).join('\n');

  return `<div style="${gridStyles}" class="bg-gray-950 rounded-lg p-4">\n${itemsCode}\n</div>`;
};

