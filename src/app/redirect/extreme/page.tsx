import { randomInt } from "node:crypto";
import { permanentRedirect } from "next/navigation";

export default function Redirect(request: { params: { url: string } }) {
  const seconds = randomInt(6 * 3600 + 12 * 60);
  permanentRedirect(
    `https://www.youtube.com/watch?v=msIhtSbcZ6g&t=${seconds}s`
  );
}
