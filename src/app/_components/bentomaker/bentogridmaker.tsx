"use client"
import React, { FC, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { CopyIcon, CheckIcon } from "lucide-react";
import { toast } from "sonner";

type CornerType = 'none' | 'sm' | 'md' | 'lg' | 'full' | 'custom';

interface IGridSettings {
  columns: number;
  rows: number;
  gap: number;
  cornerType: CornerType;
  cornerCustom: number;
  useImages: boolean;
}

const defaultGridSettings: IGridSettings = {
  columns: 3,
  rows: 2,
  gap: 4,
  cornerType: 'md',
  cornerCustom: 0,
  useImages: false,
};

const BentoGridMaker: FC = () => {
  const [gridSettings, setGridSettings] = useState<IGridSettings>(defaultGridSettings);
  const [copied, setCopied] = useState(false);

  const getGeneratedCode = (settings: IGridSettings) => {
    const { columns, rows, gap, cornerType, cornerCustom } = settings;

    const c = Math.max(1, Math.min(columns, 12));
    const r = Math.max(1, Math.min(rows, 12));
    const g = Math.max(0, gap);

    const baseGridClass = `grid grid-cols-${c} grid-rows-${r} gap-${g}`;

    let cornerClass = '';
    if (cornerType === 'custom' && cornerCustom > 0) {
      cornerClass = `rounded-[${cornerCustom}px]`;
    } else if (cornerType !== 'none') {
      cornerClass = `rounded-${cornerType}`;
    }

    const finalGridClass = `${baseGridClass} ${cornerClass}`.trim();
    return `<div class="${finalGridClass}">\n  <!-- Grid items go here -->\n</div>`;
  };

  return (
    <div className="mx-auto px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <Card className="lg:sticky lg:top-4">
          <CardHeader>
            <CardTitle>Bento Grid Maker</CardTitle>
          </CardHeader>
          <CardContent>
            <ControlPanel gridSettings={gridSettings} onChange={setGridSettings} />
          </CardContent>
        </Card>

        <div className="space-y-8 ">
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent className='h-full w-80' >
              <GridPreview gridSettings={gridSettings} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Generated Code</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(getGeneratedCode(gridSettings));
                  setCopied(true);
                  toast.success("Code copied to clipboard!");
                  setTimeout(() => setCopied(false), 2000);
                }}
              >
                {copied ? (
                  <CheckIcon className="h-4 w-4" />
                ) : (
                  <CopyIcon className="h-4 w-4" />
                )}
              </Button>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted rounded-lg p-4 overflow-x-auto">
                <code>{getGeneratedCode(gridSettings)}</code>
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BentoGridMaker;

interface IControlPanelProps {
  gridSettings: IGridSettings;
  onChange: (newSettings: IGridSettings) => void;
}

const ControlPanel: FC<IControlPanelProps> = ({ gridSettings, onChange }) => {
  const updateSettings = (key: keyof IGridSettings, value: number | boolean | CornerType) => {
    onChange({ ...gridSettings, [key]: value });
  };

  const { columns, rows, gap, cornerType, cornerCustom, useImages } = gridSettings;

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label>Columns (1-12)</Label>
            <Input
              type="number"
              min={1}
              max={12}
              value={columns}
              onChange={(e) => updateSettings('columns', parseInt(e.target.value, 10))}
            />
          </div>

          <div className="space-y-2">
            <Label>Rows (1-12)</Label>
            <Input
              type="number"
              min={1}
              max={12}
              value={rows}
              onChange={(e) => updateSettings('rows', parseInt(e.target.value, 10))}
            />
          </div>

          <div className="space-y-2">
            <Label>Gap</Label>
            <Input
              type="number"
              min={0}
              value={gap}
              onChange={(e) => updateSettings('gap', parseInt(e.target.value, 10))}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Corner Type</Label>
          <Select
            value={cornerType}
            onValueChange={(value) => updateSettings('cornerType', value as CornerType)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="sm">Small</SelectItem>
              <SelectItem value="md">Medium</SelectItem>
              <SelectItem value="lg">Large</SelectItem>
              <SelectItem value="full">Full</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>

          {cornerType === 'custom' && (
            <div className="mt-4 space-y-2">
              <Label>Custom Radius (px)</Label>
              <Input
                type="number"
                min={0}
                value={cornerCustom}
                onChange={(e) => updateSettings('cornerCustom', parseInt(e.target.value, 10))}
              />
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            checked={useImages}
            onCheckedChange={(checked) => updateSettings('useImages', checked)}
          />
          <Label>Use Images</Label>
        </div>
      </div>
    </div>
  );
};

interface IGridPreviewProps {
  gridSettings: IGridSettings;
}

const GridPreview: FC<IGridPreviewProps> = ({ gridSettings }) => {
  const { columns, rows, gap, cornerType, cornerCustom, useImages } = gridSettings;

  const c = Math.max(1, Math.min(columns, 12));
  const r = Math.max(1, Math.min(rows, 12));
  const g = Math.max(0, gap);

  const baseGridClass = `grid grid-cols-${c} grid-rows-${r} gap-${g}`;

  let cornerClass = '';
  if (cornerType === 'custom' && cornerCustom > 0) {
    cornerClass = `rounded-[${cornerCustom}px]`;
  } else if (cornerType !== 'none') {
    cornerClass = `rounded-${cornerType}`;
  }

  const finalGridClass = `${baseGridClass} ${cornerClass}`.trim();
  const placeholderURL = (index: number) => 
    `https://source.unsplash.com/random/300x200?sig=${index}`;

  return (
    <div className={`${finalGridClass} min-h-[400px]`}>
      {[...Array(c * r)].map((_, index) => (
        <div
          key={index}
          className={`bg-muted flex items-center justify-center p-4 ${cornerClass} transition-all duration-200 hover:opacity-80`}
        >
          {useImages ? (
            <img
              src={placeholderURL(index)}
              alt={`Grid item ${index + 1}`}
              className={`w-full h-full object-cover ${cornerClass}`}
              loading="lazy"
            />
          ) : (
            <span className="text-sm text-muted-foreground">Grid Item {index + 1}</span>
          )}
        </div>
      ))}
    </div>
  );
};