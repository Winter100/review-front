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
import { cn } from "@/lib/utils";
import { Heart, MessageCircle, Star } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ReviewItemType } from "@/types/review-type";

interface ReviewCardProps {
  category: string;
  title: string;
  image: string;
  rating: number;
  content: string;
  avatar: string;
}

const ReviewCard = ({
  content,
  rating,
  title,
  author,
  mainImgaeUrl,
  category,
  tags,
}: ReviewItemType) => {
  return (
    <Card className="group border-border/50 hover:border-secondary/30 bg-card/80 h-full w-full cursor-pointer overflow-hidden shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
      <div className="relative aspect-video w-full">
        <Image
          src={mainImgaeUrl || "/placeholder.svg"}
          alt={title}
          fill
          className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <Badge className="bg-secondary/90 text-secondary-foreground absolute top-3 left-3">
          {category.name}
        </Badge>
      </div>

      <CardContent className="h-full px-6">
        <div className="mb-3 flex items-center space-x-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < rating ? "fill-current text-yellow-400" : "text-gray-300"}`}
            />
          ))}
        </div>
        <CardTitle className="mb-4 line-clamp-1">{title}</CardTitle>

        {/* <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
          {content}
        </p> */}

        <div className="flex items-center justify-between space-y-3">
          <div className="flex flex-1 flex-row flex-wrap items-center gap-1">
            {tags.map((tag, i) => (
              <span
                key={tag.tag + i}
                className="rounded-full bg-gradient-to-r from-pink-100 to-purple-100 px-3 py-1 text-xs font-medium text-pink-700"
              >
                {`#${tag.tag}`}
              </span>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={author.profileImageUrl ?? "/images/blank_profile.png"}
              />
              <AvatarFallback>{author.nickname}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-card-foreground text-sm font-medium">
                {author.nickname}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-border/50 border-t">
        <div className="flex w-full items-center justify-between">
          <div className="text-muted-foreground flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Heart className="h-4 w-4" />
              <span className="text-sm">3</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm">8</span>
            </div>
          </div>
          <span className="text-secondary text-sm font-semibold group-hover:underline">
            자세히 보기
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ReviewCard;
