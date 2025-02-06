import { Clock10Icon, MapPinIcon } from 'lucide-react';
import Image from 'next/image';

interface LostCardProps {
  name: string;
  image: string;
  category: string;
  location: string;
  acquisitionDate: string;
}

export default function LostCard({
  name,
  image,
  category,
  location,
  acquisitionDate,
}: LostCardProps) {
  return (
    <div className="relative box-content flex w-[270px] cursor-pointer flex-col overflow-hidden rounded-xl border-2 border-solid border-border">
      <div className="absolute right-3 top-3 rounded-md bg-foreground px-2.5 py-1.5 text-xs font-semibold text-background">
        {category}
      </div>
      <div className="relative h-[165px] w-[270px]">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
      <div className="flex flex-col border-t-2 border-solid border-border bg-background p-3">
        <h1 className="mb-3 text-2xl font-extrabold text-foreground">{name}</h1>
        <div className="mb-1 flex items-center gap-2">
          <MapPinIcon size={16} color="hsl(var(--muted-foreground))" />
          <p className="text-base text-muted-foreground">{location}</p>
        </div>
        <div className="flex items-center gap-2">
          <Clock10Icon size={16} color="hsl(var(--muted-foreground))" />
          <p className="text-base text-muted-foreground">습득일자: {acquisitionDate}</p>
        </div>
      </div>
    </div>
  );
}
