export interface FiltersFormValues {
  minRating: number;
  genres: { id: number; name: string; checked: boolean }[];
  platforms: { id: number; name: string; checked: boolean }[];
}
