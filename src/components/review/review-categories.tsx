import { Card, CardContent } from "@/components/ui/card";
import {
  Utensils,
  MapPin,
  ShoppingBag,
  Coffee,
  Camera,
  Gamepad2,
  Clipboard,
} from "lucide-react";
import Link from "next/link";

const limit = 15;
const category = {
  food: "food",
  shooping: "shopping",
  cafe: "cafe",
  etc: "etc",
};

const categories = [
  {
    icon: <Utensils className="h-8 w-8" />,
    title: "맛집 리뷰",
    description: "숨은 맛집부터 유명 레스토랑까지",
    count: "1,234",
    color: "bg-orange-100 text-orange-600",
    href: `/review?category=${category.food}&limit=${limit}`,
  },
  {
    icon: <ShoppingBag className="h-8 w-8" />,
    title: "쇼핑 리뷰",
    description: "패션, 뷰티, 생활용품 솔직 후기",
    count: "2,103",
    color: "bg-pink-100 text-pink-600",
    href: `/review?category=${category.shooping}&limit=${limit}`,
  },
  {
    icon: <Coffee className="h-8 w-8" />,
    title: "카페 리뷰",
    description: "분위기 좋은 카페와 디저트 맛집",
    count: "967",
    color: "bg-amber-100 text-amber-600",
    href: `/review?category=${category.cafe}&limit=${limit}`,
  },
  {
    icon: <Clipboard className="h-8 w-8" />,
    title: "모두 보기",
    description: "모든 리뷰",
    count: "543",
    color: "bg-purple-100 text-purple-600",
    href: `/review?category=${category.etc}&limit=${limit}`,
  },
  // {
  //   icon: <MapPin className="h-8 w-8" />,
  //   title: "여행지 리뷰",
  //   description: "국내외 여행 명소와 숨은 보석들",
  //   count: "856",
  //   color: "bg-blue-100 text-blue-600",
  //   href: `/review?category=food&limit=${limit}`,
  // },
  // {
  //   icon: <Gamepad2 className="h-8 w-8" />,
  //   title: "취미생활",
  //   description: "게임, 스포츠, 액티비티 체험기",
  //   count: "721",
  //   color: "bg-green-100 text-green-600",
  //   href: `/review?category=food&limit=${limit}`,
  // },
];

const getData = async () => {
  const response = await fetch("");
  const data = await response.json();
  return data;
};

const ReviewCategories = () => {
  return (
    <section className="bg-muted/60 px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="text-primary mb-4 text-3xl font-bold md:text-4xl">
            {"어떤 리뷰를 찾고 계신가요?"}
          </h2>
          <p className="text-muted-foreground text-lg">
            {"다양한 카테고리별로 진솔한 리뷰들을 만나보세요"}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <Link className="block" key={index} href={category.href}>
              <Card className="group border-border/50 hover:border-secondary/50 bg-card/50 cursor-pointer backdrop-blur-sm transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div
                      className={`rounded-full p-3 ${category.color} transition-transform duration-200 group-hover:scale-110`}
                    >
                      {category.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-card-foreground group-hover:text-primary mb-2 text-lg font-bold transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-muted-foreground mb-3 text-sm">
                        {category.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground text-xs">
                          {category.count}개의 리뷰
                        </span>
                        <span className="text-secondary text-sm font-semibold group-hover:underline">
                          더보기 →
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewCategories;
