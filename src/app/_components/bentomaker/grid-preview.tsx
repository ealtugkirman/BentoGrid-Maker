import React, { FC, useState } from 'react';
import { IGridSettings, CornerType, BorderStyle, BorderColor } from './bento-grid-maker';
import { getAspectRatioClass } from './utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SelectField } from './select-field';
import { ASPECT_RATIO_OPTIONS, BORDER_STYLE_OPTIONS, CORNER_OPTIONS, ITEM_SPAN_OPTIONS } from './constants';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { BORDER_COLOR_OPTIONS } from './constants';
import { Label } from '@/components/ui/label';
import { BACKGROUND_COLOR_OPTIONS } from './constants';
import { ColorPicker } from './color-picker';
import { TextEditor } from './text-editor';
import { DEFAULT_TEXT_STYLE } from './text-constants';
import { Separator } from "@/components/ui/separator";

interface IGridPreviewProps {
  gridSettings: IGridSettings;
  onItemUpdate: (index: number, updates: Partial<{
    rowSpan: number;
    colSpan: number;
    aspectRatio: string;
    cornerType: CornerType;
    borderStyle: BorderStyle;
    borderColor: BorderColor;
    backgroundColor: string;
    text: string;
    textColor: string;
    textStyle: TextStyle;
  }>) => void;
}

