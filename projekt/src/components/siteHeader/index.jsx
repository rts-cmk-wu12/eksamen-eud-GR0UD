import Link from "next/link";
import Image from "next/image";

export default function SiteHeader() {
  return (
    <header className='site-header'>
      <Link href='/'>
        <Image src='/Images/Logo.svg' alt='Logo' width={50} height={50} />
      </Link>
      <nav>
        <ul>
          <li>
            <Link href='/'>Listings</Link>
          </li>
          <li>
            <Link href='/community'>Community</Link>
          </li>
          <li>
            <Link href='/contact'>Contact</Link>
          </li>
          <li>
            <Link href='/sign-in'>Sign In</Link>
          </li>
          <li>
            <Link href='/sign-up'>Sign Up</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
