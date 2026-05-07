'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Brand } from './Brand';

const NAV = [
  { href: '/', label: 'หน้าแรก' },
  { href: '/quiz', label: 'ทำนายพลอย' },
  { href: '/about', label: 'เกี่ยวกับเรา' },
  { href: '/products', label: 'สินค้า' },
  { href: '/contact', label: 'ติดต่อ' },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <div className="jg-topbar">
        <Brand asLink />
        <button
          className="jg-nav-toggle"
          aria-label={open ? 'ปิดเมนู' : 'เปิดเมนู'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>

      {open && (
        <div className="jg-nav-drawer" onClick={() => setOpen(false)}>
          <nav className="jg-nav-panel" onClick={(e) => e.stopPropagation()}>
            <div className="jg-nav-eyebrow jg-eyebrow">Menu</div>
            <ul>
              {NAV.map((item) => {
                const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link href={item.href} className={`jg-nav-link ${active ? 'active' : ''}`}>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
