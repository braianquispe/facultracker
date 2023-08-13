export function getPaginationOffset(page: number, perPage: number): number {
  return (page - 1) * perPage;
}
