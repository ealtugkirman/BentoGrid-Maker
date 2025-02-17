import React, { FC } from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { IGridSettings, CornerType } from './bento-grid-maker';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface IControlPanelProps {
  gridSettings: IGridSettings;
  onChange: (newSettings: IGridSettings) => void;
}

export const ControlPanel: FC<IControlPanelProps> = ({ gridSettings, onChange }) => {
  const updateSettings = (key: keyof IGridSettings, value: any) => {
    onChange({ ...gridSettings, [key]: value });
  };

  const { columns, rows, gap, cornerType, cornerCustom, useImages, aspectRatio } = gridSettings;

  return (
    <Tabs defaultValue="layout" className="space-y-4">
      <TabsList className="w-full bg-gray-700 border-gray-600">
        <TabsTrigger value="layout" className="flex-1 data-[state=active]:bg-gray-600">Layout</TabsTrigger>
        <TabsTrigger value="style" className="flex-1 data-[state=active]:bg-gray-600">Style</TabsTrigger>
      </TabsList>

      <TabsContent value="layout" className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-gray-200">Columns</Label>
            <Select value={columns.toString()} onValueChange={(v) => updateSettings('columns', parseInt(v))}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-gray-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                {[2, 3, 4, 6].map(n => (
                  <SelectItem key={n} value={n.toString()}>{n} Columns</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-200">Rows</Label>
            <Select value={rows.toString()} onValueChange={(v) => updateSettings('rows', parseInt(v))}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-gray-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                {[1, 2, 3, 4].map(n => (
                  <SelectItem key={n} value={n.toString()}>{n} Rows</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-200">Gap Size</Label>
            <Select value={gap.toString()} onValueChange={(v) => updateSettings('gap', parseInt(v))}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-gray-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="0">None</SelectItem>
                <SelectItem value="2">Small</SelectItem>
                <SelectItem value="4">Medium</SelectItem>
                <SelectItem value="6">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-200">Aspect Ratio</Label>
            <Select value={aspectRatio} onValueChange={(v) => updateSettings('aspectRatio', v)}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-gray-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="1:1">Square (1:1)</SelectItem>
                <SelectItem value="16:9">Widescreen (16:9)</SelectItem>
                <SelectItem value="4:3">Standard (4:3)</SelectItem>
                <SelectItem value="2:1">Panoramic (2:1)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="style" className="space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-gray-200">Corner Style</Label>
            <Select value={cornerType} onValueChange={(v) => updateSettings('cornerType', v as CornerType)}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-gray-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="none">No Corners</SelectItem>
                <SelectItem value="sm">Subtle</SelectItem>
                <SelectItem value="md">Medium</SelectItem>
                <SelectItem value="lg">Large</SelectItem>
                <SelectItem value="full">Fully Rounded</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              checked={useImages}
              onCheckedChange={(checked) => updateSettings('useImages', checked)}
              className="data-[state=checked]:bg-blue-600"
            />
            <Label className="text-gray-200">Show Images</Label>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

