import Link from "next/link";
import { useSession } from "next-auth/react";
import CategorySelection from "./dashboard/addProduct/categorySelection";

export default function Home() {

  return (
    <main>
      <Link href="./register">Register Page</Link>
      <Link href="./login">Login Page</Link>
      <Link href="./dashboard">Dashboard</Link>
      <CategorySelection></CategorySelection>
    </main>
  );
}
