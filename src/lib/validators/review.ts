import z from "zod";

export const ReviewSchema = z.object({
  title: z
    .string()
    .min(5, "제목은 최소 5자 이상이어야 해요")
    .max(100, "제목은 100자를 초과할 수 없어요"),
  category: z.string().min(1, "카테고리를 선택해주세요"),
  rating: z.number().min(1, "별점을 선택해주세요").max(5),
  content: z
    .string()
    .min(20, "리뷰 내용은 최소 20자 이상이어야 해요")
    .max(2000, "리뷰 내용은 2000자를 초과할 수 없어요"),
  tags: z.array(z.string()).max(5, "태그는 최대 5개까지 추가할 수 있어요"),
  location: z.string().optional(),
  price: z.string().optional(),
});

export type ReviewType = z.infer<typeof ReviewSchema>;
