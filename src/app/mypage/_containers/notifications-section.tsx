'use client';

import React, { useState } from 'react';

import KeywordInput from '@/domain/notification/components/keyword-input';
import KeywordList from '@/domain/notification/components/keyword-list';
import KeywordSettings from '@/domain/notification/components/keyword-settings';
import CustomSwitch from '@/shared/components/custom-switch';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { Button } from '@/shared/ui/button';

export const NotificationsSection = () => {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [emailNotification, setEmailNotification] = useState(false);

  const addKeyword = (keyword: string) => {
    if (keyword && !keywords.includes(keyword)) {
      setKeywords([...keywords, keyword]);
    }
  };

  const removeKeyword = (removeKeyword: string) => {
    setKeywords(keywords.filter((kw) => kw !== removeKeyword));
  };

  const handleSettingsClick = (keyword: string) => {
    setSelectedKeyword(keyword);
    setIsSettingsVisible(true);
  };

  const handleBackClick = () => {
    setIsSettingsVisible(false);
    setSelectedKeyword(null);
  };

  const updateKeyword = (oldKeyword: string, newKeyword: string) => {
    setKeywords(keywords.map((kw) => (kw === oldKeyword ? newKeyword : kw)));
    setSelectedKeyword(newKeyword);
  };

  return (
    <Card data-cid="Card-cL27dV">
      <CardContent
        data-cid="CardContent-HBW4Ie"
        className="space-y-6 p-0"
      >
        <Tabs
          data-cid="Tabs-YkpH7k"
          defaultValue="keyword"
          className="w-full pt-5"
        >
          <TabsList
            data-cid="TabsList-3PGQUw"
            className="w-full rounded-none border-b bg-transparent p-0"
          >
            <TabsTrigger
              data-cid="TabsTrigger-X1PBqZ"
              value="keyword"
              className="h-9 flex-1 rounded-none border-b-2 border-b-transparent bg-transparent pb-5 pt-2 text-base font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-2 data-[state=active]:border-b-primary data-[state=active]:text-primary data-[state=active]:shadow-none"
            >
              키워드
            </TabsTrigger>
            <TabsTrigger
              data-cid="TabsTrigger-owi9HX"
              value="reception"
              className="h-9 flex-1 rounded-none border-b-2 border-b-transparent bg-transparent pb-5 pt-2 text-base font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-2 data-[state=active]:border-b-primary data-[state=active]:text-primary data-[state=active]:shadow-none"
            >
              수신
            </TabsTrigger>
          </TabsList>
          <TabsContent
            data-cid="TabsContent-XSg5rM"
            value="keyword"
            className="relative min-h-[480px] overflow-hidden px-2"
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
                <KeywordList
                  data-cid="KeywordList-mjaArg"
                  keywords={keywords}
                  removeKeyword={removeKeyword}
                  onSettingsClick={handleSettingsClick}
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
};
