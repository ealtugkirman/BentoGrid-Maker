import React, { FC, useState } from 'react';
import { IGridSettings, CornerType } from './bento-grid-maker';
import { getAspectRatioClass } from './utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SelectField } from './select-field';
import { ASPECT_RATIO_OPTIONS, CORNER_OPTIONS, ITEM_SPAN_OPTIONS } from './constants';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface IGridPreviewProps {
  gridSettings: IGridSettings;
  onItemUpdate: (index: number, updates: Partial<{
    rowSpan: number;
    colSpan: number;
    aspectRatio: string;
    cornerType: CornerType;
  }>) => void;
}

export const GridPreview: FC<IGridPreviewProps> = ({ gridSettings, onItemUpdate }) => {
  const { columns, rows, gap, cornerType, useImages, aspectRatio, items } = gridSettings;
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);

  const handleItemUpdate = (index: number, updates: Partial<{
    rowSpan: number;
    colSpan: number;
    aspectRatio: string;
    cornerType: CornerType;
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
    gridTemplateRows: `repeat(${rows}, minmax(100px, 1fr))`,
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

  return (
    <>
      <div 
        style={gridStyle} 
        className="h-full w-full bg-gray-950 rounded-lg p-4 overflow-auto min-h-0"
      >
        {Array.from({ length: columns * rows }).map((_, index) => {
          const itemSettings = items[index] || {
            id: `item-${index + 1}`,
            rowSpan: 1,
            colSpan: 1,
            aspectRatio: aspectRatio,
            cornerType: cornerType,
          };

          const itemStyle = {
            gridRow: `span ${itemSettings.rowSpan || 1}`,
            gridColumn: `span ${itemSettings.colSpan || 1}`,
          };

          const cornerClass = itemSettings.cornerType === 'none' ? '' : `rounded-${itemSettings.cornerType}`;
          const aspectRatioClass = getAspectRatioClass(itemSettings.aspectRatio);

          return (
            <div
              key={itemSettings.id}
              style={itemStyle}
              onClick={(e) => handleItemClick(index, e)}
              className={`
                bg-gray-900 border border-gray-800
                flex items-center justify-center p-4 
                ${cornerClass} ${aspectRatioClass}
                transition-all duration-200 hover:opacity-80
                cursor-pointer relative z-0
                min-h-[100px] // Add minimum height
              `}
            >
              {useImages ? (
                <img
                  src={`https://source.unsplash.com/random/800x600?sig=${index}`}
                  alt={`Grid item ${index + 1}`}
                  className={`w-full h-full object-cover ${cornerClass}`}
                  loading="lazy"
                />
              ) : (
                <span className="text-sm text-gray-200">
                  Grid Item {index + 1}
                  <br />
                  {itemSettings.colSpan || 1}x{itemSettings.rowSpan || 1}
                </span>
              )}
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
                />

                <SelectField
                  label="Aspect Ratio"
                  value={items[selectedItemIndex]?.aspectRatio || aspectRatio}
                  onValueChange={(v) => {
                    handleItemUpdate(selectedItemIndex, { aspectRatio: v });
                  }}
                  options={ASPECT_RATIO_OPTIONS}
                />

                <SelectField
                  label="Corner Style"
                  value={items[selectedItemIndex]?.cornerType || cornerType}
                  onValueChange={(v) => {
                    handleItemUpdate(selectedItemIndex, { cornerType: v as CornerType });
                  }}
                  options={CORNER_OPTIONS}
                />
              </div>

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
