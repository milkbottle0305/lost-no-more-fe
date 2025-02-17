import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface CustomSwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  title: string;
  description?: string;
  className?: string;
  disabled?: boolean;
}

export default function CustomSwitch({
  checked,
  onCheckedChange,
  title,
  description,
  className,
  disabled = false,
}: CustomSwitchProps) {
  const id = `switch-${title.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div
      data-cid="div-OTrjVn"
      className={cn(
        'flex items-center justify-between rounded-lg border bg-card p-4 shadow-sm',
        className
      )}
    >
      <div data-cid="div-Gj7RSD" className="space-y-0.5">
        <Label data-cid="Label-YxL59i" htmlFor={id} className="text-lg font-semibold">
          {title}
        </Label>
        {description && (
          <p data-cid="p-9aLXTF" className="text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      <Switch
        data-cid="Switch-P3pujw"
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
      />
    </div>
  );
}
