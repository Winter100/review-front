"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Search, Sparkles } from "lucide-react";

const HeroSection = () => {
  const router = useRouter();

  return (
    <section className="from-muted/30 via-background to-muted/20 relative bg-gradient-to-br px-4 py-20">
      <div className="mx-auto max-w-6xl text-center">
        {/* 캐릭터 */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <Image
              src="/images/character.jpg"
              alt="캐릭터"
              width={192}
              height={192}
              className="rounded-full shadow-lg"
            />
            <div className="bg-secondary absolute -top-2 -right-2 animate-bounce rounded-full p-2">
              <Sparkles
                className="text-secondary-foreground h-6 w-6"
                fill="currentColor"
              />
            </div>
          </div>
        </div>

        {/* Hero text */}
        <h1 className="text-primary mb-6 text-4xl font-bold text-balance md:text-6xl">
          {"진짜 솔직한 리뷰를"} <br />
          <span className="text-secondary">{"함께 나눠요!"}</span>
        </h1>

        <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-lg text-pretty md:text-xl">
          {
            "맛집부터 여행지까지, 실제 경험을 바탕으로 한 진솔한 리뷰들을 만나보세요. 우리 모두의 선택이 더 나아질 거예요! ✨"
          }
        </p>

        {/* 검색창 */}
        <div className="mx-auto mb-8 max-w-md">
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform" />
            <input
              type="text"
              placeholder="어떤 리뷰를 찾고 계신가요?"
              className="border-border bg-card text-card-foreground placeholder:text-muted-foreground focus:ring-ring w-full rounded-full border py-4 pr-4 pl-12 shadow-sm focus:border-transparent focus:ring-2 focus:outline-none"
            />
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            onClick={() => router.push("/review")}
            size="lg"
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground cursor-pointer rounded-full px-8 py-3 text-lg font-semibold shadow-lg transition-all duration-200 hover:shadow-xl"
          >
            리뷰 둘러보기
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full bg-transparent px-8 py-3 text-lg font-semibold"
          >
            내 첫 리뷰 쓰기
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
