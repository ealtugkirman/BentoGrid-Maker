import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ColorPicker } from './color-picker';
import { SelectField } from './select-field';
import { TextStyle } from './bento-grid-maker';
import {
  TEXT_SIZE_OPTIONS,
  TEXT_WEIGHT_OPTIONS,
  TEXT_ALIGN_OPTIONS,
  TEXT_TRANSFORM_OPTIONS,
} from './text-constants';
import { Separator } from "@/components/ui/separator";

interface TextEditorProps {
  text: string;
  textColor: string;
  textStyle: TextStyle;
  onTextChange: (text: string) => void;
  onColorChange: (color: string) => void;
  onStyleChange: (style: Partial<TextStyle>) => void;
}

export const TextEditor: React.FC<TextEditorProps> = ({
  text,
  textColor,
  textStyle,
  onTextChange,
  onColorChange,
  onStyleChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-gray-200 text-sm">Text Content</Label>
        <Textarea
          value={text || ''}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder="Enter text for this grid item..."
          className="bg-gray-950 border-gray-800 text-gray-200 h-20 min-h-0"
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <SelectField
            label="Size"
            value={textStyle.size}
            onValueChange={(v) => onStyleChange({ size: v as TextStyle['size'] })}
            options={TEXT_SIZE_OPTIONS}
            small
          />
        </div>
        <div className="flex-1">
          <SelectField
            label="Weight"
            value={textStyle.weight}
            onValueChange={(v) => onStyleChange({ weight: v as TextStyle['weight'] })}
            options={TEXT_WEIGHT_OPTIONS}
            small
          />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <SelectField
            label="Align"
            value={textStyle.align}
            onValueChange={(v) => onStyleChange({ align: v as TextStyle['align'] })}
            options={TEXT_ALIGN_OPTIONS}
            small
          />
        </div>
        <div className="flex-1">
          <SelectField
            label="Transform"
            value={textStyle.transform}
            onValueChange={(v) => onStyleChange({ transform: v as TextStyle['transform'] })}
            options={TEXT_TRANSFORM_OPTIONS}
            small
          />
        </div>
      </div>

      <div className="flex gap-4 items-end">
        <div className="flex-1">
          <ColorPicker
            label="Text Color"
            color={textColor}
            onChange={onColorChange}
          />
        </div>
      </div>
    </div>
  );
}; 