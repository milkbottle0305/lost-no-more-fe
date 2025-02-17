export interface LostItem {
  id: string;
  name: string;
  image: string;
  category: string;
  location: string;
  acquisitionDate: string;
}

export interface DummyDataResponse {
  items: LostItem[];
  hasMore: boolean;
}

export type KeywordType = 'all' | 'airpods' | 'freitag' | 'football' | '';

export const generateDummyData = (keyword: KeywordType): LostItem[] => {
  const categories: Record<string, string> = {
    airpods: '에어팟',
    freitag: '프라이탁',
    football: '축구공',
  };

  const locations = ['서울특별시', '부산광역시', '대구광역시', '인천광역시', '광주광역시'];
  const totalItems = keyword === 'all' ? 100 : 45;

  if (keyword === 'all') {
    return Array.from({ length: totalItems }).map((_, index) => {
      const categoryKeys = Object.keys(categories);
      const selectedCategory = categoryKeys[index % categoryKeys.length];
      return {
        id: `all-${index}`,
        name: `${categories[selectedCategory]} ${index + 1}`,
        image: 'https://sitem.ssgcdn.com/26/64/85/item/1000277856426_i1_750.jpg',
        category: categories[selectedCategory],
        location: locations[index % locations.length],
        acquisitionDate: '2024. 12. 31',
      };
    });
  }

  return Array.from({ length: totalItems }).map((_, index) => ({
    id: `${keyword}-${index}`,
    name: `${categories[keyword] || '기타'} ${index + 1}`,
    image: 'https://sitem.ssgcdn.com/26/64/85/item/1000277856426_i1_750.jpg',
    category: categories[keyword] || '기타',
    location: locations[index % locations.length],
    acquisitionDate: '2024. 12. 31',
  }));
};

export const fetchDummyData = (
  keyword: KeywordType,
  page: number,
  limit: number
): Promise<DummyDataResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const allData = generateDummyData(keyword);
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const items = allData.slice(startIndex, endIndex);

      resolve({
        items,
        hasMore: endIndex < allData.length,
      });
    }, 500);
  });
};
