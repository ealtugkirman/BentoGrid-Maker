"use client"
import React, { FC, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CopyIcon, CheckIcon, RefreshCwIcon } from 'lucide-react';
import { toast } from "sonner";
import { ControlPanel } from './control-panel';
import { GridPreview } from './grid-preview';
import { getGeneratedCode } from './utils';

export interface IGridItem {
  id: string;
  rowSpan: number;
  colSpan: number;
  aspectRatio: string;
  cornerType: CornerType;
  cornerCustom: number;
}

export interface IGridSettings {
  columns: number;
  rows: number;
  gap: number;
  cornerType: CornerType;
  cornerCustom: number;
  useImages: boolean;
  aspectRatio: string;
}

export type CornerType = 'none' | 'sm' | 'md' | 'lg' | 'full' | 'custom';

const defaultGridSettings: IGridSettings = {
  columns: 3,
  rows: 2,
  gap: 4,
  cornerType: 'md',
  cornerCustom: 0,
  useImages: false,
  aspectRatio: '1:1',
};

const BentoGridMaker: FC = () => {
  const [gridSettings, setGridSettings] = useState<IGridSettings>(defaultGridSettings);
  const [copied, setCopied] = useState(false);
  const [previewSettings, setPreviewSettings] = useState<IGridSettings>(defaultGridSettings);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(getGeneratedCode(gridSettings));
    setCopied(true);
    toast.success("Code copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResetSettings = () => {
    setGridSettings(defaultGridSettings);
    setPreviewSettings(defaultGridSettings);
    toast.info("Settings reset to default");
  };

  const handleApplySettings = () => {
    setPreviewSettings(gridSettings);
    toast.success("Settings applied to preview!");
  };

  return (
    <div className="space-y-8">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Control Panel</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <ControlPanel gridSettings={gridSettings} onChange={setGridSettings} />
          <div className="flex gap-4">
            <Button
              variant="default"
              size="sm"
              onClick={handleApplySettings}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              Apply Changes
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetSettings}
              className="flex-1 border-gray-600 text-gray-200 hover:bg-gray-700"
            >
              <RefreshCwIcon className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <GridPreview gridSettings={previewSettings} />
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white">Generated Code</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyCode}
            className="border-gray-600 text-gray-200 hover:bg-gray-700"
          >
            {copied ? (
              <CheckIcon className="h-4 w-4" />
            ) : (
              <CopyIcon className="h-4 w-4" />
            )}
          </Button>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-900 rounded-lg p-4 overflow-x-auto text-gray-200">
            <code>{getGeneratedCode(gridSettings)}</code>
          </pre>
        </CardContent>
      </Card>
    </div>
  );
};

export default BentoGridMaker;

