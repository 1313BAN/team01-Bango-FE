import apiClient from "@/api";

export async function fetchHouseInfo(
  sggCd: string,
  umdCd: string,
  dealYear: string,
  dealMonth: string
) {
  const response = await apiClient.get<any[]>(
    `/house/search-address?sggCd=${encodeURIComponent(
      sggCd
    )}&umdCd=${encodeURIComponent(umdCd)}&dealYear=${encodeURIComponent(
      dealYear
    )}&dealMonth=${encodeURIComponent(dealMonth)}`
  );

  return response.data;
}
