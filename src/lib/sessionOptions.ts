import { IronSessionOptions } from "iron-session";

export const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD || "your-secret-key-should-be-32-characters-long",
  cookieName: "myapp_session",
  ttl: 60 * 60 * 24 * 7, // 7 天
  cookieOptions: {
    secure: process.env.NODE_ENV === "production", // 仅 HTTPS
    httpOnly: true,
    sameSite: "lax",
  },
};

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
      name: string;
    };
    isLoggedIn?: boolean;
  }
}
