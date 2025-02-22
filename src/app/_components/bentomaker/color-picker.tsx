import React, { useState, useCallback } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

const PRESET_COLORS = [
  { value: '#1F2937', label: 'Gray 900' },
  { value: '#1E40AF', label: 'Blue 900' },
  { value: '#064E3B', label: 'Green 900' },
  { value: '#581C87', label: 'Purple 900' },
  { value: '#7C2D12', label: 'Orange 900' },
  { value: '#000000', label: 'Black' },
  { value: '#18181B', label: 'Zinc 900' },
  { value: '#0F172A', label: 'Slate 900' },
  { value: '#312E81', label: 'Indigo 900' },
  { value: '#831843', label: 'Pink 900' },
  { value: '#881337', label: 'Rose 900' },
  { value: '#14532D', label: 'Green 900' },
];

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  label?: string;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  color,
  onChange,
  label = "Color"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(color);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    // Validate if it's a valid hex color
    if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value)) {
      onChange(value);
    }
  }, [onChange]);

  return (
    <div className="space-y-2">
      {label && <Label className="text-gray-200 text-sm">{label}</Label>}
      <div className="flex gap-2">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <button
              className={cn(
                "w-12 h-8 rounded border border-gray-700",
                "transition-all duration-200"
              )}
              style={{ backgroundColor: color }}
            />
          </PopoverTrigger>
          <PopoverContent className="w-64 p-3 bg-gray-900 border-gray-800">
            <div className="space-y-3">
              <HexColorPicker 
                color={color} 
                onChange={onChange}
                className="w-full"
              />
              <div className="grid grid-cols-6 gap-1 mt-2">
                {PRESET_COLORS.map((preset) => (
                  <button
                    key={preset.value}
                    className={cn(
                      "w-8 h-8 rounded border border-gray-700",
                      "transition-all duration-200",
                      "hover:scale-110",
                      color === preset.value && "ring-2 ring-white"
                    )}
                    style={{ backgroundColor: preset.value }}
                    onClick={() => {
                      onChange(preset.value);
                      setInputValue(preset.value);
                    }}
                    title={preset.label}
                  />
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <Input
          value={inputValue}
          onChange={handleInputChange}
          placeholder="#000000"
          className="w-28 bg-gray-950 border-gray-800 text-gray-200"
        />
      </div>
    </div>
  );
}; 