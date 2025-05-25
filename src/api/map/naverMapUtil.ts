// naverMapUtils.ts
import type { DongMapItem, GugunMapItem } from "@/types/type";

// 네이버 타입이 없을 경우, 전역 선언
declare const naver: any;

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
      g.lat,
      g.long,
      `${g.gugunName} (${g.houseCount})`,
      () => {
        map.setZoom(g.nextZoomLevel || 13);
        map.setCenter(new naver.maps.LatLng(g.lat, g.long));
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
          background: white;
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

let currentMarkers: any[] = [];

function clearMarkers() {
  currentMarkers.forEach((marker) => marker.setMap(null));
  currentMarkers = [];
}

export function updateMarkersByZoomLevel(
  zoom: number,
  map: any,
  gugunCluster: GugunMapItem[],
  dongCluster: DongMapItem[]
  //   houseCluster: GugunMapItem[]
) {
  clearMarkers();

  if (zoom <= 12) {
    // 구/군 단위 마커
    currentMarkers = gugunCluster.map((g) =>
      createCustomMarker(
        map,
        g.lat,
        g.long,
        `${g.gugunName} (${g.houseCount})`,
        () => {
          map.setZoom(g.nextZoomLevel || 13);
          map.setCenter(new naver.maps.LatLng(g.lat, g.long));
        }
      )
    );
  } else if (zoom <= 14) {
    // 동 단위 마커
    currentMarkers = dongCluster.map((d) =>
      createCustomMarker(
        map,
        d.lat,
        d.long,
        `${d.dongName} (${d.houseCount})`,
        () => {
          map.setZoom(14);
          map.setCenter(new naver.maps.LatLng(d.lat, d.long));
        }
      )
    );
  } else {
    // // 개별 주택 단위 마커
    // currentMarkers = houseCluster.map((h) =>
    //   createCustomMarker(map, h.lat, h.long, `${h.houseName ?? "주택"}`)
    // );
  }
}

export function setupMapEventHandlersWithZoom(
  map: any,
  gugunCluster: GugunMapItem[],
  dongCluster: DongMapItem[]
) {
  const handle = () => {
    const zoom = map.getZoom();
    updateMarkersByZoomLevel(zoom, map, gugunCluster, dongCluster);
  };

  naver.maps.Event.addListener(map, "zoom_changed", handle);
  naver.maps.Event.addListener(map, "dragend", handle);
  naver.maps.Event.addListener(map, "idle", handle); // fallback
}

// export function showGugunMarkers(gugunCluster: GugunMapItem[], map: any) {
//   gugunCluster.forEach((gugun) => {
//     const position = new naver.maps.LatLng(gugun.lat, gugun.long);

//     const marker = new naver.maps.Marker({
//       position,
//       map,
//       icon: {
//         content: `
//           <div style="
//             background: white;
//             padding: 6px 10px;
//             border-radius: 12px;
//             box-shadow: 0 2px 6px rgba(0,0,0,0.3);
//             font-size: 13px;
//             font-weight: bold;
//             color: #333;
//             white-space: nowrap;
//           ">
//             ${gugun.gugunName} (${gugun.houseCount})
//           </div>
//         `,
//         size: new naver.maps.Size(38, 58),
//         anchor: new naver.maps.Point(19, 58),
//       },
//     });

//     naver.maps.Event.addListener(marker, "click", () => {
//       map.setZoom(gugun.nextZoomLevel || 13);
//       map.setCenter(position);
//     });
//   });
// }

// export function setupMapEventHandlers(
//   map: any,
//   onChange: (bounds: { ne: any; sw: any }) => void
// ) {
//   naver.maps.Event.addListener(map, "idle", () => {
//     const bounds = map.getBounds();
//     const ne = bounds.getNE();
//     const sw = bounds.getSW();
//     onChange({ ne, sw });
//   });
// }
