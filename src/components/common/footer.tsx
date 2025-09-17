import { Coffee, Heart, Star } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-border/50 border-t px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo and description */}
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center space-x-2">
              <div className="bg-secondary rounded-full p-2">
                <Heart
                  className="text-secondary-foreground h-6 w-6"
                  fill="currentColor"
                />
              </div>
              <span className="text-primary text-xl font-bold">{"리뷰미"}</span>
            </div>
            <p className="text-muted-foreground mb-4 text-pretty">
              {
                "진솔한 리뷰로 더 나은 선택을 도와드려요. 함께 만들어가는 리뷰 커뮤니티에서 소중한 경험을 나누세요! ✨"
              }
            </p>
            <div className="text-muted-foreground flex items-center space-x-2 text-sm">
              <Coffee className="h-4 w-4" />
              <span>{"매일 새로운 리뷰가 업데이트돼요"}</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-foreground mb-4 font-semibold">
              {"빠른 링크"}
            </h3>
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  {"인기 리뷰"}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  {"최신 리뷰"}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  {"카테고리"}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  {"리뷰 작성하기"}
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-foreground mb-4 font-semibold">{"고객지원"}</h3>
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  {"자주 묻는 질문"}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  {"문의하기"}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  {"이용약관"}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  {"개인정보처리방침"}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-border/50 mt-8 flex flex-col items-center justify-between border-t pt-8 md:flex-row">
          <p className="text-muted-foreground mb-4 text-sm md:mb-0">
            {"© 2024 리뷰미. All rights reserved. Made with"}{" "}
            <Heart
              className="text-secondary mx-1 inline h-4 w-4"
              fill="currentColor"
            />{" "}
            {"in Korea"}
          </p>
          <div className="flex items-center space-x-4">
            <div className="text-muted-foreground flex items-center space-x-1 text-sm">
              <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
              <span>{"4.9/5 사용자 만족도"}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
