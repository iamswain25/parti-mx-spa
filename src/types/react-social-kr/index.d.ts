declare module "react-social-kr" {
  export declare const NaverBlogButton: React.FC<{ pathname: string }>;
  export declare const KaKaoStoryButton: React.FC<{ pathname: string }>;
  export declare const KaKaoTalkButton: React.FC<{
    pathname: string;
    id: string;
    jsKey: string;
    media?: string;
    message?: string;
  }>;
}
