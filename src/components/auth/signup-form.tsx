"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSignUp } from "@/hooks/useSignUp";

const SignupForm = () => {
  // 회원가입 커스텀 훅
  const {
    form,
    showConfirmPassword,
    showPassword,
    isPending,
    onSubmit,
    setShowConfirmPassword,
    setShowPassword,
  } = useSignUp();

  return (
    <Card className="w-full border-0 bg-white/80 shadow-lg backdrop-blur-sm">
      {/* 헤더 */}
      <CardHeader className="pb-6 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-pink-500">
          <UserPlus className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold text-gray-800">
          회원가입
        </CardTitle>
        <CardDescription className="text-gray-600">
          귀여운 리뷰 커뮤니티에 참여해보세요
        </CardDescription>
      </CardHeader>

      {/* 바디 */}
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* 이메일 */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-gray-700">
                    이메일
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="cute@example.com"
                      className="h-12 rounded-xl border-2 border-yellow-200 placeholder:text-gray-400 focus:border-yellow-400 focus:ring-yellow-400/20"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 닉네임 */}
            <FormField
              control={form.control}
              name="nickname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-gray-700">
                    닉네임
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="귀여운 닉네임"
                      className="h-12 rounded-xl border-2 border-yellow-200 placeholder:text-gray-400 focus:border-yellow-400 focus:ring-yellow-400/20"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 비밀번호 */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-gray-700">
                    비밀번호
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="h-12 rounded-xl border-2 border-yellow-200 pr-12 placeholder:text-gray-400 focus:border-yellow-400 focus:ring-yellow-400/20"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute top-1/2 right-2 h-8 w-8 -translate-y-1/2 p-0 hover:bg-yellow-100"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-500" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-500" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 비밀번호 확인 */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-gray-700">
                    비밀번호 확인
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="h-12 rounded-xl border-2 border-yellow-200 pr-12 placeholder:text-gray-400 focus:border-yellow-400 focus:ring-yellow-400/20"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute top-1/2 right-2 h-8 w-8 -translate-y-1/2 p-0 hover:bg-yellow-100"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-500" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-500" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 가입 버튼 */}
            <Button
              type="submit"
              className={cn(
                "h-12 w-full rounded-xl bg-gradient-to-r from-yellow-400 to-pink-500 font-medium text-white shadow-lg transition-all duration-200 hover:from-yellow-500 hover:to-pink-600 hover:shadow-xl",
                !isPending && "cursor-pointer",
              )}
              disabled={isPending}
            >
              {isPending ? "가입 중..." : "회원가입"}
            </Button>
          </form>
        </Form>
      </CardContent>

      {/* 로그인 페이지로 이동 */}
      <CardFooter>
        <div className="mx-auto mt-6 text-center text-sm">
          <p className="text-gray-600">
            이미 계정이 있으신가요?
            <Link
              href="/auth/signin"
              className="ml-2 font-medium text-yellow-600 hover:text-yellow-700"
            >
              로그인
            </Link>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SignupForm;
