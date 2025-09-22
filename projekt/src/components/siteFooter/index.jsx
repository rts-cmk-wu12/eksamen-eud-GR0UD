import Link from "next/link";
import {
  FaXTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa6";

export default function SiteFooter() {
  return (
    <footer className='site-footer'>
      <div>
        <Link href='/'>
          <Image src='/Images/Logo.svg' alt='Logo' width={150} height={50} />{" "}
        </Link>

        <div className='footer-media-links'>
          <Link href='https://x.com' target='_blank' rel='noopener noreferrer'>
            <FaXTwitter size={30} />
          </Link>
          <Link
            href='https://instagram.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaInstagram size={30} />
          </Link>
          <Link
            href='https://youtube.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaYoutube size={30} />
          </Link>
          <Link
            href='https://linkedin.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaLinkedin size={30} />
          </Link>
        </div>
      </div>

      <div className='footer-nav'>
        <div>
          <h4>About SwapHub</h4>
          <ul>
            <li>
              <Link href='/how-it-works'>How it works</Link>
            </li>
            <li>
              <Link href='/community-guidelines'>Community guidelines</Link>
            </li>
            <li>
              <Link href='/our-mission'>Our mission</Link>
            </li>
            <li>
              <Link href='/contact'>Contact us</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4>Discover</h4>
          <ul>
            <li>
              <Link href='/categories'>Browse categories</Link>
            </li>
            <li>
              <Link href='/popular-swaps'>Popular Swaps</Link>
            </li>
            <li>
              <Link href='/stories'>Successful stories</Link>
            </li>
            <li>
              <Link href='/events'>Upcoming events</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4>Support</h4>
          <ul>
            <li>
              <Link href='/help-center'>Help Center</Link>
            </li>
            <li>
              <Link href='/faqs'>FAQs</Link>
            </li>
            <li>
              <Link href='/safety-tips'>Safety tips</Link>
            </li>
            <li>
              <Link href='/report-issue'>Report an issue</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
