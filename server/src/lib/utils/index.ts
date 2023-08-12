export function getPaginationOffset(page: number, perPage: number): number {
  return (perPage - 1) * page;
}
