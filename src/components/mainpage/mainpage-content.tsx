import { ReactNode } from 'react';

import { MoveRightIcon, PackageIcon } from 'lucide-react';

import LostCard from '../common/lost-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';
import CategoryCard from './category-card';
import NumberCard from './number-card';

export default function MainpageContent() {
  const categries: {
    name: string;
    icon: () => ReactNode;
  }[] = Array.from({ length: 6 }, () => ({
    name: '전자기기',
    icon: () => (
      <PackageIcon
        data-cid="PackageIcon-AV6Xx7"
        size={32}
        color="hsl(var(--primary))"
      />
    ),
  }));

  return (
    <div
      data-cid="div-2eWLfz"
      className="relative h-8 w-full bg-primary"
    >
      <div
        data-cid="div-kdaNhi"
        className="absolute flex w-full justify-center gap-8 rounded-t-[2rem] bg-background py-10"
      >
        <div
          data-cid="div-6k6F59"
          className="flex w-[890px] flex-col gap-10"
        >
          <div
            data-cid="div-691SVA"
            className="flex justify-between gap-24"
          >
            <NumberCard
              data-cid="NumberCard-WczZui"
              number={123}
              description="금일 등록된 분실물"
            />
            <NumberCard
              data-cid="NumberCard-lIgmji"
              number={23456}
              description="전체 등록된 분실물"
            />
          </div>
          <div
            data-cid="div-DpMTE7"
            className="flex flex-col gap-6"
          >
            <p
              data-cid="p-pPeIPF"
              className="text-xl font-extrabold text-foreground"
            >
              카테고리
            </p>
            <div
              data-cid="div-aymX7X"
              className="grid grid-cols-3 gap-x-10 gap-y-2.5"
            >
              {categries.map((category, index) => (
                <CategoryCard
                  data-cid="CategoryCard-4ApOtE"
                  key={index}
                  slots={{ icon: category.icon }}
                  cateogry={category.name}
                />
              ))}
            </div>
          </div>
          <div
            data-cid="div-gfl5wS"
            className="flex flex-col gap-6"
          >
            <div
              data-cid="div-aZhqrg"
              className="flex items-center justify-between"
            >
              <p
                data-cid="p-1P8CbO"
                className="text-xl font-extrabold text-foreground"
              >
                새로 등록된 관심 분실물
              </p>
              <div
                data-cid="div-bN99AZ"
                className="flex cursor-pointer items-center gap-1"
              >
                <p
                  data-cid="p-JrF39w"
                  className="text-base text-muted-foreground"
                >
                  전체보기
                </p>
                <MoveRightIcon
                  data-cid="MoveRightIcon-3oZVgO"
                  size={16}
                  color="hsl(var(--muted-foreground))"
                />
              </div>
            </div>
            <Carousel
              data-cid="Carousel-YioP14"
              className="w-full"
            >
              <CarouselContent data-cid="CarouselContent-gI4pdQ">
                {Array.from({ length: 9 }).map((_, index) => (
                  <CarouselItem
                    data-cid="CarouselItem-sbMufa"
                    key={index}
                    className="basis-1/3"
                  >
                    <LostCard
                      data-cid="LostCard-glOAzq"
                      name="습득물 1"
                      image={'https://sitem.ssgcdn.com/26/64/85/item/1000277856426_i1_750.jpg'}
                      category={'지갑'}
                      location={'부산광역시'}
                      acquisitionDate={'2024. 12. 31'}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious data-cid="CarouselPrevious-3Mty6g" />
              <CarouselNext data-cid="CarouselNext-igW4kh" />
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}
