import * as React from 'react';

import { type VariantProps, cva } from 'class-variance-authority';
import { CheckIcon, ChevronDown, XCircle, XIcon } from 'lucide-react';

import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '../ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Separator } from '../ui/separator';
import { cn } from '../utils/utils';

// Styles
const multiSelectVariants = cva('m-1', {
  variants: {
    variant: {
      default: 'border-foreground/10 text-foreground bg-card hover:bg-card/80',
      secondary:
        'border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80',
      destructive:
        'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
      inverted: 'inverted',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

// Types
interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface MultiSelectProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof multiSelectVariants> {
  options: Option[];
  onValueChange: (value: string[]) => void;
  defaultValue?: string[];
  placeholder?: string;
  animation?: number;
  maxCount?: number;
  modalPopover?: boolean;
  asChild?: boolean;
  className?: string;
}

// Sub-components
const SelectedBadge = ({
  option,
  variant,
  animation,
  onRemove,
}: {
  option: Option;
  variant?: 'default' | 'secondary' | 'destructive' | 'inverted' | null;
  animation?: number;
  onRemove: (value: string) => void;
}) => {
  const IconComponent = option.icon;

  return (
    <Badge
      data-cid="Badge-g06Gny"
      className={cn(multiSelectVariants({ variant }))}
      style={{ animationDuration: `${animation}s` }}
    >
      {IconComponent && (
        <IconComponent
          data-cid="IconComponent-tPmsaM"
          className="mr-2 h-4 w-4"
        />
      )}
      {option.label}
      <XCircle
        data-cid="XCircle-UzEfKd"
        className="ml-2 h-4 w-4 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(option.value);
        }}
      />
    </Badge>
  );
};

const MoreBadge = ({
  count,
  variant,
  animation,
  onClear,
}: {
  count: number;
  variant?: 'default' | 'secondary' | 'destructive' | 'inverted' | null;
  animation?: number;
  onClear: () => void;
}) => (
  <Badge
    data-cid="Badge-O20P9s"
    className={cn(
      'border-foreground/1 bg-transparent text-foreground hover:bg-transparent',
      multiSelectVariants({ variant })
    )}
    style={{ animationDuration: `${animation}s` }}
  >
    {`+ ${count} 더보기`}
    <XCircle
      data-cid="XCircle-DHcdaF"
      className="ml-2 h-4 w-4 cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        onClear();
      }}
    />
  </Badge>
);

const CommandSection = ({
  options,
  selectedValues,
  onToggleOption,
  onToggleAll,
  onClear,
  onClose,
}: {
  options: Option[];
  selectedValues: string[];
  onToggleOption: (value: string) => void;
  onToggleAll: () => void;
  onClear: () => void;
  onClose: () => void;
}) => (
  <Command data-cid="Command-u2ErCv">
    <CommandInput
      data-cid="CommandInput-iagbSN"
      placeholder="카테고리 검색"
      onKeyDown={(e) => {
        if (e.key === 'Escape') onClose();
      }}
    />
    <CommandList data-cid="CommandList-fBhAg3">
      <CommandEmpty data-cid="CommandEmpty-tw51Mf">결과가 없습니다.</CommandEmpty>
      <CommandGroup data-cid="CommandGroup-FbQi4l">
        <CommandItem
          data-cid="CommandItem-Om6KGk"
          key="all"
          onSelect={onToggleAll}
          className="cursor-pointer"
        >
          <div
            data-cid="div-ELznGe"
            className={cn(
              'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
              selectedValues.length === options.length
                ? 'bg-primary text-primary-foreground'
                : 'opacity-50 [&_svg]:invisible'
            )}
          >
            <CheckIcon
              data-cid="CheckIcon-knSKm6"
              className="h-4 w-4"
            />
          </div>
          <span data-cid="span-K3UOQA">(전체 선택)</span>
        </CommandItem>
        {options.map((option) => (
          <CommandItem
            data-cid="CommandItem-z9yOnr"
            key={option.value}
            onSelect={() => onToggleOption(option.value)}
            className="cursor-pointer"
          >
            <div
              data-cid="div-354kb0"
              className={cn(
                'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                selectedValues.includes(option.value)
                  ? 'bg-primary text-primary-foreground'
                  : 'opacity-50 [&_svg]:invisible'
              )}
            >
              <CheckIcon
                data-cid="CheckIcon-079Fdq"
                className="h-4 w-4"
              />
            </div>
            {option.icon && (
              <option.icon
                data-cid="element-lQqszP"
                className="mr-2 h-4 w-4 text-muted-foreground"
              />
            )}
            <span data-cid="span-rUatwf">{option.label}</span>
          </CommandItem>
        ))}
      </CommandGroup>
      <CommandSeparator data-cid="CommandSeparator-Oda59R" />
      <CommandGroup data-cid="CommandGroup-C70rO3">
        <div
          data-cid="div-OOeCwL"
          className="flex items-center justify-between"
        >
          {selectedValues.length > 0 && (
            <>
              <CommandItem
                data-cid="CommandItem-wRHMKn"
                onSelect={onClear}
                className="flex-1 cursor-pointer justify-center"
              >
                모두 해제
              </CommandItem>
              <Separator
                data-cid="Separator-timZkz"
                orientation="vertical"
                className="flex h-full min-h-6"
              />
            </>
          )}
          <CommandItem
            data-cid="CommandItem-vNkeYh"
            onSelect={onClose}
            className="max-w-full flex-1 cursor-pointer justify-center"
          >
            닫기
          </CommandItem>
        </div>
      </CommandGroup>
    </CommandList>
  </Command>
);

