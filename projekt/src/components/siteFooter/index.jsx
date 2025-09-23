import Link from "next/link";
import Image from "next/image";
import {
  FaXTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa6";

export default function SiteFooter() {
  // Array and objects
  const navigationSections = [
    {
      title: "About SwapHub",
      links: [
        { href: "/how-it-works", text: "How it works" },
        { href: "/community-guidelines", text: "Community guidelines" },
        { href: "/our-mission", text: "Our mission" },
        { href: "/contact", text: "Contact us" },
      ],
    },
    {
      title: "Discover",
      links: [
        { href: "/categories", text: "Browse categories" },
        { href: "/popular-swaps", text: "Popular Swaps" },
        { href: "/stories", text: "Successful stories" },
        { href: "/events", text: "Upcoming events" },
      ],
    },
    {
      title: "Support",
      links: [
        { href: "/help-center", text: "Help Center" },
        { href: "/faqs", text: "FAQs" },
        { href: "/safety-tips", text: "Safety tips" },
        { href: "/report-issue", text: "Report an issue" },
      ],
    },
  ];

  return (
    <footer className='site-footer'>
      <div className='site-footer__brand-section'>
        <Link href='/' className='site-footer__logo-link'>
          <Image
            src='/Images/Logo.svg'
            alt='Logo'
            width={125}
            height={40}
            className='site-footer__logo'
          />
        </Link>

        <div className='site-footer__social-links'>
          <Link
            href='https://x.com'
            target='_blank'
            rel='noopener noreferrer'
            className='site-footer__social-link'
          >
            <FaXTwitter size={30} className='site-footer__social-icon' />
          </Link>
          <Link
            href='https://instagram.com'
            target='_blank'
            rel='noopener noreferrer'
            className='site-footer__social-link'
          >
            <FaInstagram size={30} className='site-footer__social-icon' />
          </Link>
          <Link
            href='https://youtube.com'
            target='_blank'
            rel='noopener noreferrer'
            className='site-footer__social-link'
          >
            <FaYoutube size={30} className='site-footer__social-icon' />
          </Link>
          <Link
            href='https://linkedin.com'
            target='_blank'
            rel='noopener noreferrer'
            className='site-footer__social-link'
          >
            <FaLinkedin size={30} className='site-footer__social-icon' />
          </Link>
        </div>
      </div>

      <div className='site-footer__navigation'>
        {navigationSections.map((section, index) => (
          <div key={index} className='site-footer__nav-column'>
            <h4 className='site-footer__nav-title'>{section.title}</h4>
            <ul className='site-footer__nav-list'>
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex} className='site-footer__nav-item'>
                  <Link href={link.href} className='site-footer__nav-link'>
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
