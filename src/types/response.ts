/* eslint-disable @typescript-eslint/no-explicit-any */
export interface PaginationResponse {
  page: number;
  per_page: number;
  max_page: number;
  count: number;
}

interface ProfileResponse {
  id: string;
  name: string;
  username: string;
  image_url: string | null;
  bio: string | null;
}

export interface FestResponse {
  id: number;
  text: string;
  total_likes: number;
  parent_id: string | null;
  is_deleted: boolean;
  user: ProfileResponse;
}

export interface FestDetailResponse {
  id: number;
  text: string;
  total_likes: number;
  parent_id: string | null;
  is_deleted: boolean;
  user: ProfileResponse;
  replies: FestResponse[];
}

export interface LoginResponse {
  token: string;
}

export function typecastPaginationResponse(
  data: any
): PaginationResponse | undefined {
  return data as PaginationResponse | undefined;
}

export function typecastLoginResponse(data: any): LoginResponse | undefined {
  return data as LoginResponse | undefined;
}

export function typecastProfileResponse(
  data: any
): ProfileResponse | undefined {
  return data as ProfileResponse | undefined;
}

export function typecastFestResponse(data: any): FestResponse[] | undefined {
  return data as FestResponse[] | undefined;
}

export function typecastFestDetailResponse(
  data: any
): FestDetailResponse | undefined {
  return data as FestDetailResponse | undefined;
}
