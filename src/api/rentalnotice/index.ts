import { NOTICE } from "@/api/endpoint";
import api from "@/api";
import type { ApiResponse } from "@/api/types";
import type {
  ByIdRequest,
  NoticeListResponse,
  NoticeWithLike,
} from "@/api/rentalnotice/types";

// 전체 공고 리스트 조회
export const getNotices = async (): Promise<NoticeListResponse> => {
  const response = await api.get<ApiResponse<NoticeListResponse>>(NOTICE.ALL);
  return response.data.data;
};

// 공고 상세 조회
export const getNoticeById = async (
  req: ByIdRequest
): Promise<NoticeWithLike> => {
  const response = await api.get<ApiResponse<NoticeWithLike>>(
    NOTICE.ONE(req.noticeId)
  );
  return response.data.data;
};

// 공고 찜
export const likeNotice = async (noticeId: number): Promise<void> => {
  await api.post(NOTICE.LIKE(noticeId));
};

// 공고 찜 해제
export const unlikeNotice = async (noticeId: number): Promise<void> => {
  await api.delete(NOTICE.LIKE(noticeId));
};

// 찜한 공고 목록 조회
export const getLikedNotices = async (): Promise<NoticeListResponse> => {
  const response = await api.get<ApiResponse<NoticeListResponse>>(NOTICE.LIKED);
  return response.data.data;
};