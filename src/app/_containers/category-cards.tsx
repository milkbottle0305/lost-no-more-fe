'use client';

import type { ReactNode } from 'react';

import { useRouter } from 'next/navigation';

import CategoryCard from '@/domain/lost-item/components/category-card';
import useSearchStore from '@/domain/search/stores/search-store';
import type { LostCategory } from '@/shared/types/lost-property';
import { PackageIcon } from 'lucide-react';

export default function CategoryCards() {
  const updateCategory = useSearchStore((state) => state.updateCategory);
  const router = useRouter();

  const names: LostCategory[] = ['전자기기', '지갑', '가방', '의류', '휴대폰', '현금'];
  const categries: { name: LostCategory; icon: () => ReactNode; onClick: () => void }[] = names.map(
    (name) => ({
      name,
      icon: () => (
        <PackageIcon
          data-cid="PackageIcon-AV6Xx7"
          size={32}
          color="hsl(var(--primary))"
        />
      ),
      onClick: () => {
        updateCategory(name);
        router.push('/search');
      },
    })
  );

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
          category={category.name}
          onClick={category.onClick}
        />
      ))}
    </div>
  );
}
