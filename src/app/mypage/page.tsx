'use client';

import type { JSX } from 'react';
import React, { useState } from 'react';

import { WithdrawButton } from '@/domain/auth/components/withdraw-button';
import Headerbar from '@/shared/components/headerbar';
import { SwitchCase } from '@/shared/components/switch-case';
import type { SectionType } from '@/shared/types/section';

import { LocationsSection } from './_containers/location-section';
import { LostItemsSection } from './_containers/lost-items-section';
import { NotificationsSection } from './_containers/notifications-section';
import { SideNavigation } from './_containers/side-navigation';

export default function MyPage() {
  const [activeSection, setActiveSection] = useState<SectionType>('losts');

  const sectionCases: Partial<Record<SectionType, JSX.Element>> = {
    losts: <LostItemsSection data-cid="LostItemsSection-d03Fo1" />,
    notifications: <NotificationsSection data-cid="NotificationsSection-FrCmMQ" />,
    locations: <LocationsSection data-cid="LocationsSection-ok3u42" />,
  };

  return (
    <div
      data-cid="div-E0B1FK"
      className="min-h-screen bg-gray-50"
    >
      <Headerbar data-cid="Headerbar-WDxQ34" />
      <div
        data-cid="div-4VgePc"
        className="container mx-auto py-8"
      >
        <h1
          data-cid="h1-S1iqHU"
          className="text-2xl font-bold"
        >
          마이페이지
        </h1>
      </div>
      <div
        data-cid="div-SzyRji"
        className="container mx-auto flex gap-6"
      >
        <div
          data-cid="div-CuMShQ"
          className="w-64 shrink-0 aria-hidden={false}"
        >
          <SideNavigation
            data-cid="SideNavigation-ANQqHh"
            activeSection={activeSection}
            onSectionChange={(section: string) => setActiveSection(section as SectionType)}
          />
          <div
            data-cid="div-j7PhSo"
            className="mt-4 w-full justify-center flex"
          >
            <WithdrawButton data-cid="WithdrawButton-1wL7jw" />
          </div>
        </div>
        <div
          data-cid="div-epqpvX"
          className="flex-1"
        >
          <SwitchCase
            data-cid="SwitchCase-ePIaQv"
            value={activeSection}
            caseBy={sectionCases}
          />
        </div>
      </div>
    </div>
  );
}
