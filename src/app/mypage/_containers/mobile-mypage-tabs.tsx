'use client';

import type { SectionType } from '@/shared/types/section';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { Bell, CircleHelp } from 'lucide-react';

import { LocationsSection } from './location-section';
import { LostItemsSection } from './lost-items-section-new';
import { NotificationsSection } from './notifications-section';

const tabItems = [
  {
    id: 'losts' as SectionType,
    label: '관심 분실물',
    icon: (
      <CircleHelp
        data-cid="CircleHelp-tab"
        className="h-4 w-4"
      />
    ),
    component: <LostItemsSection data-cid="LostItemsSection-tab" />,
  },
  {
    id: 'notifications' as SectionType,
    label: '알림 설정',
    icon: (
      <Bell
        data-cid="Bell-tab"
        className="h-4 w-4"
      />
    ),
    component: <NotificationsSection data-cid="NotificationsSection-tab" />,
  },
  {
    id: 'locations' as SectionType,
    label: '지역 설정',
    icon: (
      <CircleHelp
        data-cid="CircleHelp-locations"
        className="h-4 w-4"
      />
    ),
    component: <LocationsSection data-cid="LocationsSection-tab" />,
  },
];

interface MobileMyPageTabsProps {
  activeSection: SectionType;
  onSectionChange: (section: SectionType) => void;
}

export function MobileMyPageTabs({ activeSection, onSectionChange }: MobileMyPageTabsProps) {
  return (
    <div
      data-cid="div-mobile-tabs"
      className="lg:hidden w-full"
    >
      <Tabs
        data-cid="tabs-mobile-mypage"
        value={activeSection}
        onValueChange={(value) => onSectionChange(value as SectionType)}
        className="w-full"
      >
        <TabsList
          data-cid="tabs-list-mobile"
          className="grid w-full grid-cols-3 mb-6"
        >
          {tabItems.map((item) => (
            <TabsTrigger
              data-cid={`tab-trigger-${item.id}`}
              key={item.id}
              value={item.id}
              className="flex items-center gap-1 text-xs sm:text-sm"
            >
              <span
                data-cid="span-icon"
                className="hidden sm:block"
              >
                {item.icon}
              </span>
              <span data-cid="span-label">{item.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {tabItems.map((item) => (
          <TabsContent
            data-cid={`tab-content-${item.id}`}
            key={item.id}
            value={item.id}
            className="mt-0"
          >
            {item.component}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
