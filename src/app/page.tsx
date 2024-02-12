import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Home() {

  return (
    <main>
      <Link href="/register">Register Page</Link>
      <Link href="/login">Login Page</Link>
    </main>
  );
}
