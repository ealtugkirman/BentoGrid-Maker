import React, { FC, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { IGridSettings, CornerType } from "./bento-grid-maker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SelectField } from "./select-field";
import { ASPECT_RATIO_OPTIONS, CORNER_OPTIONS } from "./constants";
import { Slider } from "@/components/ui/slider";

// Constants for slider limits
const COLUMN_LIMITS = { min: 1, max: 6, default: 3 };
const ROW_LIMITS = { min: 1, max: 4, default: 2 };
const GAP_OPTIONS = [
  { value: "0", label: "None" },
  { value: "2", label: "Small" },
  { value: "4", label: "Medium" },
  { value: "6", label: "Large" },
] as const;
const ITEM_COUNT_LIMITS = { min: 1, max: 12, default: 6 };

interface IControlPanelProps {
  gridSettings: IGridSettings;
  onChange: (newSettings: IGridSettings) => void;
  onDimensionChange: (key: "rows" | "columns", value: number) => void;
}

export const ControlPanel: FC<IControlPanelProps> = ({
  gridSettings,
  onChange,
  onDimensionChange,
}) => {
  const updateSettings = useMemo(() => {
    return <T extends keyof IGridSettings>(key: T, value: IGridSettings[T]) => {
      if (key === "rows" || key === "columns") {
        onDimensionChange(key, value as number);
      } else {
        onChange({ ...gridSettings, [key]: value });
      }
    };
  }, [onChange, onDimensionChange, gridSettings]);

  const { columns, rows, gap, cornerType, useImages, aspectRatio, itemCount } =
    gridSettings;

  return (
    <div className="space-y-8">
      {/* Layout Section */}
      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-white">Layout</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label className="text-gray-200">Columns</Label>
            <span className="text-gray-400">{columns}</span>
          </div>
          <Slider
            value={[columns]}
            min={COLUMN_LIMITS.min}
            max={COLUMN_LIMITS.max}
            step={1}
            onValueChange={(value) => updateSettings("columns", value[0])}
            className="py-4"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label className="text-gray-200">Rows</Label>
            <span className="text-gray-400">{rows}</span>
          </div>
          <Slider
            value={[rows]}
            min={ROW_LIMITS.min}
            max={ROW_LIMITS.max}
            step={1}
            onValueChange={(value) => updateSettings("rows", value[0])}
            className="py-4"
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label className="text-gray-200">Items</Label>
            <span className="text-gray-400">{itemCount}</span>
          </div>
          <Slider
            value={[itemCount]}
            min={ITEM_COUNT_LIMITS.min}
            max={ITEM_COUNT_LIMITS.max}
            step={1}
            onValueChange={(value) => updateSettings("itemCount", value[0])}
            className="py-4"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <SelectField
            label="Gap Size"
            value={gap.toString()}
            onValueChange={(v) => updateSettings("gap", parseInt(v))}
            options={GAP_OPTIONS}
          />
          <SelectField
            label="Aspect Ratio"
            value={aspectRatio}
            onValueChange={(v) => updateSettings("aspectRatio", v)}
            options={ASPECT_RATIO_OPTIONS}
          />
        </div>
      </div>

      {/* Style Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white">Style</h2>
        <SelectField
          label="Corner Style"
          value={cornerType}
          onValueChange={(v) => updateSettings("cornerType", v as CornerType)}
          options={CORNER_OPTIONS}
        />
        <div className="flex items-center space-x-2">
          <Switch
            checked={useImages}
            onCheckedChange={(checked) => updateSettings("useImages", checked)}
            className="data-[state=checked]:bg-blue-600"
          />
          <Label className="text-gray-200">Show Images</Label>
        </div>
      </div>
    </div>
  );
};
