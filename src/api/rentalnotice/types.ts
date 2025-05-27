import type { RentalNotice } from "@/types/type";

export type ByIdRequest = {
  noticeId: number;
};

export interface NoticeWithLike {
  rentalNotice: RentalNotice;
  isLiked: boolean;
}

export type NoticeListResponse = NoticeWithLike[];