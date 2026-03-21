/**
 * Generates a balanced array of page numbers and ellipses.
 */
export const projectPaginationRange = (
  currentPage: number,
  totalPages: number,
  siblings: number = 1
) => {
  const range: ('...' | number)[] = [];
  const totalNumbers = siblings * 2 + 3; // siblings l/r + first + last + current
  const totalBlocks = totalNumbers + 2; // + ellipses

  if (totalPages > totalBlocks) {
    const startPage = Math.max(2, currentPage - siblings);
    const endPage = Math.min(totalPages - 1, currentPage + siblings);

    range.push(1);

    if (startPage > 2) range.push('...');

    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }

    if (endPage < totalPages - 1) range.push('...');

    range.push(totalPages);
  } else {
    for (let i = 1; i <= totalPages; i++) {
      range.push(i);
    }
  }

  return range;
};
