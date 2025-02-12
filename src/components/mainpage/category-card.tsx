import { Slots } from '@/types/slots';

interface CategoryCardProps {
  slots: Slots<'icon'>;
  cateogry: string;
}

export default function CategoryCard({ slots, cateogry }: CategoryCardProps) {
  return (
    <div
      data-cid="div-vtDc2p"
      className="flex w-full flex-col items-center justify-center rounded-2xl py-4 shadow-lg"
    >
      {slots.icon && slots.icon()}
      <p data-cid="p-XSlzd9" className="mt-2 text-base text-foreground">
        {cateogry}
      </p>
    </div>
  );
}
