'use client';

import React, { JSX, useState } from 'react';
import Headerbar from '@/components/common/headerbar';
import { SideNavigation } from '@/components/mypage/side-navigation';
import { LostItemsSection } from '@/components/mypage/lost-items-section';
import { NotificationsSection } from '@/components/mypage/notifications-section';
import { LocationsSection } from '@/components/mypage/location-section';
import { SwitchCase } from '@/components/common/switch-case';
import { SectionType } from '@/types/section';

export default function MyPage() {
  const [activeSection, setActiveSection] = useState<SectionType>('losts');

  const sectionCases: Partial<Record<SectionType, JSX.Element>> = {
    losts: <LostItemsSection data-cid="LostItemsSection-d03Fo1" />,
    notifications: <NotificationsSection data-cid="NotificationsSection-FrCmMQ" />,
    locations: <LocationsSection data-cid="LocationsSection-ok3u42" />,
  };

  return (
    <div data-cid="div-E0B1FK" className="min-h-screen bg-gray-50">
      <Headerbar data-cid="Headerbar-WDxQ34" />
      <div data-cid="div-4VgePc" className="container mx-auto py-8">
        <h1 data-cid="h1-S1iqHU" className="text-2xl font-bold">
          username님의 마이페이지
        </h1>
      </div>
      <div data-cid="div-SzyRji" className="container mx-auto flex gap-6">
        <div data-cid="div-CuMShQ" className="w-64 shrink-0">
          <SideNavigation
            data-cid="SideNavigation-ANQqHh"
            activeSection={activeSection}
            onSectionChange={(section: string) => setActiveSection(section as SectionType)}
          />
        </div>
        <div data-cid="div-epqpvX" className="flex-1">
          <SwitchCase data-cid="SwitchCase-ePIaQv" value={activeSection} caseBy={sectionCases} />
        </div>
      </div>
    </div>
  );
}
