export const initializeMap = () => {
  const map = new naver.maps.Map("map", {
    gl: true, // 지도의 벡터맵 활성화 여부
    center: new naver.maps.LatLng(37.3595704, 127.105399), // 지도의 초기 중심 좌표
    zoom: 15, // 지도의 초기 줌 레벨
  });
};

const apartments = [
  {
    aptNm: 1,
    latitude: "37.5722672568825",
    longitude: "127.015201241243",
  },
  {
    aptNm: 2,
    latitude: "37.5723822385791",
    longitude: "127.011010638393",
  },
  {
    aptNm: 3,
    latitude: "37.5800313416279",
    longitude: "127.014194906011",
  },
  {
    aptNm: 4,
    latitude: "37.5803962235982",
    longitude: "127.011011705247",
  },
];

export const testMap = () => {
  const map = new naver.maps.Map("map", {
    center: new naver.maps.LatLng(37.5665, 126.978), // 일단 서울 중심
    zoom: 14,
  });

  const bounds = new naver.maps.LatLngBounds();

  // apartments는 나중에 전역으로 관리하면 좋을듯.
  apartments.forEach((apt) => {
    const lat = parseFloat(apt.latitude);
    const lng = parseFloat(apt.longitude);

    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(lat, lng),
      map: map,
      title: apt.aptNm,
    });

    bounds.extend(new naver.maps.LatLng(lat, lng)); // 객체의 좌표 경계에 지정한 좌표가 들어가도록 좌표 경계를 확장합니다.
  });

  map.fitBounds(bounds); // 지정한 좌표 경계를 포함하는 위치로 지도를 이동합니다.
};

// 실제로 API 요청 날려서 좌표로 매핑하는거랑,
//  눌러서 이벤트 추가하는거 넣으면 될듯
