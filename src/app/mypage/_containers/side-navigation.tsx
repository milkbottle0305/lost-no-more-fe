import type { SectionType } from '@/shared/types/section';
import { Card, CardContent } from '@/shared/ui/card';
import { Bell, ChevronRight, CircleHelp, MapPin } from 'lucide-react';

interface menuItems {
  id: SectionType;
  label: string;
  icon: React.ReactNode;
}

const menuItems = [
  {
    id: 'losts',
    label: '관심 분실물',
    icon: (
      <CircleHelp
        data-cid="CircleHelp-TKcWWq"
        className="h-4 w-4"
      />
    ),
  },
  {
    id: 'notifications',
    label: '알림 설정',
    icon: (
      <Bell
        data-cid="Bell-X3GNYi"
        className="h-4 w-4"
      />
    ),
  },
  {
    id: 'locations',
    label: '내 위치 설정',
    icon: (
      <MapPin
        data-cid="MapPin-ECBgKn"
        className="h-4 w-4"
      />
    ),
  },
];

interface SideNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const SideNavigation = ({ activeSection, onSectionChange }: SideNavigationProps) => {
  return (
    <Card data-cid="Card-aCpuQp">
      <CardContent
        data-cid="CardContent-4YWBZ3"
        className="p-3"
      >
        {menuItems.map((item) => (
          <button
            data-cid="button-rZ2Fk2"
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`mb-1 flex w-full items-center justify-between rounded-lg p-3 text-base hover:bg-primary/5 ${
              activeSection === item.id ? 'bg-primary/5 text-primary' : ''
            }`}
          >
            <div
              data-cid="div-4Tp9ps"
              className="flex items-center gap-2"
            >
              {item.icon}
              <span data-cid="span-gMWpTW">{item.label}</span>
            </div>
            <ChevronRight
              data-cid="ChevronRight-LURRPB"
              className="h-4 w-4"
            />
          </button>
        ))}
      </CardContent>
    </Card>
  );
};
