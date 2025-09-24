import z from "zod";

export const categories = [
  { value: "food", label: "음식" },
  { value: "shopping", label: "쇼핑" },
  { value: "etc", label: "기타" },
  { value: "all", label: "모두 보기" },
];

export const INDIVIDUAL_CATEGORIES = categories
  .filter((c) => c.value !== "all")
  .map((c) => c.value);

// 모든 카테고리 값 목록
export const ALL_CATEGORY_VALUES = categories.map((c) => c.value);

export const filterSort = [
  { value: "desc", label: "최신순" },
  { value: "best", label: "인기순" },
];

export const FilterSchema = z.object({
  sort: z.enum(filterSort.map((sort) => sort.value)).catch("desc"),
  category: z
    .array(z.string())
    .transform((val) => (val.length === 0 ? ["all"] : val)),
});

export type FilterType = z.infer<typeof FilterSchema>;
