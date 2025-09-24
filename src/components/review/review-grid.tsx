"use client";

import Link from "next/link";
import ReviewCard from "./review-card";
import { ReviewApiType } from "@/types/review-type";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useRef } from "react";

const fetchPosts = async ({ pageParam = 0 }) => {
  const limit = 10; // 한 번에 불러올 데이터 수
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_start=${pageParam}&_limit=${limit}`,
  );
  const data = await response.json();
  return {
    data,
    nextOffset: pageParam + limit,
    hasMore: data.length === limit,
  };
};

const getData = async (
  cursor,
  searchParams: {
    [key: string]: string | string[];
  },
): Promise<ReviewApiType> => {
  try {
    const params = new URLSearchParams({
      ...searchParams,
      cursor,
    } as Record<string, string>);

    const response = await fetch(
      `http://localhost:8080/api/review?${params?.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw await response.json();
    }

    const data = await response.json();

    return data;
  } catch (e) {
    return { data: [], meta: { hasNextPage: false, nextCursor: null } };
  }
};

const ReviewGrid = ({ searchParams }: { searchParams }) => {
  const queryKey = Object.values(searchParams).flat().sort();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status, // 'loading', 'error', 'success' 등의 상태
    error,
  } = useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: ({ pageParam }) => getData(pageParam, searchParams),
    initialPageParam: "",
    getNextPageParam: (lastPage) => {
      return lastPage.meta.hasNextPage ? lastPage.meta.nextCursor : undefined;
    },
    select: (data) => {
      return data?.pages.flatMap((item) => item.data);
    },
  });

  const observerTarget = useRef(null); // Intersection Observer를 위한 대상 요소

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      // 대상 요소가 뷰포트에 들어오고, 다음 페이지가 있으며, 현재 다음 페이지를 불러오는 중이 아닐 때
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage(); // 다음 페이지 불러오기
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null, // 뷰포트를 기준으로 관찰
      rootMargin: "0px", // 여백 없이
      threshold: 0.5, // 대상 요소가 50% 보일 때 콜백 실행
    });

    if (observerTarget.current) {
      observer.observe(observerTarget.current); // 대상 요소 관찰 시작
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current); // 컴포넌트 언마운트 시 관찰 중단
      }
    };
  }, [handleObserver]); // handleObserver가 변경될 때만 useEffect 재실행

  if (status === "pending") return <div>게시물 불러오는 중...</div>;
  if (status === "error") return <div>에러 발생: {error?.message}</div>;
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          리뷰 목록 <span className="text-pink-500"></span>
        </h2>
      </div>

      <div className="grid grid-cols-1 items-center justify-items-center gap-4 md:grid-cols-2 xl:grid-cols-3">
        {data?.map((review) => (
          <Link
            className="h-full w-full"
            href={`/review/${review.id}`}
            key={review.id}
          >
            <ReviewCard {...review} />
          </Link>
        ))}
      </div>

      {/* Intersection Observer가 관찰할 대상 요소 */}
      <div
        ref={observerTarget}
        style={{
          height: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isFetchingNextPage && <div>다음 게시물 불러오는 중...</div>}
        {!hasNextPage && !isFetchingNextPage && (
          <div>모든 게시물을 불러왔습니다!</div>
        )}
      </div>
    </div>
  );
};

export default ReviewGrid;
