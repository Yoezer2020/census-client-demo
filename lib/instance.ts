"use server";

import { cookies } from "next/headers";

export default async function headers() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  return {
    Authorization: `Bearer ${token?.value}`,
  };
}
