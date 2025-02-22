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
    gridTemplateRows: `repeat(${rows}, minmax(120px, 1fr))`,
    gap: `${gap * 0.25}rem`,
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
        className="h-full w-full bg-gray-950 rounded-lg p-4 overflow-auto"
      >
        {Array.from({ length: itemCount }).map((_, index) => {
          const itemSettings = items[index] || {
            id: `item-${index + 1}`,
            rowSpan: 1,
            colSpan: 1,
            aspectRatio: aspectRatio,
            cornerType: cornerType,
            borderStyle: gridSettings.borderStyle,
            borderColor: gridSettings.borderColor,
            backgroundColor: gridSettings.backgroundColor,
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
                h-full
              `}
            >
              <div className={`w-full h-full ${aspectRatioClass} p-4`}>
                {useImages ? (
                  <img
                    src={`https://source.unsplash.com/random/800x600?sig=${index}`}
                    alt={`Grid item ${index + 1}`}
                    className={`w-full h-full object-cover ${cornerClass}`}
                    loading="lazy"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full">
                    <span className="text-sm text-gray-200">
                      Grid Item {index + 1}
                      <br />
                      {itemSettings.colSpan || 1}x{itemSettings.rowSpan || 1}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <Dialog 
        open={selectedItemIndex !== null} 
        onOpenChange={handleDialogClose}
      >
        <DialogContent className="bg-gray-900 border-gray-800 z-50">
          <DialogHeader>
            <DialogTitle className="text-gray-100">
              Edit Grid Item {selectedItemIndex !== null ? selectedItemIndex + 1 : ''}
            </DialogTitle>
          </DialogHeader>
          
          {selectedItemIndex !== null && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <SelectField
                  label="Column Span"
                  value={(items[selectedItemIndex]?.colSpan || 1).toString()}
                  onValueChange={(v) => {
                    const value = parseInt(v);
                    if (!isNaN(value)) {
                      handleItemUpdate(selectedItemIndex, { colSpan: value });
                    }
                  }}
                  options={ITEM_SPAN_OPTIONS.map(n => ({ value: n.toString(), label: `Span ${n}` }))}
                  small
                />
                
                <SelectField
                  label="Row Span"
                  value={(items[selectedItemIndex]?.rowSpan || 1).toString()}
                  onValueChange={(v) => {
                    const value = parseInt(v);
                    if (!isNaN(value)) {
                      handleItemUpdate(selectedItemIndex, { rowSpan: value });
                    }
                  }}
                  options={ITEM_SPAN_OPTIONS.map(n => ({ value: n.toString(), label: `Span ${n}` }))}
                  small
                />

                <SelectField
                  label="Aspect Ratio"
                  value={items[selectedItemIndex]?.aspectRatio || aspectRatio}
                  onValueChange={(v) => handleItemUpdate(selectedItemIndex, { aspectRatio: v })}
                  options={ASPECT_RATIO_OPTIONS}
                  small
                />

                <SelectField
                  label="Corner Style"
                  value={items[selectedItemIndex]?.cornerType || cornerType}
                  onValueChange={(v) => handleItemUpdate(selectedItemIndex, { cornerType: v as CornerType })}
                  options={CORNER_OPTIONS}
                  small
                />

                <SelectField
                  label="Border Style"
                  value={items[selectedItemIndex]?.borderStyle || gridSettings.borderStyle}
                  onValueChange={(v) => handleItemUpdate(selectedItemIndex, { borderStyle: v as BorderStyle })}
                  options={BORDER_STYLE_OPTIONS}
                  small
                />
              </div>

              {(items[selectedItemIndex]?.borderStyle || gridSettings.borderStyle) !== 'none' && (
                <div className="space-y-2">
                  <Label className="text-gray-200 text-sm">Border Color</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {BORDER_COLOR_OPTIONS.map(({ value, class: borderClass }) => (
                      <button
                        key={value}
                        onClick={() => handleItemUpdate(selectedItemIndex, { borderColor: value as BorderColor })}
                        className={`
                          h-8 rounded border-2 transition-all
                          ${borderClass}
                          ${(items[selectedItemIndex]?.borderColor || gridSettings.borderColor) === value 
                            ? 'ring-2 ring-white ring-offset-2 ring-offset-black' 
                            : ''}
                        `}
                      />
                    ))}
                  </div>
                </div>
              )}

              <ColorPicker
                label="Background Color"
                color={items[selectedItemIndex]?.backgroundColor || gridSettings.backgroundColor}
                onChange={(color) => handleItemUpdate(selectedItemIndex, { 
                  backgroundColor: color 
                })}
              />

              <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (selectedItemIndex === null) return;
                    handleItemUpdate(selectedItemIndex, {
                      rowSpan: 1,
                      colSpan: 1,
                      aspectRatio: aspectRatio,
                      cornerType: cornerType,
                      borderStyle: gridSettings.borderStyle,
                      borderColor: gridSettings.borderColor,
                      backgroundColor: gridSettings.backgroundColor,
                    });
                  }}
                  className="border-gray-700 text-gray-100 hover:bg-gray-800"
                >
                  Reset This Item
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