// Hook for managing state and handlers
const useMultiSelect = (
  options: Option[],
  onValueChange: (value: string[]) => void,
  defaultValue: string[] = []
) => {
  const [selectedValues, setSelectedValues] = React.useState<string[]>(defaultValue);
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

  const handleToggleOption = (option: string) => {
    const newSelectedValues = selectedValues.includes(option)
      ? selectedValues.filter((value) => value !== option)
      : [...selectedValues, option];
    setSelectedValues(newSelectedValues);
    onValueChange(newSelectedValues);
  };

  const handleClear = () => {
    setSelectedValues([]);
    onValueChange([]);
  };

  const handleToggleAll = () => {
    if (selectedValues.length === options.length) {
      handleClear();
    } else {
      const allValues = options.map((option) => option.value);
      setSelectedValues(allValues);
      onValueChange(allValues);
    }
  };

  const clearExtraOptions = (maxCount: number) => {
    const newSelectedValues = selectedValues.slice(0, maxCount);
    setSelectedValues(newSelectedValues);
    onValueChange(newSelectedValues);
  };

  return {
    selectedValues,
    isPopoverOpen,
    setIsPopoverOpen,
    handleToggleOption,
    handleClear,
    handleToggleAll,
    clearExtraOptions,
  };
};

// Main component
export const MultiSelect = React.forwardRef<HTMLButtonElement, MultiSelectProps>(
  (
    {
      options,
      onValueChange,
      variant,
      defaultValue = [],
      placeholder = 'Select options',
      animation = 0,
      maxCount = 3,
      modalPopover = false,
      className,
      ...props
    },
    ref
  ) => {
    const {
      selectedValues,
      isPopoverOpen,
      setIsPopoverOpen,
      handleToggleOption,
      handleClear,
      handleToggleAll,
      clearExtraOptions,
    } = useMultiSelect(options, onValueChange, defaultValue);

    return (
      <Popover
        data-cid="Popover-GOiQN5"
        open={isPopoverOpen}
        onOpenChange={setIsPopoverOpen}
        modal={modalPopover}
      >
        <PopoverTrigger
          data-cid="PopoverTrigger-SGn1IF"
          asChild
        >
          <Button
            data-cid="Button-6eGvNO"
            ref={ref}
            {...props}
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
            className={cn(
              'flex h-auto min-h-10 w-full items-center justify-between rounded-md border bg-inherit p-1 shadow-none hover:bg-inherit [&_svg]:pointer-events-auto',
              className
            )}
          >
            {selectedValues.length > 0 ? (
              <div
                data-cid="div-QYe7gz"
                className="flex w-full items-center justify-between"
              >
                <div
                  data-cid="div-YWEYRO"
                  className="flex flex-wrap items-center"
                >
                  {selectedValues.slice(0, maxCount).map((value) => {
                    const option = options.find((o) => o.value === value);
                    if (!option) return null;
                    return (
                      <SelectedBadge
                        data-cid="SelectedBadge-rCxTxW"
                        key={value}
                        option={option}
                        variant={variant}
                        animation={animation}
                        onRemove={handleToggleOption}
                      />
                    );
                  })}
                  {selectedValues.length > maxCount && (
                    <MoreBadge
                      data-cid="MoreBadge-uDBXPT"
                      count={selectedValues.length - maxCount}
                      variant={variant}
                      animation={animation}
                      onClear={() => clearExtraOptions(maxCount)}
                    />
                  )}
                </div>
                <div
                  data-cid="div-HSMTdv"
                  className="flex items-center justify-between"
                >
                  <XIcon
                    data-cid="XIcon-LX3ARH"
                    className="mx-2 h-4 cursor-pointer text-muted-foreground"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClear();
                    }}
                  />
                  <Separator
                    data-cid="Separator-o86ocN"
                    orientation="vertical"
                    className="flex h-full min-h-6"
                  />
                  <ChevronDown
                    data-cid="ChevronDown-vBlfhj"
                    className="mx-2 h-4 cursor-pointer text-muted-foreground"
                  />
                </div>
              </div>
            ) : (
              <div
                data-cid="div-oeBOAZ"
                className="mx-auto flex w-full items-center justify-between"
              >
                <span
                  data-cid="span-TPYPBq"
                  className="mx-3 text-sm text-muted-foreground"
                >
                  {placeholder}
                </span>
                <ChevronDown
                  data-cid="ChevronDown-6qGvLo"
                  className="mx-2 h-4 cursor-pointer text-muted-foreground"
                />
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          data-cid="PopoverContent-Mg01vp"
          className="w-auto p-0"
          align="start"
        >
          <CommandSection
            data-cid="CommandSection-dD5lKe"
            options={options}
            selectedValues={selectedValues}
            onToggleOption={handleToggleOption}
            onToggleAll={handleToggleAll}
            onClear={handleClear}
            onClose={() => setIsPopoverOpen(false)}
          />
        </PopoverContent>
      </Popover>
    );
  }
);

MultiSelect.displayName = 'MultiSelect';
