import { PAGINATION_LIMIT } from "./client";

export const calculatePaginationOffset = (pageNumber) => {
  const offset = PAGINATION_LIMIT * (pageNumber - 1);
  return { offset };
};
