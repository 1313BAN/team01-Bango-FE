// naverMapUtils.ts
import type { DongMapItem, GugunMapItem, RentalHouse } from "@/types/type";
import { getRentalHouseWithinBounds } from ".";

// 네이버 타입이 없을 경우, 전역 선언
declare const naver: any;
let currentMarkers: any[] = [];

export function initializeMap(): any {
  const mapDiv = document.getElementById("map");
  if (!mapDiv) {
    console.error("map div가 존재하지 않습니다.");
    return null;
  }

  const mapOptions = {
    center: new naver.maps.LatLng(37.5665, 126.978), // 서울 시청 중심
    zoom: 11,
    minZoom: 7,
    maxZoom: 18,
    zoomControl: true,
    zoomControlOptions: {
      style: naver.maps.ZoomControlStyle.SMALL,
      position: naver.maps.Position.TOP_RIGHT,
    },
  };

  return new naver.maps.Map("map", mapOptions);
}

export const initializeMarker = (map: any, gugunCluster: GugunMapItem[]) => {
  currentMarkers = gugunCluster.map((g) =>
    createCustomMarker(
      map,
      g.avgLatitude,
      g.avgLongitude,
      `${g.gugunName} (${g.rentalCount})`,
      () => {
        map.setZoom(g.nextZoomLevel || 13);
        map.setCenter(new naver.maps.LatLng(g.avgLatitude, g.avgLongitude));
      }
    )
  );
};

function createCustomMarker(
  map: any,
  lat: number,
  long: number,
  label: string,
  onClick?: () => void
) {
  const position = new naver.maps.LatLng(lat, long);

  const marker = new naver.maps.Marker({
    position,
    map,
    icon: {
      content: `
        <div style="
          background: #e0dee3;
          padding: 6px 10px;
          border-radius: 12px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          font-size: 13px;
          font-weight: bold;
          color: #333;
          white-space: nowrap;
        ">
          ${label}
        </div>
      `,
      size: new naver.maps.Size(38, 58),
      anchor: new naver.maps.Point(19, 58),
    },
  });

  if (onClick) {
    naver.maps.Event.addListener(marker, "click", onClick);
  }

  return marker;
}

async function clearMarkers() {
  currentMarkers.forEach((marker) => marker.setMap(null));
  currentMarkers = [];
}

let lastZoomRequestId = 0;

export async function updateMarkersByZoomLevel(
  zoom: number,
  map: any,
  gugunCluster: GugunMapItem[],
  dongCluster: DongMapItem[],
  onUpdateRentalHouses?: (list: RentalHouse[]) => void,
  onSelectHouse?: (house: RentalHouse) => void
) {
  const currentRequestId = ++lastZoomRequestId;
  clearMarkers();

  if (zoom <= 12) {
    currentMarkers = gugunCluster.map((g) =>
      createCustomMarker(
        map,
        g.avgLatitude,
        g.avgLongitude,
        `${g.gugunName} (${g.rentalCount})`,
        () => {
          map.setZoom(g.nextZoomLevel || 13);
          map.setCenter(new naver.maps.LatLng(g.avgLatitude, g.avgLongitude));
        }
      )
    );
  } else if (zoom <= 15) {
    currentMarkers = dongCluster.map((d) =>
      createCustomMarker(
        map,
        d.avgLatitude,
        d.avgLongitude,
        `${d.dongName} (${d.rentalCount})`,
        () => {
          map.setZoom(16);
          map.setCenter(new naver.maps.LatLng(d.avgLatitude, d.avgLongitude));
        }
      )
    );
  } else {
    const bounds = map.getBounds();
    const sw = bounds.getSW();
    const ne = bounds.getNE();

    const houseList = await getRentalHouseWithinBounds({
      maxLatitude: ne.y,
      maxLongitude: ne.x,
      minLatitude: sw.y,
      minLongitude: sw.x,
    });

    if (currentRequestId !== lastZoomRequestId) return;

    currentMarkers = houseList.map((h) =>
      createCustomMarker(
        map,
        h.latitude,
        h.longitude,
        `🏠`,
        () => onSelectHouse?.(h) // ✅ 클릭 시 주택 선택 콜백
      )
    );

    if (onUpdateRentalHouses) {
      onUpdateRentalHouses(houseList);
    }
  }
}

export function setupMapEventHandlersWithZoom(
  map: any,
  gugunCluster: GugunMapItem[],
  dongCluster: DongMapItem[],
  onUpdateRentalHouses?: (list: RentalHouse[]) => void,
  onSelectHouse?: (house: RentalHouse) => void
) {
  const handle = () => {
    const zoom = map.getZoom();
    updateMarkersByZoomLevel(
      zoom,
      map,
      gugunCluster,
      dongCluster,
      onUpdateRentalHouses,
      onSelectHouse
    );
  };

  naver.maps.Event.addListener(map, "zoom_changed", handle);
  naver.maps.Event.addListener(map, "dragend", handle);
  naver.maps.Event.addListener(map, "idle", handle);
}

export function moveMapToDong(
  map: any,
  dongCluster: DongMapItem[],
  dongCode: string
) {
  console.log(dongCluster);
  const selectedDong = dongCluster.find((d) => d.dongCode === dongCode);
  if (selectedDong) {
    map.setCenter(
      new naver.maps.LatLng(selectedDong.avgLatitude, selectedDong.avgLongitude)
    );
    map.setZoom(15);
  } else {
    console.warn("해당 dongCode에 대한 좌표를 찾을 수 없습니다:", dongCode);
  }
}
