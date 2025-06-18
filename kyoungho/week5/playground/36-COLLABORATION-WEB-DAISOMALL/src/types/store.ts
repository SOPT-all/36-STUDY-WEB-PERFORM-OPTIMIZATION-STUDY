export interface LocationCardDataType {
  storeId: number;
  storeName: string;
  location: string;
  openingHours: string;
  latitude: number;
  longitude: number;
  isPickupAvailable: boolean;
  floor: string;
  shelfNo: number;
  stockCount: number;
  stockStatus: string;
  storeType?: 'FRANCHISE' | 'DISTRIBUTION';
  distance: string;
  address: string;
  isOpen: boolean;
  time: string;
}
