export { auth as middleware } from "./lib/auth";

export const config = {
  matchers: ["/dashboard", "!/", "/((?!api|_next/static|next/image|favicon.ico)).*"],
};
