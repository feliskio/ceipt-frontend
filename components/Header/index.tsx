import Link from 'next/link';

import style from './header.module.css';

export default function Header() {
  return (
    <header className={style.header}>
      <Link href="/">
        <a className={style.logo}>
          <img src="/logo.png" alt="Ceipt" className={style.logo} />
        </a>
      </Link>

      <nav className={style.nav}>
        <Link href="/all">
          <a className={style.headerLink}>
            All Receipts
          </a>
        </Link>
        <Link href="/">
          <a className={style.headerLink}>
            Upload Receipt
          </a>
        </Link>
        <a href="#">
          <img src="/appleComingSoonButton.svg" alt="get us on the app store" />
        </a>
      </nav>
    </header>
  );
}
