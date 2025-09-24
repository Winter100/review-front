"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Star, Upload, X, PenTool } from "lucide-react";
import Image from "next/image";
import { useEditReview } from "@/hooks/useEditReview";
import { cn } from "@/lib/utils";
import { categories } from "@/lib/validators/filter";

const WriteReviewForm = () => {
  const {
    form,
    isPending,
    addTag,
    tagInput,
    setTagInput,
    handleImageUpload,
    handleRatingClick,
    hoverRating,
    onSubmit,
    rating,
    removeImage,
    removeTag,
    setHoverRating,
    watchedTags,
    images,
  } = useEditReview();

  return (
    <Card className="w-full border-0 bg-white/80 shadow-lg backdrop-blur-sm">
      <CardHeader className="pb-6 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-pink-500">
          <PenTool className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold text-gray-800">
          리뷰 작성하기
        </CardTitle>
        <CardDescription className="text-gray-600">
          소중한 경험을 다른 사람들과 공유해주세요
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel className="font-medium text-gray-700">
                      리뷰 제목
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="어떤 경험이었나요?"
                        className="h-12 rounded-xl border-2 border-purple-200 placeholder:text-gray-500/70 focus:border-purple-400 focus:ring-purple-400/20"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-gray-700">
                      카테고리
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-12 rounded-xl border-2 border-purple-200 focus:border-purple-400">
                          <SelectValue placeholder="카테고리 선택" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem
                            key={category.value}
                            value={category.value}
                          >
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rating"
                render={({}) => (
                  <FormItem>
                    <FormLabel className="font-medium text-gray-700">
                      별점
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center space-x-1 py-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            className="focus:outline-none"
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => handleRatingClick(star)}
                          >
                            <Star
                              className={`h-8 w-8 transition-colors ${
                                star <= (hoverRating || rating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          </button>
                        ))}
                        <span className="ml-2 text-sm text-gray-600">
                          {rating > 0 && `${rating}점`}
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-gray-700">
                      위치 (선택사항)
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="서울시 강남구..."
                        className="h-12 rounded-xl border-2 border-purple-200 placeholder:text-gray-500/70 focus:border-purple-400 focus:ring-purple-400/20"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-gray-700">
                      가격 (선택사항)
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="15,000원"
                        className="h-12 rounded-xl border-2 border-purple-200 placeholder:text-gray-500/70 focus:border-purple-400 focus:ring-purple-400/20"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-gray-700">
                    리뷰 내용
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="자세한 리뷰를 작성해주세요..."
                      className="min-h-32 resize-none rounded-xl border-2 border-purple-200 placeholder:text-gray-500/70 focus:border-purple-400 focus:ring-purple-400/20"
                    />
                  </FormControl>
                  <FormDescription className="text-right text-sm text-gray-500">
                    {field.value?.length || 0}/2000
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <FormLabel className="font-medium text-gray-700">태그</FormLabel>
              <div className="mb-3 flex flex-wrap gap-2">
                {watchedTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-purple-100 px-3 py-1 text-purple-700 hover:bg-purple-200"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 hover:text-purple-900"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="태그 입력 후 Tab 또는 Enter를 눌러 추가"
                  className="h-10 rounded-lg border-2 border-purple-200 placeholder:text-gray-500/70 focus:border-purple-400"
                  onKeyDown={(e) => {
                    if (e.key === "Tab" || e.key === "Enter") {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                />
              </div>
              <p className="text-sm text-gray-500">
                최대 5개까지 추가할 수 있어요
              </p>
            </div>

            <div className="space-y-4">
              <FormLabel className="font-medium text-gray-700">
                사진 (최대 5장)
              </FormLabel>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {images.map((image, index) => (
                  <div key={index} className="relative aspect-square">
                    <Image
                      src={URL.createObjectURL(image) || "/placeholder.svg"}
                      alt={`Preview ${index + 1}`}
                      fill
                      className="h-auto w-full rounded-lg border-2 border-purple-200 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white hover:bg-red-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                {images.length < 5 && (
                  <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-purple-300 transition-colors hover:border-purple-400 hover:bg-purple-50">
                    <Upload className="mb-1 h-6 w-6 text-purple-400" />
                    <span className="text-xs text-purple-600">사진 추가</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className={cn(
                "h-12 w-full rounded-xl bg-gradient-to-r from-purple-400 to-pink-500 font-medium text-white shadow-lg transition-all duration-200 hover:from-purple-500 hover:to-pink-600 hover:shadow-xl",
                !isPending && "cursor-pointer",
              )}
              disabled={isPending}
            >
              {isPending ? "작성 중..." : "리뷰 작성하기"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default WriteReviewForm;
