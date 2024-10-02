export interface IListableResponse<T> {
  list: Array<T>
  total: number
  page: number
  size: number
}
