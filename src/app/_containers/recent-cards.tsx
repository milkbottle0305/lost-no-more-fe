'use client';

import { useRouter } from 'next/navigation';

import { useAuth } from '@/domain/auth/hooks/useAuth';
import useLoginPopupStore from '@/domain/auth/stores/login-popup-store';
import LostCard from '@/domain/lost-item/components/lost-card';
import { useItemsRecentQuery } from '@/domain/lost-item/queries/useItemsRecentQuery';
import { Button } from '@/shared/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/ui/carousel';
import { MoveRightIcon } from 'lucide-react';

function LoginRecentCards() {
  const { data } = useItemsRecentQuery();
  const recentItems = data?.data.recentItems;

  return (
    <>
      {recentItems && recentItems.length > 0 ? (
        <Carousel
          data-cid="Carousel-YioP14"
          className="w-full"
        >
          <CarouselContent data-cid="CarouselContent-gI4pdQ">
            {recentItems.map((item) => (
              <CarouselItem
                data-cid="CarouselItem-sbMufa"
                key={item.lostItemId}
                className="basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <LostCard
                  data-cid="LostCard-glOAzq"
                  id={item.lostItemId}
                  name={item.name}
                  image={item.imageUrl}
                  category={item.category}
                  location={item.location}
                  acquisitionDate={item.date}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious data-cid="CarouselPrevious-3Mty6g" />
          <CarouselNext data-cid="CarouselNext-igW4kh" />
        </Carousel>
      ) : (
        <LoginNoRecentCards data-cid="LoginNoRecentCards-C1UZ8E" />
      )}
    </>
  );
}

function LoginNoRecentCards() {
  const router = useRouter();
  const goToNotification = () => {
    router.push('/mypage');
  };
  return (
    <BlurredCarousel
      data-cid="BlurredCarousel-1bJ9Zb"
      description="알림을 설정해서 새로운 분실물을 놓치지 마세요!"
      onClick={goToNotification}
    />
  );
}

function NoLoginRecentCards() {
  const openPopup = useLoginPopupStore((state) => state.openPopup);
  return (
    <BlurredCarousel
      data-cid="BlurredCarousel-kd0WrW"
      description="로그인 후 관심 분실물을 확인해보세요!"
      onClick={openPopup}
    />
  );
}

function NotLoadingRecentCards() {
  return (
    <BlurredCarousel
      data-cid="BlurredCarousel-EfaAGl"
      isDescriptionInvisible
    />
  );
}

function BlurredCarousel({
  description,
  onClick,
  isDescriptionInvisible,
}: {
  description?: string;
  onClick?: () => void;
  isDescriptionInvisible?: boolean;
}) {
  return (
    <div
      data-cid="div-jOUH2q"
      className="relative"
    >
      {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text*/}
      <img
        data-cid="img-zQLdT4"
        src="/images/blurred-carousel.png"
        className="w-full h-[200px] sm:h-[240px] lg:h-[275.63px] rounded-xl filter blur-sm"
      />
      {isDescriptionInvisible ? null : (
        <Button
          data-cid="p-ut3jtu"
          onClick={onClick}
          className="bg-foreground rounded-md py-1 px-2 text-sm sm:text-base lg:text-lg text-background font-extrabold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          {description}
        </Button>
      )}
    </div>
  );
}

export default function RecentCards() {
  const { isLoggedIn, isLoadingAuth } = useAuth();
  const router = useRouter();
  const openPopup = useLoginPopupStore((state) => state.openPopup);

  return (
    <div
      data-cid="div-gfl5wS"
      className="flex flex-col gap-4 sm:gap-5 lg:gap-6"
    >
      <div
        data-cid="div-aZhqrg"
        className="flex items-center justify-between"
      >
        <p
          data-cid="p-1P8CbO"
          className="text-lg sm:text-xl font-extrabold text-foreground"
        >
          새로 등록된 관심 분실물
        </p>
        <div
          data-cid="div-bN99AZ"
          className="flex cursor-pointer items-center gap-1"
          onClick={isLoggedIn ? () => router.push('/mypage') : openPopup}
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
      {isLoadingAuth ? (
        <NotLoadingRecentCards data-cid="NotLoadingRecentCards-TRZHjt" />
      ) : isLoggedIn ? (
        <LoginRecentCards data-cid="LoginRecentCards-aGH8bp" />
      ) : (
        <NoLoginRecentCards data-cid="NoLoginRecentCards-ZJ5DCq" />
      )}
    </div>
  );
}
