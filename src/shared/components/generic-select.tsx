import React from 'react';

import { Label } from '@/shared/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';

interface GenericSelectProps<T extends string> {
  value: T;
  onChange: (value: T) => void;
  options: T[];
  width?: string;
  label?: string;
  placeholder?: string;
  className?: string;
}

export function GenericSelect<T extends string>({
  value,
  onChange,
  options,
  width = 'w-60',
  label,
  placeholder = '선택하세요',
  className = '',
}: GenericSelectProps<T>) {
  return (
    <div
      data-cid="div-8LXCW0"
      className={`space-y-2 ${className}`}
    >
      {label && <Label data-cid="Label-ptFmIa">{label}</Label>}
      <Select
        data-cid="Select-NsB1AA"
        onValueChange={(value: string) => onChange(value as T)}
        value={value}
      >
        <SelectTrigger
          data-cid="SelectTrigger-AHFDle"
          className={width}
        >
          <SelectValue
            data-cid="SelectValue-RPuOHL"
            placeholder={placeholder}
          />
        </SelectTrigger>
        <SelectContent data-cid="SelectContent-mJQdF9">
          <SelectGroup data-cid="SelectGroup-FXJ44C">
            {options.map((option) => (
              <SelectItem
                data-cid="SelectItem-v8d1xJ"
                key={option}
                value={option}
              >
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
