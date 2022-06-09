export interface FiltersFormValues {
  minRating: number;
  maxRating: number;
  genres: { id: number; name: string; checked: boolean }[];
  platforms: { id: number; name: string; checked: boolean }[];
}
