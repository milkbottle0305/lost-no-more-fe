'use client';

import React from 'react';

import { KeywordListContainer } from '@/app/mypage/_containers/keyword-list-container';
import KeywordInput from '@/domain/notification/components/keyword-input';
import KeywordSettings from '@/domain/notification/components/keyword-settings';
import { useKeywordManagement } from '@/domain/notification/hooks/useKeyword';
import { useNotificationSettings } from '@/domain/notification/hooks/useNotificationSettings';
import type { KeywordItem } from '@/domain/notification/types/keyword';
import CustomSwitch from '@/shared/components/custom-switch';
import { Button } from '@/shared/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';

interface NotificationProps {
  keywords: KeywordItem[];
  selectedKeyword: KeywordItem | null;
  isSettingsVisible: boolean;
  isLoading: boolean;
  addKeyword: (keyword: string) => void;
  removeKeyword: (id: string) => void;
  handleSettingsClick: (keyword: KeywordItem) => void;
  handleBackClick: () => void;
  updateKeyword: (keywordId: string, updatedKeyword: Omit<KeywordItem, 'id'>) => void;
  emailNotification: boolean;
  setEmailNotification: (value: boolean) => void;
}

const MobileNotificationsLayout = ({
  keywords,
  selectedKeyword,
  isSettingsVisible,
  isLoading,
  addKeyword,
  removeKeyword,
  handleSettingsClick,
  handleBackClick,
  updateKeyword,
  emailNotification,
  setEmailNotification,
}: NotificationProps) => (
  <div
    data-cid="mobile-notifications-layout"
    className="block sm:hidden space-y-4"
  >
    <Tabs
      data-cid="Tabs-YkpH7k-mobile"
      defaultValue="keyword"
      className="w-full"
    >
      <TabsList
        data-cid="TabsList-3PGQUw-mobile"
        className="w-full rounded-none border-b bg-transparent p-0"
      >
        <TabsTrigger
          data-cid="TabsTrigger-X1PBqZ-mobile"
          value="keyword"
          className="h-8 flex-1 rounded-none border-b-2 border-b-transparent bg-transparent pb-3 pt-2 text-sm font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-2 data-[state=active]:border-b-primary data-[state=active]:text-primary data-[state=active]:shadow-none"
        >
          키워드
        </TabsTrigger>
        <TabsTrigger
          data-cid="TabsTrigger-owi9HX-mobile"
          value="reception"
          className="h-8 flex-1 rounded-none border-b-2 border-b-transparent bg-transparent pb-3 pt-2 text-sm font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-2 data-[state=active]:border-b-primary data-[state=active]:text-primary data-[state=active]:shadow-none"
        >
          수신
        </TabsTrigger>
      </TabsList>
      <TabsContent
        data-cid="TabsContent-XSg5rM-mobile"
        value="keyword"
        className="relative min-h-[300px] overflow-hidden px-2"
      >
        <div
          data-cid="div-ItWAgd-mobile"
          className={`absolute flex h-full w-[200%] transform transition-transform duration-300 ease-in-out ${
            isSettingsVisible ? '-translate-x-1/2' : 'translate-x-0'
          }`}
        >
          <div
            data-cid="div-g7fCLT-mobile"
            className="w-full py-4"
          >
            <div
              data-cid="mobile-keyword-header"
              className="space-y-3 mb-4"
            >
              <h3
                data-cid="mobile-keyword-title"
                className="text-lg font-semibold"
              >
                키워드 알림 설정
              </h3>
              <p
                data-cid="mobile-keyword-description"
                className="text-sm text-muted-foreground"
              >
                분실물 알림을 받을 키워드를 설정합니다.
              </p>
            </div>

            <KeywordInput
              data-cid="KeywordInput-MFRnLi-mobile"
              addKeyword={addKeyword}
            />

            <KeywordListContainer
              data-cid="KeywordListDataContainer-c4fqbT-mobile"
              isLoading={isLoading}
              keywords={keywords}
              removeKeyword={removeKeyword}
              handleSettingsClick={handleSettingsClick}
            />
          </div>
          <div
            data-cid="div-74guDL-mobile"
            className="w-full py-4"
          >
            {selectedKeyword && (
              <KeywordSettings
                data-cid="KeywordSettings-IJ1OJq-mobile"
                keyword={selectedKeyword}
                onBackClick={handleBackClick}
                updateKeyword={updateKeyword}
              />
            )}
          </div>
        </div>
      </TabsContent>
      <TabsContent
        data-cid="TabsContent-cFdJ5S-mobile"
        value="reception"
        className="space-y-4 px-2 py-4"
      >
        <div
          data-cid="mobile-reception-header"
          className="space-y-3 mb-4"
        >
          <h3
            data-cid="mobile-reception-title"
            className="text-lg font-semibold"
          >
            알림 수신 설정
          </h3>
          <p
            data-cid="mobile-reception-description"
            className="text-sm text-muted-foreground"
          >
            알림을 수신할 채널을 설정합니다.
          </p>
        </div>
        <CustomSwitch
          data-cid="CustomSwitch-3Eqo57-mobile"
          title="이메일 알림"
          description="키워드 등록한 분실물 발견 시 이메일로 알림"
          checked={emailNotification}
          onCheckedChange={setEmailNotification}
        />
        <Button
          data-cid="Button-82ilKL-mobile"
          className="mt-6 w-full"
          type="button"
        >
          알림 설정
        </Button>
      </TabsContent>
    </Tabs>
  </div>
);

