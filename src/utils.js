import { PAGINATION_LIMIT } from "./client";

export const calculatePaginationOffset = (pageNumber) => {
  return PAGINATION_LIMIT * (pageNumber - 1);
};
