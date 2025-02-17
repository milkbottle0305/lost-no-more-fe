import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { CheckIcon, XCircle, ChevronDown, XIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';

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

interface MultiSelectProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof multiSelectVariants> {
  /**
   * An array of option objects to be displayed in the multi-select component.
   * Each option object has a label, value, and an optional icon.
   */
  options: {
    /** The text to display for the option. */
    label: string;
    /** The unique value associated with the option. */
    value: string;
    /** Optional icon component to display alongside the option. */
    icon?: React.ComponentType<{ className?: string }>;
  }[];

  /**
   * Callback function triggered when the selected values change.
   * Receives an array of the new selected values.
   */
  onValueChange: (value: string[]) => void;

  /** The default selected values when the component mounts. */
  defaultValue?: string[];

  /**
   * Placeholder text to be displayed when no values are selected.
   * Optional, defaults to "Select options".
   */
  placeholder?: string;

  /**
   * Animation duration in seconds for the visual effects (e.g., bouncing badges).
   * Optional, defaults to 0 (no animation).
   */
  animation?: number;

  /**
   * Maximum number of items to display. Extra selected items will be summarized.
   * Optional, defaults to 3.
   */
  maxCount?: number;

  /**
   * The modality of the popover. When set to true, interaction with outside elements
   * will be disabled and only popover content will be visible to screen readers.
   * Optional, defaults to false.
   */
  modalPopover?: boolean;

  /**
   * If true, renders the multi-select component as a child of another component.
   * Optional, defaults to false.
   */
  asChild?: boolean;

  /**
   * Additional class names to apply custom styles to the multi-select component.
   * Optional, can be used to add custom styles.
   */
  className?: string;
}

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
    const [selectedValues, setSelectedValues] = React.useState<string[]>(defaultValue);
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

    const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        setIsPopoverOpen(true);
      } else if (event.key === 'Backspace' && !event.currentTarget.value) {
        const newSelectedValues = [...selectedValues];
        newSelectedValues.pop();
        setSelectedValues(newSelectedValues);
        onValueChange(newSelectedValues);
      }
    };

    const toggleOption = (option: string) => {
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

    const handleTogglePopover = () => {
      setIsPopoverOpen((prev) => !prev);
    };

    const clearExtraOptions = () => {
      const newSelectedValues = selectedValues.slice(0, maxCount);
      setSelectedValues(newSelectedValues);
      onValueChange(newSelectedValues);
    };

    const toggleAll = () => {
      if (selectedValues.length === options.length) {
        handleClear();
      } else {
        const allValues = options.map((option) => option.value);
        setSelectedValues(allValues);
        onValueChange(allValues);
      }
    };

    return (
      <Popover
        data-cid="Popover-7R27TP"
        open={isPopoverOpen}
        onOpenChange={setIsPopoverOpen}
        modal={modalPopover}
      >
        <PopoverTrigger data-cid="PopoverTrigger-HKHRML" asChild>
          <Button
            data-cid="Button-sNG4mI"
            ref={ref}
            {...props}
            onClick={handleTogglePopover}
            className={cn(
              'flex h-auto min-h-10 w-full items-center justify-between rounded-md border bg-inherit p-1 shadow-none hover:bg-inherit [&_svg]:pointer-events-auto',
              className
            )}
          >
            {selectedValues.length > 0 ? (
              <div data-cid="div-ybGn7k" className="flex w-full items-center justify-between">
                <div data-cid="div-HZVPEm" className="flex flex-wrap items-center">
                  {selectedValues.slice(0, maxCount).map((value) => {
                    const option = options.find((o) => o.value === value);
                    const IconComponent = option?.icon;
                    return (
                      <Badge
                        data-cid="Badge-eaJIK9"
                        key={value}
                        className={cn(multiSelectVariants({ variant }))}
                        style={{ animationDuration: `${animation}s` }}
                      >
                        {IconComponent && (
                          <IconComponent data-cid="IconComponent-VaOlSF" className="mr-2 h-4 w-4" />
                        )}
                        {option?.label}
                        <XCircle
                          data-cid="XCircle-t2XweB"
                          className="ml-2 h-4 w-4 cursor-pointer"
                          onClick={(event) => {
                            event.stopPropagation();
                            toggleOption(value);
                          }}
                        />
                      </Badge>
                    );
                  })}
                  {selectedValues.length > maxCount && (
                    <Badge
                      data-cid="Badge-mYITSW"
                      className={cn(
                        'border-foreground/1 bg-transparent text-foreground hover:bg-transparent',
                        multiSelectVariants({ variant })
                      )}
                      style={{ animationDuration: `${animation}s` }}
                    >
                      {`+ ${selectedValues.length - maxCount} 더보기`}
                      <XCircle
                        data-cid="XCircle-kndb88"
                        className="ml-2 h-4 w-4 cursor-pointer"
                        onClick={(event) => {
                          event.stopPropagation();
                          clearExtraOptions();
                        }}
                      />
                    </Badge>
                  )}
                </div>
                <div data-cid="div-VQnNrh" className="flex items-center justify-between">
                  <XIcon
                    data-cid="XIcon-2RbT31"
                    className="mx-2 h-4 cursor-pointer text-muted-foreground"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleClear();
                    }}
                  />
                  <Separator
                    data-cid="Separator-UfsKAy"
                    orientation="vertical"
                    className="flex h-full min-h-6"
                  />
                  <ChevronDown
                    data-cid="ChevronDown-2vFbcm"
                    className="mx-2 h-4 cursor-pointer text-muted-foreground"
                  />
                </div>
              </div>
            ) : (
              <div
                data-cid="div-MrzfoB"
                className="mx-auto flex w-full items-center justify-between"
              >
                <span data-cid="span-JmZwsP" className="mx-3 text-sm text-muted-foreground">
                  {placeholder}
                </span>
                <ChevronDown
                  data-cid="ChevronDown-kHB4Gp"
                  className="mx-2 h-4 cursor-pointer text-muted-foreground"
                />
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          data-cid="PopoverContent-1Hac99"
          className="w-auto p-0"
          align="start"
          onEscapeKeyDown={() => setIsPopoverOpen(false)}
        >
          <Command data-cid="Command-AA83hw">
            <CommandInput
              data-cid="CommandInput-EUhRwH"
              placeholder="카테고리 검색"
              onKeyDown={handleInputKeyDown}
            />
            <CommandList data-cid="CommandList-M1rkvu">
              <CommandEmpty data-cid="CommandEmpty-2ybgZR">결과가 없습니다.</CommandEmpty>
              <CommandGroup data-cid="CommandGroup-REq4AO">
                <CommandItem
                  data-cid="CommandItem-rMXYKi"
                  key="all"
                  onSelect={toggleAll}
                  className="cursor-pointer"
                >
                  <div
                    data-cid="div-CQA6OD"
                    className={cn(
                      'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                      selectedValues.length === options.length
                        ? 'bg-primary text-primary-foreground'
                        : 'opacity-50 [&_svg]:invisible'
                    )}
                  >
                    <CheckIcon data-cid="CheckIcon-cCB4Kd" className="h-4 w-4" />
                  </div>
                  <span data-cid="span-PqQr4z">(전체 선택)</span>
                </CommandItem>
                {options.map((option) => {
                  const isSelected = selectedValues.includes(option.value);
                  return (
                    <CommandItem
                      data-cid="CommandItem-QpGF1X"
                      key={option.value}
                      onSelect={() => toggleOption(option.value)}
                      className="cursor-pointer"
                    >
                      <div
                        data-cid="div-ca8qLf"
                        className={cn(
                          'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                          isSelected
                            ? 'bg-primary text-primary-foreground'
                            : 'opacity-50 [&_svg]:invisible'
                        )}
                      >
                        <CheckIcon data-cid="CheckIcon-ldbNSh" className="h-4 w-4" />
                      </div>
                      {option.icon && (
                        <option.icon
                          data-cid="element-q9o7OQ"
                          className="mr-2 h-4 w-4 text-muted-foreground"
                        />
                      )}
                      <span data-cid="span-tYLM5c">{option.label}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              <CommandSeparator data-cid="CommandSeparator-JfSOZI" />
              <CommandGroup data-cid="CommandGroup-tXEnKq">
                <div data-cid="div-f36h7y" className="flex items-center justify-between">
                  {selectedValues.length > 0 && (
                    <>
                      <CommandItem
                        data-cid="CommandItem-6Z7t5T"
                        onSelect={handleClear}
                        className="flex-1 cursor-pointer justify-center"
                      >
                        모두 해제
                      </CommandItem>
                      <Separator
                        data-cid="Separator-5ANRYi"
                        orientation="vertical"
                        className="flex h-full min-h-6"
                      />
                    </>
                  )}
                  <CommandItem
                    data-cid="CommandItem-vhAVr8"
                    onSelect={() => setIsPopoverOpen(false)}
                    className="max-w-full flex-1 cursor-pointer justify-center"
                  >
                    닫기
                  </CommandItem>
                </div>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);

MultiSelect.displayName = 'MultiSelect';
