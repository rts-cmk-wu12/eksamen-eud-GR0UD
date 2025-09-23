import Link from "next/link";
import Image from "next/image";

export default function SiteHeader() {
  return (
    <header className='site-header'>
      <div className='site-header__container'>
        <Link href='/' className='site-header__logo'>
          <Image
            src='/Images/Logo.svg'
            alt='SwapHub Logo'
            width={125}
            height={40}
            className='site-header__logo-image'
          />
        </Link>
        <nav className='site-header__nav'>
          <ul className='site-header__nav-list'>
            <li className='site-header__nav-item'>
              <Link href='/' className='site-header__nav-link'>
                Listings
              </Link>
            </li>
            <li className='site-header__nav-item'>
              <Link href='/community' className='site-header__nav-link'>
                Community
              </Link>
            </li>
            <li className='site-header__nav-item'>
              <Link href='/contact' className='site-header__nav-link'>
                Contact
              </Link>
            </li>
            <li className='site-header__nav-item'>
              <Link
                href='/sign-in'
                className='site-header__nav-link site-header__nav-link--signin'
              >
                Sign in
              </Link>
            </li>
            <li className='site-header__nav-item'>
              <Link
                href='/sign-up'
                className='site-header__nav-link site-header__nav-link--register'
              >
                Register
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
