import React, { FC } from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SelectFieldProps {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  options: readonly { value: string; label: string; }[];
  small?: boolean;
}

export const SelectField: FC<SelectFieldProps> = ({ 
  label, 
  value, 
  onValueChange, 
  options, 
  small 
}) => (
  <div className={`space-y-2 ${small ? 'text-sm' : ''}`}>
    <Label className="text-gray-200">{label}</Label>
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={`bg-gray-950 border-gray-800 text-white ${small ? 'h-8 text-sm' : ''}`}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-gray-950 border-gray-800">
        {options.map(({ value, label }) => (
          <SelectItem 
            key={value} 
            value={value} 
            className="text-white hover:bg-gray-800 focus:bg-gray-800"
          >
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
); 