import Link from "next/link";
import ReviewCard from "./review-card";
import { ReviewItemType } from "@/types/review-type";

const ReviewGrid = ({ reviews }: { reviews: ReviewItemType[] }) => {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          리뷰 목록 <span className="text-pink-500">(4)</span>
        </h2>

        <select className="rounded-2xl border-2 border-pink-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 focus:border-transparent focus:ring-2 focus:ring-pink-500 focus:outline-none">
          <option>최신순</option>
          <option>인기순</option>
          <option>평점순</option>
        </select>
      </div>

      <div className="grid grid-cols-1 items-center justify-items-center gap-4 md:grid-cols-2 xl:grid-cols-3">
        {reviews?.map((review) => (
          <Link
            className="h-full w-full"
            href={`/review/${review.id}`}
            key={review.id}
          >
            <ReviewCard {...review} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ReviewGrid;
