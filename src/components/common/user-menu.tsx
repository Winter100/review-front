"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "@/store/useAuthStore";
import { Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserMenu = () => {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return (
      <div>
        <Link
          href="/auth/signin"
          className="text-primary border-primary rounded-md border p-2 text-xs hover:shadow-md"
        >
          로그인
        </Link>
      </div>
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex cursor-pointer items-center gap-2 rounded-full border border-pink-200 bg-gradient-to-r from-pink-50 to-purple-50 px-4 py-2">
          <Image
            width={32}
            height={32}
            src={"/images/blank_profile.png"}
            alt={"123"}
            // src={user.profileImageUrl || "/images/blank_profile.png"}
            // alt={user.nickname}
            className="rounded-full border-2 border-pink-300"
          />
          <div className="text-sm">
            <div className="font-semibold text-purple-700">김홍길동이</div>
            <div className="flex items-center space-x-1 text-xs text-pink-600">
              <Bell className="h-3 w-3 fill-current" />
              <span>7</span>
            </div>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>내 정보</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>프로필</DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/review/create">리뷰 작성</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>로그아웃</DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/auth/signin">로그인</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/auth/signup">회원가입</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
