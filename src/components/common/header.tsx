"use client";
import Link from "next/link";
import UserMenu from "./user-menu";
import { Heart, Star } from "lucide-react";
import { useMe } from "@/hooks/useMe";

const Header = () => {
  useMe();

  return (
    <nav className="bg-muted/50 border-border/50 sticky top-0 z-50 border-b backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-secondary rounded-full p-2">
              <Heart
                className="text-secondary-foreground h-6 w-6"
                fill="currentColor"
              />
            </div>
            <span className="text-primary text-xl font-bold">{"리뷰미"}</span>
          </Link>

          <div className="hidden items-center space-x-8 md:flex">
            <Link href="#">
              <Star className="h-4 w-4" />
              테스트
            </Link>
          </div>

          <div className="min-w-24">
            {/* Todo: 데이터 가져올때 까지 아무것도 안띄우기? */}
            <UserMenu />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
