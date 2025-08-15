import { LostLocations } from '@/shared/types/lost-property';
import { Button } from '@/shared/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';

const MobileLocationLayout = () => (
  <div
    data-cid="mobile-location-layout"
    className="block sm:hidden space-y-4"
  >
    <div
      data-cid="mobile-location-header"
      className="space-y-3 mb-4"
    >
      <h3
        data-cid="mobile-location-title"
        className="text-lg font-semibold"
      >
        내 위치 설정
      </h3>
      <p
        data-cid="mobile-location-description"
        className="text-sm text-muted-foreground"
      >
        검색 시 기본적으로 적용되는 위치를 설정합니다.
      </p>
    </div>
    <div
      data-cid="mobile-location-content"
      className="space-y-4"
    >
      <Select data-cid="Select-O1r3EL-mobile">
        <SelectTrigger
          data-cid="SelectTrigger-xsXus6-mobile"
          className="w-full"
        >
          <SelectValue
            data-cid="SelectValue-2wnYEw-mobile"
            placeholder="지역을 선택하세요."
          />
        </SelectTrigger>
        <SelectContent data-cid="SelectContent-sXAS2S-mobile">
          <SelectGroup data-cid="SelectGroup-G4fXz9-mobile">
            {LostLocations.map((loc) => (
              <SelectItem
                data-cid="SelectItem-DnlvOw-mobile"
                key={loc}
                value={loc}
              >
                {loc}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button
        data-cid="Button-kKxiKw-mobile"
        className="w-full"
      >
        내 위치 설정하기
      </Button>
    </div>
  </div>
);

const DesktopLocationLayout = () => (
  <Card
    data-cid="Card-anYMQV"
    className="hidden sm:block w-full"
  >
    <CardHeader
      data-cid="CardHeader-SOJO1V"
      className="px-4 sm:px-6 pt-4 sm:pt-6"
    >
      <CardTitle
        data-cid="CardTitle-4Buy47"
        className="text-lg sm:text-xl"
      >
        내 위치 설정
      </CardTitle>
      <CardDescription
        data-cid="CardDescription-V2I3IW"
        className="text-sm sm:text-base text-muted-foreground"
      >
        검색 시 기본적으로 적용되는 위치를 설정합니다.
      </CardDescription>
    </CardHeader>
    <CardContent
      data-cid="CardContent-PuJoCo"
      className="space-y-4 sm:space-y-6 px-4 sm:px-6"
    >
      <div
        data-cid="div-QYOSzS"
        className="mb-6"
      >
        <Select data-cid="Select-O1r3EL">
          <SelectTrigger
            data-cid="SelectTrigger-xsXus6"
            className="w-60"
          >
            <SelectValue
              data-cid="SelectValue-2wnYEw"
              placeholder="지역을 선택하세요."
            />
          </SelectTrigger>
          <SelectContent data-cid="SelectContent-sXAS2S">
            <SelectGroup data-cid="SelectGroup-G4fXz9">
              {LostLocations.map((loc) => (
                <SelectItem
                  data-cid="SelectItem-DnlvOw"
                  key={loc}
                  value={loc}
                >
                  {loc}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </CardContent>
    <CardFooter
      data-cid="CardFooter-xkfug1"
      className="px-4 sm:px-6 pb-4 sm:pb-6"
    >
      <Button
        data-cid="Button-kKxiKw"
        className="w-full h-9 sm:h-10"
      >
        내 위치 설정하기
      </Button>
    </CardFooter>
  </Card>
);

export const LocationsSection = () => {
  return (
    <div data-cid="locations-section-wrapper">
      <MobileLocationLayout data-cid="mobile-location" />
      <DesktopLocationLayout data-cid="desktop-location" />
    </div>
  );
};
