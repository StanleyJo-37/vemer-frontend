import { cookies } from "next/headers";
import "server-only";

export default async function verifyAuth() {
  const cookie = await cookies();
  const token = cookie.get("vemer_token")?.value;

  console.log(token);

  return {
    isAuth: token != undefined,
  };
}
