import { randomInt } from "node:crypto";
import { permanentRedirect } from "next/navigation";

export default function Redirect(request: { params: { url: string } }) {
  const { url } = request.params;
  const seconds = randomInt(6 * 3600 + 12 * 60);
  const redirectionsMap: Record<string, string> = {
    extreme: `https://www.youtube.com/watch?v=msIhtSbcZ6g&t=${seconds}s`,
  };

  const redirection = redirectionsMap[url];
  if (redirection) {
    permanentRedirect(redirection);
  }
  return <></>;
}
