export { default } from "next-auth/middleware";

export const config = { matcher: ["/drafts", "/preview", "/published"] };
