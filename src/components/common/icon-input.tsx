import { Slots } from '@/types/slots';

import { cn } from '@/lib/utils';

interface IconSearchbarProps {
  className?: string;
  slots: Slots<'icon' | 'input'>;
}

export default function IconInput({ className, slots }: IconSearchbarProps) {
  return (
    <div
      data-cid="div-EwDs5a"
      className={cn('flex w-full items-center gap-4 rounded-xl bg-background px-5 py-3', className)}
    >
      {slots.icon && slots.icon()}
      {slots.input && slots.input()}
    </div>
  );
}
