import LocationCard from '@components/LocationCard/LocationCard';
import { isStoreOpen } from '@utils/time';
import type { LocationCardDataType } from '@app-types/store';

interface LocationCardListProps {
  stores: LocationCardDataType[];
}

const LocationCardList = ({ stores }: LocationCardListProps) => (
  <>
    {stores.map((store) => (
      <LocationCard
        key={store.storeId}
        storeName={store.storeName}
        address={store.location}
        time={store.openingHours}
        floor={store.floor}
        stand={String(store.shelfNo)}
        stock={store.stockCount}
        isPickupAvailable={store.isPickupAvailable}
        isSoldOut={store.stockStatus === '재고 소진' || store.stockCount === 0}
        isFranchise={
          store.storeType === 'FRANCHISE' || store.storeType === 'DISTRIBUTION'
        }
        distance={'5km'}
        isOpen={isStoreOpen(store.openingHours)}
      />
    ))}
  </>
);

export default LocationCardList;
