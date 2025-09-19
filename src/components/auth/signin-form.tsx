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
import { Eye, EyeOff, Heart } from "lucide-react";
import { useSignIn } from "@/hooks/useSignIn";
import { cn } from "@/lib/utils";

const SigninForm = () => {
  // 로그인 커스텀 훅
  const { isPending, onSubmit, form, setShowPassword, showPassword, errors } =
    useSignIn();

  return (
    <Card className="w-full border-0 bg-white/80 shadow-lg backdrop-blur-sm">
      {/* 헤더 */}
      <CardHeader className="pb-6 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-purple-500">
          <Heart className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold text-gray-800">
          로그인
        </CardTitle>
        <CardDescription className="text-gray-600">
          계정에 로그인하여 리뷰를 확인해보세요
        </CardDescription>
      </CardHeader>

      {/* 바디 */}
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/*  이메일 */}
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
                      className="h-12 rounded-xl border-2 border-pink-200 placeholder:text-gray-400 focus:border-pink-400 focus:ring-pink-400/20"
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
                        className="h-12 rounded-xl border-2 border-pink-200 pr-12 placeholder:text-gray-400 focus:border-pink-400 focus:ring-pink-400/20"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute top-1/2 right-2 h-8 w-8 -translate-y-1/2 p-0 hover:bg-pink-100"
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

            {/* 이메일 또는 비밀번호 에러 메시지 */}
            {errors.root && (
              <p className="text-center text-xs text-red-500">
                {errors.root.message}
              </p>
            )}

            {/* 로그인 버튼 */}
            <Button
              type="submit"
              className={cn(
                "h-12 w-full rounded-xl bg-gradient-to-r from-pink-400 to-purple-500 font-medium text-white shadow-lg transition-all duration-200 hover:from-pink-500 hover:to-purple-600 hover:shadow-xl",
                !isPending && "cursor-pointer",
              )}
              disabled={isPending}
            >
              {isPending ? "로그인 중..." : "로그인"}
            </Button>
          </form>
        </Form>
      </CardContent>

      {/* 회원가입 페이지로 이동 */}
      <CardFooter>
        <div className="mx-auto mt-6 text-center text-sm">
          <p className="text-gray-600">
            아직 계정이 없으신가요?
            <Link
              href="/auth/signup"
              className="ml-2 font-medium text-pink-500 hover:text-pink-600"
            >
              회원가입
            </Link>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SigninForm;
