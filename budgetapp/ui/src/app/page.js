import Link from "next/link";

export default function Home() {
  return (
    <div className='App'>
        <nav>
            <ul>
              <li><Link href="/dashboard">dashboard</Link></li>
              <li><Link href="/registration">Login</Link></li>
              <li><Link href="/signup">Signup</Link></li>
            </ul>
        </nav>
    </div>
  );
}
