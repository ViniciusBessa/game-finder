export interface GameQueryObject {
  [key: string]: any,
  fields: string,
  search?: string,
  where?: string,
  page?: string,
  limit?: string,
}
