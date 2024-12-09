export interface IListResponse<T> {
  list: Array<T>
  total: number
  page: number
  size: number
}
