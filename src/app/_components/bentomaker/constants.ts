export const ITEM_SPAN_OPTIONS = [1, 2, 3, 4] as const;

export const ASPECT_RATIO_OPTIONS = [
  { value: '1:1', label: 'Square (1:1)' },
  { value: '16:9', label: 'Widescreen (16:9)' },
  { value: '4:3', label: 'Standard (4:3)' },
  { value: '2:1', label: 'Panoramic (2:1)' },
] as const;

export const CORNER_OPTIONS = [
  { value: 'none', label: 'No Corners' },
  { value: 'sm', label: 'Subtle' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large' },
  { value: 'full', label: 'Fully Rounded' },
] as const;

export const BORDER_STYLE_OPTIONS = [
  { value: 'none', label: 'No Border' },
  { value: 'thin', label: 'Thin' },
  { value: 'medium', label: 'Medium' },
  { value: 'thick', label: 'Thick' },
] as const;

export const BORDER_COLOR_OPTIONS = [
  { value: 'gray', label: 'Gray', class: 'border-gray-700' },
  { value: 'white', label: 'White', class: 'border-white' },
  { value: 'blue', label: 'Blue', class: 'border-blue-500' },
  { value: 'green', label: 'Green', class: 'border-green-500' },
  { value: 'purple', label: 'Purple', class: 'border-purple-500' },
  { value: 'orange', label: 'Orange', class: 'border-orange-500' },
] as const;

export const BACKGROUND_COLOR_OPTIONS = [
  { value: 'gray-900', label: 'Gray', class: 'bg-gray-900' },
  { value: 'gray-800', label: 'Light Gray', class: 'bg-gray-800' },
  { value: 'blue-900', label: 'Blue', class: 'bg-blue-900' },
  { value: 'green-900', label: 'Green', class: 'bg-green-900' },
  { value: 'purple-900', label: 'Purple', class: 'bg-purple-900' },
  { value: 'orange-900', label: 'Orange', class: 'bg-orange-900' },
] as const; 