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
} from '@radix-ui/react-select';

export const LocationsSection = () => {
  return (
    <Card
      data-cid="Card-anYMQV"
      className="px-2"
    >
      <CardHeader data-cid="CardHeader-SOJO1V">
        <CardTitle
          data-cid="CardTitle-4Buy47"
          className="text-xl"
        >
          내 위치 설정
        </CardTitle>
        <CardDescription
          data-cid="CardDescription-V2I3IW"
          className="text-muted-foreground"
        >
          검색 시 기본적으로 적용되는 위치를 설정합니다.
        </CardDescription>
      </CardHeader>
      <CardContent
        data-cid="CardContent-PuJoCo"
        className="space-y-6"
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
      <CardFooter data-cid="CardFooter-xkfug1">
        <Button
          data-cid="Button-kKxiKw"
          className="w-full"
        >
          내 위치 설정하기
        </Button>
      </CardFooter>
    </Card>
  );
};
