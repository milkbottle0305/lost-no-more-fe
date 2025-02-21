type LatLng = {
  latitude: number;
  longitude: number;
  lostItemID: number;
};

export const LOSTITEMS_LOCATION: LatLng[] = Array.from({ length: 400000 }, (_, index) => {
  const latitude = parseFloat((33 + Math.random() * (38 - 33)).toFixed(6));
  const longitude = parseFloat((125 + Math.random() * (130 - 125)).toFixed(6));
  return {
    latitude,
    longitude,
    lostItemID: index + 1,
  };
});
