"use client";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Star, ThumbsUp, Upload } from "lucide-react";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

const ReviewForm = () => {
  const [hoverIndex, setHoverIndex] = useState(-1);
  const form = useForm();

  {
    /* Todo
      1. 이미지 업로드
      2. 이미지 미리보기
      3. API POST
      4. 데이터 검증
    */
  }

  return (
    <Card className="">
      <CardHeader>
        <h2 className="text-lg font-bold">리뷰 등록</h2>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form>
            <div className="flex">
              <div className="flex-1">
                <div className="mb-4 space-y-2">
                  <Label className="text-sm font-medium">별점 *</Label>
                  <div>
                    {[...Array(5)].map((stat, i) => (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onMouseEnter={() => setHoverIndex(i)}
                        onMouseLeave={() => setHoverIndex(-1)}
                        key={i}
                      >
                        <Star
                          className={cn(
                            "hover:bg-inherit",
                            i <= hoverIndex
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300",
                          )}
                        />
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="mb-4 space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium">
                    리뷰 제목 *
                  </Label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="리뷰 제목을 입력해주세요"
                    className="w-full"
                  />
                </div>

                <div className="mb-4 space-y-2">
                  <Label htmlFor="content" className="text-sm font-medium">
                    내용 *
                  </Label>
                  <Textarea
                    id="content"
                    placeholder="내용을 입력해주세요."
                    className="h-40 w-full resize-none"
                  />
                </div>

                <div className="mb-4 space-y-2">
                  <Label className="text-sm font-medium">이미지 *</Label>
                  <Label
                    htmlFor="image-upload"
                    className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition-colors hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="mb-2 h-8 w-8 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">클릭하여 업로드 </span>
                        또는 드래그 앤 드롭
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF (최대 5MB, 최대 1개)
                      </p>
                    </div>
                    <input
                      id="image-upload"
                      type="file"
                      className="hidden"
                      multiple
                      accept="image/*"
                    />
                  </Label>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button className="ml-auto">리뷰 등록</Button>
      </CardFooter>
    </Card>
  );
};

export default ReviewForm;
