import { MoveRightIcon, PackageIcon } from 'lucide-react';
import NumberCard from './number-card';
import CategoryCard from './category-card';
import { ReactNode } from 'react';
import LostCard from '../common/lost-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';

export default function MainpageContent() {
  const categries: {
    name: string;
    icon: () => ReactNode;
  }[] = Array.from({ length: 6 }, () => ({
    name: '전자기기',
    icon: () => <PackageIcon size={32} color="hsl(var(--primary))" />,
  }));

  return (
    <div className="relative h-8 w-full bg-primary">
      <div className="absolute flex w-full justify-center gap-8 rounded-t-[2rem] bg-background py-10">
        <div className="flex w-[890px] flex-col gap-10">
          <div className="flex justify-between gap-24">
            <NumberCard number={123} description="금일 등록된 분실물" />
            <NumberCard number={23456} description="전체 등록된 분실물" />
          </div>
          <div className="flex flex-col gap-6">
            <p className="text-xl font-extrabold text-foreground">카테고리</p>
            <div className="grid grid-cols-3 gap-x-10 gap-y-2.5">
              {categries.map((category, index) => (
                <CategoryCard
                  key={index}
                  slots={{ icon: category.icon }}
                  cateogry={category.name}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <p className="text-xl font-extrabold text-foreground">새로 등록된 관심 분실물</p>
              <div className="flex cursor-pointer items-center gap-1">
                <p className="text-base text-muted-foreground">전체보기</p>
                <MoveRightIcon size={16} color="hsl(var(--muted-foreground))" />
              </div>
            </div>
            <Carousel className="w-full">
              <CarouselContent>
                {Array.from({ length: 9 }).map((_, index) => (
                  <CarouselItem key={index} className="basis-1/3">
                    <LostCard
                      name="습득물 1"
                      image={'https://sitem.ssgcdn.com/26/64/85/item/1000277856426_i1_750.jpg'}
                      category={'지갑'}
                      location={'부산광역시'}
                      acquisitionDate={'2024. 12. 31'}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}