const DesktopNotificationsLayout = ({
  keywords,
  selectedKeyword,
  isSettingsVisible,
  isLoading,
  addKeyword,
  removeKeyword,
  handleSettingsClick,
  handleBackClick,
  updateKeyword,
  emailNotification,
  setEmailNotification,
}: NotificationProps) => (
  <Card
    data-cid="Card-cL27dV"
    className="hidden sm:block w-full"
  >
    <CardContent
      data-cid="CardContent-HBW4Ie"
      className="space-y-4 sm:space-y-6 p-4 sm:p-6"
    >
      <Tabs
        data-cid="Tabs-YkpH7k"
        defaultValue="keyword"
        className="w-full"
      >
        <TabsList
          data-cid="TabsList-3PGQUw"
          className="w-full rounded-none border-b bg-transparent p-0"
        >
          <TabsTrigger
            data-cid="TabsTrigger-X1PBqZ"
            value="keyword"
            className="h-8 sm:h-9 flex-1 rounded-none border-b-2 border-b-transparent bg-transparent pb-3 sm:pb-5 pt-2 text-sm sm:text-base font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-2 data-[state=active]:border-b-primary data-[state=active]:text-primary data-[state=active]:shadow-none"
          >
            키워드
          </TabsTrigger>
          <TabsTrigger
            data-cid="TabsTrigger-owi9HX"
            value="reception"
            className="h-8 sm:h-9 flex-1 rounded-none border-b-2 border-b-transparent bg-transparent pb-3 sm:pb-5 pt-2 text-sm sm:text-base font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-2 data-[state=active]:border-b-primary data-[state=active]:text-primary data-[state=active]:shadow-none"
          >
            수신
          </TabsTrigger>
        </TabsList>
        <TabsContent
          data-cid="TabsContent-XSg5rM"
          value="keyword"
          className="relative min-h-[300px] sm:min-h-[480px] overflow-hidden px-1 sm:px-2"
        >
          <div
            data-cid="div-ItWAgd"
            className={`absolute flex h-full w-[200%] transform transition-transform duration-300 ease-in-out ${
              isSettingsVisible ? '-translate-x-1/2' : 'translate-x-0'
            }`}
          >
            <div
              data-cid="div-g7fCLT"
              className="w-full p-6"
            >
              <CardHeader
                data-cid="CardHeader-UgLN3q"
                className="p-0"
              >
                <CardTitle
                  data-cid="CardTitle-HhxDKh"
                  className="text-xl"
                >
                  키워드 알림 설정
                </CardTitle>
                <CardDescription
                  data-cid="CardDescription-0hTxrh"
                  className="text-muted-foreground"
                >
                  분실물 알림을 받을 키워드를 설정합니다.
                </CardDescription>
              </CardHeader>

              <KeywordInput
                data-cid="KeywordInput-MFRnLi"
                addKeyword={addKeyword}
              />

              <KeywordListContainer
                data-cid="KeywordListDataContainer-c4fqbT"
                isLoading={isLoading}
                keywords={keywords}
                removeKeyword={removeKeyword}
                handleSettingsClick={handleSettingsClick}
              />
            </div>
            <div
              data-cid="div-74guDL"
              className="w-full p-6"
            >
              {selectedKeyword && (
                <KeywordSettings
                  data-cid="KeywordSettings-IJ1OJq"
                  keyword={selectedKeyword}
                  onBackClick={handleBackClick}
                  updateKeyword={updateKeyword}
                />
              )}
            </div>
          </div>
        </TabsContent>
        <TabsContent
          data-cid="TabsContent-cFdJ5S"
          value="reception"
          className="space-y-4 px-8 py-6"
        >
          <CardHeader
            data-cid="CardHeader-ZRRuUS"
            className="p-0"
          >
            <CardTitle
              data-cid="CardTitle-4qfjPK"
              className="text-xl"
            >
              알림 수신 설정
            </CardTitle>
            <CardDescription
              data-cid="CardDescription-XMnx3s"
              className="text-muted-foreground"
            >
              알림을 수신할 채널을 설정합니다.
            </CardDescription>
          </CardHeader>
          <CustomSwitch
            data-cid="CustomSwitch-3Eqo57"
            title="이메일 알림"
            description="키워드 등록한 분실물 발견 시 이메일로 알림"
            checked={emailNotification}
            onCheckedChange={setEmailNotification}
          />
          <CardFooter
            data-cid="CardFooter-6SyXpZ"
            className="p-0"
          >
            <Button
              data-cid="Button-82ilKL"
              className="mt-6 w-full"
              type="button"
            >
              알림 설정
            </Button>
          </CardFooter>
        </TabsContent>
      </Tabs>
    </CardContent>
  </Card>
);

export const NotificationsSection = () => {
  const {
    keywords,
    selectedKeyword,
    isSettingsVisible,
    isLoading,
    addKeyword,
    removeKeyword,
    handleSettingsClick,
    handleBackClick,
    updateKeyword,
  } = useKeywordManagement();

  const { emailNotification, setEmailNotification } = useNotificationSettings();

  const commonProps: NotificationProps = {
    keywords,
    selectedKeyword,
    isSettingsVisible,
    isLoading,
    addKeyword,
    removeKeyword,
    handleSettingsClick,
    handleBackClick,
    updateKeyword,
    emailNotification,
    setEmailNotification,
  };

  return (
    <div data-cid="notifications-section-wrapper">
      <MobileNotificationsLayout
        data-cid="mobile-notifications"
        {...commonProps}
      />
      <DesktopNotificationsLayout
        data-cid="desktop-notifications"
        {...commonProps}
      />
    </div>
  );
};
