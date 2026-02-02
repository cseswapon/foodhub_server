import { Request } from "express";

interface PaginationResult {
  page: number;
  limit: number;
  skip: number;
}

export const getPagination = (req: Request): PaginationResult => {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.max(Number(req.query.limit) || 1000, 1);
  const skip = (page - 1) * limit;
  // console.log(limit, page, skip);
  return { page, limit, skip };
};