export const GridPreview: FC<IGridPreviewProps> = ({ gridSettings, onItemUpdate }) => {
  const { columns, rows, gap, cornerType, useImages, aspectRatio, items, itemCount } = gridSettings;
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);

  const handleItemUpdate = (index: number, updates: Partial<{
    rowSpan: number;
    colSpan: number;
    aspectRatio: string;
    cornerType: CornerType;
    borderStyle: BorderStyle;
    borderColor: BorderColor;
    backgroundColor: string;
    text: string;
    textColor: string;
    textStyle: TextStyle;
  }>) => {
    // Validate the requested spans don't exceed grid dimensions
    const requestedRowSpan = Math.min(updates.rowSpan || 1, rows);
    const requestedColSpan = Math.min(updates.colSpan || 1, columns);
    
    onItemUpdate(index, {
      ...updates,
      rowSpan: requestedRowSpan,
      colSpan: requestedColSpan,
    });
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
    gridTemplateRows: `repeat(${rows}, 1fr)`,
    gap: `${gap * 0.25}rem`,
    height: '100%',
    width: '100%',
  };

  const handleItemClick = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedItemIndex(index);
  };

  const handleDialogClose = () => {
    setSelectedItemIndex(null);
  };

  const getBorderClass = (borderStyle: BorderStyle, borderColor: BorderColor) => {
    if (borderStyle === 'none') return '';
    
    const borderWidth = {
      thin: 'border',
      medium: 'border-2',
      thick: 'border-4',
    }[borderStyle];

    const colorClass = BORDER_COLOR_OPTIONS.find(opt => opt.value === borderColor)?.class || 'border-gray-700';
    
    return `${borderWidth} ${colorClass}`;
  };

  return (
    <>
      <div 
        style={gridStyle} 
        className="w-full h-full bg-gray-950 rounded-lg"
      >
        {Array.from({ length: itemCount }).map((_, index) => {
          // Get existing item or create base settings
          const baseSettings = {
            id: `item-${index + 1}`,
            rowSpan: 1,
            colSpan: 1,
            aspectRatio: aspectRatio,
            cornerType: cornerType,
            borderStyle: gridSettings.borderStyle,
            borderColor: gridSettings.borderColor,
            backgroundColor: gridSettings.backgroundColor,
            textColor: '#FFFFFF',
            text: '',
            textStyle: DEFAULT_TEXT_STYLE,
          };

          // Merge with existing item settings
          const itemSettings = {
            ...baseSettings,
            ...items[index],
          };

          const itemStyle = {
            gridRow: `span ${itemSettings.rowSpan || 1}`,
            gridColumn: `span ${itemSettings.colSpan || 1}`,
          };

          const cornerClass = itemSettings.cornerType === 'none' ? '' : `rounded-${itemSettings.cornerType}`;
          const aspectRatioClass = getAspectRatioClass(itemSettings.aspectRatio);

          const borderClass = getBorderClass(
            itemSettings.borderStyle || gridSettings.borderStyle,
            itemSettings.borderColor || gridSettings.borderColor
          );

          return (
            <div
              key={itemSettings.id}
              style={{
                ...itemStyle,
                backgroundColor: itemSettings.backgroundColor || gridSettings.backgroundColor,
              }}
              onClick={(e) => handleItemClick(index, e)}
              className={`
                ${borderClass}
                ${cornerClass}
                transition-all duration-200 hover:opacity-80
                cursor-pointer relative z-0
                h-full min-h-[120px]
              `}
            >
              <div className={`w-full h-full ${aspectRatioClass} p-4 flex items-center justify-center`}>
                {useImages ? (
                  <img
                    src={`https://source.unsplash.com/random/800x600?sig=${index}`}
                    alt={`Grid item ${index + 1}`}
                    className={`w-full h-full object-cover ${cornerClass}`}
                    loading="lazy"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full w-full">
                    <span 
                      className={`
                        text-${itemSettings.textStyle?.size || 'base'}
                        font-${itemSettings.textStyle?.weight || 'normal'}
                        text-${itemSettings.textStyle?.align || 'center'}
                        ${itemSettings.textStyle?.transform !== 'none' ? `${itemSettings.textStyle?.transform}` : ''}
                        whitespace-pre-wrap
                        w-full
                      `}
                      style={{ color: itemSettings.textColor }}
                    >
                      {itemSettings.text}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <Dialog>
        <DialogContent className="bg-gray-900 border-gray-800 z-50 max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-gray-100">
              Edit Grid Item {selectedItemIndex !== null ? selectedItemIndex + 1 : ''}
            </DialogTitle>
          </DialogHeader>
          
          {selectedItemIndex !== null && (
            <div className="flex gap-6">
              {/* Left Column - Layout & Style */}
              <div className="flex-1 space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <SelectField
                      label="Columns"
                      value={(items[selectedItemIndex]?.colSpan || 1).toString()}
                      onValueChange={(v) => {
                        const value = parseInt(v);
                        if (!isNaN(value)) {
                          handleItemUpdate(selectedItemIndex, { colSpan: value });
                        }
                      }}
                      options={ITEM_SPAN_OPTIONS.map(n => ({ value: n.toString(), label: `${n}` }))}
                      small
                    />
                  </div>
                  <div className="flex-1">
                    <SelectField
                      label="Rows"
                      value={(items[selectedItemIndex]?.rowSpan || 1).toString()}
                      onValueChange={(v) => {
                        const value = parseInt(v);
                        if (!isNaN(value)) {
                          handleItemUpdate(selectedItemIndex, { rowSpan: value });
                        }
                      }}
                      options={ITEM_SPAN_OPTIONS.map(n => ({ value: n.toString(), label: `${n}` }))}
                      small
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <SelectField
                      label="Aspect Ratio"
                      value={items[selectedItemIndex]?.aspectRatio || aspectRatio}
                      onValueChange={(v) => handleItemUpdate(selectedItemIndex, { aspectRatio: v })}
                      options={ASPECT_RATIO_OPTIONS}
                      small
                    />
                  </div>
                  <div className="flex-1">
                    <SelectField
                      label="Corner Style"
                      value={items[selectedItemIndex]?.cornerType || cornerType}
                      onValueChange={(v) => handleItemUpdate(selectedItemIndex, { cornerType: v as CornerType })}
                      options={CORNER_OPTIONS}
                      small
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <SelectField
                      label="Border Style"
                      value={items[selectedItemIndex]?.borderStyle || gridSettings.borderStyle}
                      onValueChange={(v) => handleItemUpdate(selectedItemIndex, { borderStyle: v as BorderStyle })}
                      options={BORDER_STYLE_OPTIONS}
                      small
                    />
                  </div>
                  {(items[selectedItemIndex]?.borderStyle || gridSettings.borderStyle) !== 'none' && (
                    <div className="flex-1">
                      <ColorPicker
                        label="Border Color"
                        color={items[selectedItemIndex]?.borderColor || gridSettings.borderColor}
                        onChange={(color) => handleItemUpdate(selectedItemIndex, { borderColor: color as BorderColor })}
                      />
                    </div>
                  )}
                </div>

                <ColorPicker
                  label="Background"
                  color={items[selectedItemIndex]?.backgroundColor || gridSettings.backgroundColor}
                  onChange={(color) => handleItemUpdate(selectedItemIndex, { backgroundColor: color })}
                />
              </div>

              {/* Vertical Separator */}
              <Separator orientation="vertical" className="bg-gray-800" />

              {/* Right Column - Text Settings */}
              <div className="flex-1 space-y-4">
                <TextEditor
                  text={items[selectedItemIndex]?.text || ''}
                  textColor={items[selectedItemIndex]?.textColor || '#FFFFFF'}
                  textStyle={items[selectedItemIndex]?.textStyle || DEFAULT_TEXT_STYLE}
                  onTextChange={(text) => handleItemUpdate(selectedItemIndex, { text })}
                  onColorChange={(color) => handleItemUpdate(selectedItemIndex, { textColor: color })}
                  onStyleChange={(style) => handleItemUpdate(selectedItemIndex, { 
                    textStyle: { ...items[selectedItemIndex]?.textStyle || DEFAULT_TEXT_STYLE, ...style } 
                  })}
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
