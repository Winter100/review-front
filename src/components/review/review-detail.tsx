"use client";
import { ReviewDetailType } from "@/types/review-type";
import { ArrowLeft, Clock, Flag, MapPin, Share2, Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ReviewDetail = ({ review }: { review: ReviewDetailType }) => {
  const router = useRouter();

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* 뒤로가기 버튼 */}
      <button
        className="mb-6 inline-flex cursor-pointer items-center gap-2 font-medium text-pink-600 hover:text-pink-700"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-5 w-5" />
        목록으로 돌아가기
      </button>

      {/* Review Header */}
      <div className="mb-6 rounded-3xl border-2 border-pink-100 bg-white p-8 shadow-lg">
        <div className="mb-6 flex items-start justify-between">
          <div className="flex-1">
            <h1 className="mb-4 text-3xl font-bold text-balance text-gray-800">
              {review.title}
            </h1>

            <div className="mb-4 flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image
                    src={
                      review?.author?.profileImageUrl ||
                      "/images/blank_profile.png"
                    }
                    alt={review.author.nickname}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">
                    {review.author.nickname}
                  </p>
                  {review.location && (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin className="h-4 w-4" />
                      {review.location}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-6 w-6 ${i < review.rating ? "fill-current text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
                <span className="ml-2 text-lg font-semibold text-gray-700">
                  {review.rating}.0
                </span>
              </div>

              <div className="flex items-center gap-1 text-gray-500">
                <Clock className="h-4 w-4" />
                <span className="text-sm">
                  {new Date(review.createdAt).toLocaleDateString("ko-KR", {
                    timeZone: "Asia/Seoul",
                  })}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="rounded-2xl bg-pink-100 p-3 text-pink-600 transition-colors hover:bg-pink-200">
              <Share2 className="h-5 w-5" />
            </button>
            <button className="rounded-2xl bg-gray-100 p-3 text-gray-600 transition-colors hover:bg-gray-200">
              <Flag className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Tags */}
        <div className="mb-6 flex flex-wrap gap-2">
          {review.tags.map(({ tag }) => (
            <span
              key={tag}
              className="rounded-full bg-gradient-to-r from-pink-100 to-purple-100 px-4 py-2 text-sm font-medium text-pink-700"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Review Images */}
      <div className="mb-6 rounded-3xl border-2 border-pink-100 bg-white p-6 shadow-lg">
        <h3 className="mb-4 text-xl font-bold text-gray-800">사진</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {review.images.map((image, i) => (
            <div
              key={image.imageUrl}
              className="relative aspect-square overflow-hidden rounded-2xl"
            >
              <Image
                src={image.imageUrl || "/placeholder.svg"}
                alt={`Review image ${i + 1}`}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Review Content */}
      <div className="mb-6 rounded-3xl border-2 border-pink-100 bg-white p-8 shadow-lg">
        <h3 className="mb-4 text-xl font-bold text-gray-800">리뷰 내용</h3>
        <div className="prose prose-lg max-w-none">
          {review.content.split("\n").map((paragraph, index) => (
            <p
              key={index}
              className="mb-4 leading-relaxed text-pretty text-gray-700"
            >
              {paragraph.trim()}
            </p>
          ))}
        </div>

        {/* Like and Comment Actions */}
        <div className="mt-6 flex items-center gap-6 border-t border-pink-100 pt-6">
          {/* <button className="flex items-center gap-2 rounded-full bg-pink-50 px-4 py-2 text-pink-500 transition-colors hover:bg-pink-100 hover:text-pink-600">
            <Heart className="h-5 w-5" />
            <span className="font-medium">좋아요 {review.likes}</span>
          </button>

          <button className="flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-blue-500 transition-colors hover:bg-blue-100 hover:text-blue-600">
            <MessageCircle className="h-5 w-5" />
            <span className="font-medium">댓글 {review.comments}</span>
          </button> */}
        </div>
      </div>

      {/* Comments Section */}
      {/* <CommentSection reviewId={review.id} /> */}
    </div>
  );
};

export default ReviewDetail;
