import type { ReactNode } from 'react';

import CategoryCard from '@/domain/lost-item/components/category-card';
import LostCard from '@/domain/lost-item/components/lost-card';
import { getItemsCount } from '@/domain/lost-item/queries/getItemsCount';
import type { LostCategory } from '@/shared/types/lost-property';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/ui/carousel';
import { MoveRightIcon, PackageIcon } from 'lucide-react';

function CategoryCards() {
  const names: LostCategory[] = ['전자기기', '지갑', '가방', '의류', '휴대폰', '현금'];
  const categries: { name: LostCategory; icon: () => ReactNode }[] = names.map((name) => ({
    name,
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
      data-cid="div-aymX7X"
      className="grid grid-cols-3 gap-x-10 gap-y-2.5"
    >
      {categries.map((category) => (
        <CategoryCard
          data-cid="CategoryCard-4ApOtE"
          key={category.name}
          slots={{ icon: category.icon }}
          cateogry={category.name}
        />
      ))}
    </div>
  );
}

async function CountCards() {
  const data = await getItemsCount();
  return (
    <div
      data-cid="div-691SVA"
      className="flex justify-between gap-24"
    >
      <div
        data-cid="div-wMCIBK"
        className="flex w-full flex-col items-center justify-center rounded-2xl py-4 shadow-lg"
      >
        <p
          data-cid="p-WJ9ETQ"
          className="mb-2 text-4xl font-bold text-primary"
        >
          {data.data.today.toLocaleString()}
        </p>
        <p
          data-cid="p-B4pETk"
          className="text-base text-muted-foreground"
        >
          금일 등록 분실물
        </p>
      </div>

      <div
        data-cid="div-wMCIBK"
        className="flex w-full flex-col items-center justify-center rounded-2xl py-4 shadow-lg"
      >
        <p
          data-cid="p-WJ9ETQ"
          className="mb-2 text-4xl font-bold text-primary"
        >
          {data.data.total.toLocaleString()}
        </p>
        <p
          data-cid="p-B4pETk"
          className="text-base text-muted-foreground"
        >
          전체 등록 분실물
        </p>
      </div>
    </div>
  );
}

export default function MainpageContent() {
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
          <CountCards data-cid="CountCards-bmQEbY" />
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
            <CategoryCards data-cid="CategoryCards-2M4vRt" />
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
                      id={index}
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
