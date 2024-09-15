import { FC } from "react";
import { Pagination } from "@mantine/core";

interface PaginationProps {
  className: string;
  currentPage: number;
  pageCount: number | undefined;
  handlePageChange: (value: number) => void;
}

const BasicPagination: FC<PaginationProps> = ({
  className,
  currentPage,
  pageCount,
  handlePageChange,
}) => {
  if (!pageCount) return null;

  return (
    <Pagination
      hideWithOnePage
      color="#9854f6"
      size="xs"
      className={className}
      total={pageCount}
      value={currentPage}
      onChange={(value) => handlePageChange(value)}
    />
  );
};

export default BasicPagination;
