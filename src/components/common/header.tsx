"use client";
import { Heart, Star } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import Image from "next/image";

const Header = () => {
  const user = useAuthStore((state) => state.user);
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

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            <Link href="#">
              <Star className="h-4 w-4" />
              테스트
            </Link>
          </div>

          {/* CTA Button */}
          {user ? (
            <>
              {/* Logged-in user UI */}
              {/* Todo: 메뉴 추가 하기 */}
              <div className="flex items-center space-x-3 rounded-full border border-pink-200 bg-gradient-to-r from-pink-50 to-purple-50 px-4 py-2">
                <Image
                  width={32}
                  height={32}
                  src={user.profileImageUrl || "/images/blank_profile.png"}
                  alt={user.nickname}
                  className="rounded-full border-2 border-pink-300"
                />
                <div className="text-sm">
                  <div className="font-semibold text-purple-700">
                    {user.nickname}
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-pink-600">
                    <Star className="h-3 w-3 fill-current" />
                    <span>리뷰마스터 • 7개 리뷰</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="hidden md:block">
              <Link href="/auth/signin" className="text-primary mr-2 text-sm">
                로그인
              </Link>

              <Link
                href="/review/create"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground cursor-pointer rounded-full px-6 py-2"
              >
                리뷰 작성하기
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          {/* <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              // onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-primary"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div> */}
        </div>

        {/* Mobile Navigation */}
        {/* {isMenuOpen && (
          <div className="space-y-2 py-4 md:hidden">
            <MobileNavItem
              icon={<Star className="h-4 w-4" />}
              text="인기 리뷰"
            />
            <MobileNavItem
              icon={<Search className="h-4 w-4" />}
              text="카테고리"
            />
            <MobileNavItem
              icon={<Heart className="h-4 w-4" />}
              text="찜한 리뷰"
            />
            <MobileNavItem icon={<User className="h-4 w-4" />} text="내 리뷰" />
            <div className="pt-2">
              <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground w-full rounded-full">
                리뷰 작성하기
              </Button>
            </div>
          </div>
        )} */}
      </div>
    </nav>
  );
};

export default Header;
