import React from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Heart, MessageCircle, Star } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const featuredReviews = [
  {
    id: 1,
    title: "홍대 숨은 맛집 발견! 진짜 맛있어요 🍜",
    content:
      "친구 추천으로 갔는데 정말 대박이었어요! 국물이 진짜 깊고 면도 쫄깃하고... 사장님도 너무 친절하시고 가격도 착해요. 다음에 또 갈 예정!",
    author: {
      name: "맛집헌터",
      avatar: "/images/item.png",
      badge: "맛집 전문가",
    },
    rating: 5,
    category: "맛집",
    likes: 127,
    comments: 23,
    image: "/images/2.jpg",
  },
  {
    id: 2,
    title: "제주도 카페 투어 후기 ☕️",
    content:
      "제주도 3박4일 동안 카페만 15곳 다녀왔어요! 그 중에서도 이 카페는 정말 특별했어요. 바다뷰도 예쁘고 디저트도 맛있고...",
    author: {
      name: "카페러버",
      avatar: "/images/item.png",
      badge: "여행 마니아",
    },
    rating: 5,
    category: "카페",
    likes: 89,
    comments: 15,
    image: "/images/1.jpg",
  },
  {
    id: 3,
    title: "이 립스틱 진짜 추천해요! 💄",
    content:
      "발색도 좋고 지속력도 좋아요. 마스크 써도 잘 안 묻어나고 가격 대비 정말 만족스러워요. 색깔도 너무 예뻐서 매일 바르고 다녀요!",
    author: {
      name: "뷰티퀸",
      avatar: "/images/item.png",
      badge: "뷰티 인플루언서",
    },
    rating: 4,
    category: "뷰티",
    likes: 156,
    comments: 31,
    image: "/images/3.jpg",
  },
];

const ReviewFeatures = () => {
  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="text-primary mb-4 text-3xl font-bold md:text-4xl">
            {"이번 주 인기 리뷰"}
          </h2>
          <p className="text-muted-foreground text-lg">
            {"다른 사람들이 가장 많이 본 리뷰들을 확인해보세요"}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredReviews.map((review) => (
            <Card
              key={review.id}
              className="group border-border/50 hover:border-secondary/30 bg-card/80 cursor-pointer overflow-hidden backdrop-blur-sm transition-all duration-300 hover:shadow-xl"
            >
              <div className="relative h-60 w-full">
                <Image
                  src={review.image || "/placeholder.svg"}
                  alt={review.title}
                  fill
                  className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <Badge className="bg-secondary/90 text-secondary-foreground absolute top-3 left-3">
                  {review.category}
                </Badge>
              </div>

              <CardContent className="p-6">
                <div className="mb-3 flex items-center space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < review.rating ? "fill-current text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>

                <h3 className="text-card-foreground group-hover:text-primary mb-3 line-clamp-2 text-lg font-bold transition-colors">
                  {review.title}
                </h3>

                <p className="text-muted-foreground mb-4 line-clamp-3 text-sm">
                  {review.content}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={review.author.avatar || "/placeholder.svg"}
                      />
                      <AvatarFallback>{review.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-card-foreground text-sm font-medium">
                        {review.author.name}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {review.author.badge}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-border/50 mt-4 flex items-center justify-between border-t pt-4">
                  <div className="text-muted-foreground flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Heart className="h-4 w-4" />
                      <span className="text-sm">{review.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-4 w-4" />
                      <span className="text-sm">{review.comments}</span>
                    </div>
                  </div>
                  <span className="text-secondary text-sm font-semibold group-hover:underline">
                    자세히 보기
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewFeatures;
