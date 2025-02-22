"use client"
import React, { FC, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CopyIcon, CheckIcon, RefreshCwIcon } from 'lucide-react';
import { toast } from "sonner";
import { ControlPanel } from './control-panel';
import { GridPreview } from './grid-preview';
import { getGeneratedCode } from './utils';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export interface IGridItem {
  id: string;
  rowSpan: number;
  colSpan: number;
  aspectRatio: string;
  cornerType: CornerType;
  cornerCustom: number;
  borderStyle: BorderStyle;
  borderColor: BorderColor;
}

export interface IGridSettings {
  columns: number;
  rows: number;
  gap: number;
  cornerType: CornerType;
  cornerCustom: number;
  useImages: boolean;
  aspectRatio: string;
  itemCount: number;
  backgroundColor: BackgroundColor;
  items: Array<{
    id: string;
    rowSpan: number;
    colSpan: number;
    aspectRatio: string;
    cornerType: CornerType;
    borderStyle: BorderStyle;
    borderColor: BorderColor;
    backgroundColor: BackgroundColor;
  }>;
  borderStyle: BorderStyle;
  borderColor: BorderColor;
}

export type CornerType = 'none' | 'sm' | 'md' | 'lg' | 'full' | 'custom';
export type BorderStyle = 'none' | 'thin' | 'medium' | 'thick';
export type BorderColor = 'gray' | 'white' | 'blue' | 'green' | 'purple' | 'orange';
export type BackgroundColor = string;

const defaultGridSettings: IGridSettings = {
  columns: 3,
  rows: 2,
  gap: 4,
  cornerType: 'md',
  cornerCustom: 0,
  useImages: false,
  aspectRatio: '1:1',
  itemCount: 6,
  backgroundColor: '#1F2937',
  items: [],
  borderStyle: 'thin',
  borderColor: 'gray',
};

const BentoGridMaker: FC = () => {
  const [gridSettings, setGridSettings] = useState<IGridSettings>(defaultGridSettings);
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(getGeneratedCode(gridSettings));
    setCopied(true);
    toast.success("Code copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResetSettings = () => {
    setGridSettings(defaultGridSettings);
    toast.info("Settings reset to default");
  };

  const handleGridDimensionChange = (key: 'rows' | 'columns', value: number) => {
    setGridSettings(prev => {
      const existingItems = [...(prev.items || [])];
      
      return {
        ...prev,
        [key]: value,
        items: existingItems,
      };
    });
  };

  const handleItemUpdate = (index: number, updates: Partial<{
    rowSpan: number;
    colSpan: number;
    aspectRatio: string;
    cornerType: CornerType;
    borderStyle: BorderStyle;
    borderColor: BorderColor;
    backgroundColor: BackgroundColor;
  }>) => {
    setGridSettings(prev => {
      const newItems = [...(prev.items || [])];
      newItems[index] = {
        ...newItems[index],
        id: `item-${index + 1}`,
        rowSpan: updates.rowSpan ?? newItems[index]?.rowSpan ?? 1,
        colSpan: updates.colSpan ?? newItems[index]?.colSpan ?? 1,
        aspectRatio: updates.aspectRatio ?? newItems[index]?.aspectRatio ?? prev.aspectRatio,
        cornerType: updates.cornerType ?? newItems[index]?.cornerType ?? prev.cornerType,
        borderStyle: updates.borderStyle ?? newItems[index]?.borderStyle ?? prev.borderStyle,
        borderColor: updates.borderColor ?? newItems[index]?.borderColor ?? prev.borderColor,
        backgroundColor: updates.backgroundColor ?? newItems[index]?.backgroundColor ?? prev.backgroundColor,
      };
      return { ...prev, items: newItems };
    });
  };

  return (
    <div className="flex gap-6 p-4 h-full">
      {/* Sidebar Control Panel */}
      <div className="w-80 flex-shrink-0 overflow-auto">
        <Card className="bg-black border-gray-800">
          <CardHeader className="sticky top-0 z-10 bg-black">
            <CardTitle className="text-white">Control Panel</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <ControlPanel 
              gridSettings={gridSettings} 
              onChange={setGridSettings}
              onDimensionChange={handleGridDimensionChange}
            />
            <div className="flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetSettings}
                className="border-gray-800 text-gray-200 hover:bg-gray-900"
              >
                <RefreshCwIcon className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col gap-4 min-h-0 w-[calc(100vw-24rem)]"> {/* 24rem = 320px (w-80) + padding + gap */}
        <Card className="bg-black border-gray-800 flex-1 min-h-0">
          <CardHeader className="flex-none">
            <CardTitle className="text-white">Preview</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 min-h-0 h-[calc(100vh-400px)]"> {/* Adjust the 400px value based on your needs */}
            <GridPreview 
              gridSettings={gridSettings} 
              onItemUpdate={handleItemUpdate}
            />
          </CardContent>
        </Card>

        <Card className="bg-black border-gray-800 flex-none">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white">Generated Code</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyCode}
              className="border-gray-800 text-gray-200 hover:bg-gray-900"
            >
              {copied ? (
                <CheckIcon className="h-4 w-4" />
              ) : (
                <CopyIcon className="h-4 w-4" />
              )}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <SyntaxHighlighter
                language="jsx"
                style={vscDarkPlus}
                customStyle={{
                  background: '#030712',
                  padding: '1.5rem',
                  borderRadius: '0.5rem',
                  maxHeight: '400px',
                }}
                className="!bg-gray-950 !m-0"
              >
                {getGeneratedCode(gridSettings)}
              </SyntaxHighlighter>
              <div className="absolute top-3 right-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BentoGridMaker;

