import Link from "next/link";

export default function Home() {
  return (
    <div className='App'>
        <nav>
            <ul>
              <li><Link href="/dashboard">Dashboard</Link></li>
              <li><Link href="/auth">Signup</Link></li>
            </ul>
        </nav>
    </div>
  );
}
