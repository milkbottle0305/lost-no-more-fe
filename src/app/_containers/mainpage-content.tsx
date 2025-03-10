import { fetchItemsCount } from '@/domain/lost-item/queries/fetchItemsCount';

import CategoryCards from './category-cards';
import RecentCards from './recent-cards';

async function CountCards() {
  const { data } = await fetchItemsCount();
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
          {data.today.toLocaleString()}
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
          {data.total.toLocaleString()}
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
          <RecentCards data-cid="RecentCards-1Z6Z9w" />
        </div>
      </div>
    </div>
  );
}
