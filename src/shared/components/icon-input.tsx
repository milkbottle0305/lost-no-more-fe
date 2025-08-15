import type { Slots } from '../types/slots';
import { cn } from '../utils/utils';

interface IconSearchbarProps {
  className?: string;
  slots: Slots<'icon' | 'input'>;
}

export default function IconInput({ className, slots }: IconSearchbarProps) {
  return (
    <div
      data-cid="div-EwDs5a"
      className={cn(
        'flex w-full items-center gap-2 sm:gap-3 lg:gap-4 rounded-xl bg-background px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 lg:py-3',
        className
      )}
    >
      {slots.icon && slots.icon()}
      {slots.input && slots.input()}
    </div>
  );
}
