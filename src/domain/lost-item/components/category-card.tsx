import type { LostCategory } from '@/shared/types/lost-property';
import type { Slots } from '@/shared/types/slots';

interface CategoryCardProps {
  slots: Slots<'icon'>;
  category: LostCategory;
  onClick: () => void;
}

export default function CategoryCard({ slots, category, onClick }: CategoryCardProps) {
  return (
    <div
      data-cid="div-vtDc2p"
      className="cursor-pointer flex w-full flex-col items-center justify-center rounded-2xl py-3 sm:py-4 shadow-lg hover:shadow-xl transition-shadow"
      onClick={onClick}
    >
      {slots.icon && slots.icon()}
      <p
        data-cid="p-XSlzd9"
        className="mt-1 sm:mt-2 text-sm sm:text-base text-foreground text-center"
      >
        {category}
      </p>
    </div>
  );
}
