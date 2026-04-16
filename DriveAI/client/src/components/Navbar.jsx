/**
 * Navbar.jsx — Fully responsive fixed navigation bar
 * Uses injected CSS for breakpoints — no inline display style conflicts.
 */
import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";

const NAV_LINKS = [
  { label: "Models",     section: "models"     },
  { label: "Features",   section: "features"   },
  { label: "Compare",    section: "comparison" },
  { label: "Pricing",    section: "pricing"    },
  { label: "Test Drive", section: "booking"    },
  { label: "Contact",    section: "contact"    },
];

const NAV_STYLES = `
  /* ─── Navbar responsive classes ─── */

  .nb-desktop-nav   { display: none; align-items: center; gap: 2px; }
  .nb-cta-btn       { display: none; }
  .nb-currency      { display: none; }
  .nb-hamburger     { display: flex; align-items: center; justify-content: center; }
  .nb-mobile-menu   { display: flex; }

  @media (min-width: 560px) {
    .nb-currency { display: inline-flex; }
  }

  @media (min-width: 768px) {
    .nb-desktop-nav { display: flex; }
    .nb-cta-btn     { display: block; }
    .nb-hamburger   { display: none; }
  }

  /* Nav link hover */
  .nb-link {
    padding: 0.4375rem 0.875rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: #94a3b8;
    background: transparent;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: color 0.2s, background 0.2s;
    white-space: nowrap;
  }
  .nb-link:hover {
    color: #f8fafc;
    background: rgba(255,255,255,0.06);
  }

  /* Mobile menu item */
  .nb-mob-link {
    display: block;
    width: 100%;
    text-align: left;
    padding: 0.75rem 1rem;
    font-size: 0.9375rem;
    font-weight: 500;
    color: #cbd5e1;
    background: transparent;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: color 0.2s, background 0.2s;
  }
  .nb-mob-link:hover {
    color: #f8fafc;
    background: rgba(255,255,255,0.06);
  }

  /* Logo hover */
  .nb-logo-icon {
    transition: transform 0.2s;
  }
  .nb-logo-icon:hover {
    transform: scale(1.08);
  }
`;

const Navbar = () => {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const { currency, scrollToSection } = useApp();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (section) => { scrollToSection(section); setMenuOpen(false); };

  return (
    <>
      <style>{NAV_STYLES}</style>

      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        transition: "background 0.3s, border-color 0.3s, box-shadow 0.3s",
        background: scrolled ? "rgba(10,10,15,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid #1e1e2e" : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.40)" : "none",
      }}>

        {/* ─── Top bar ─── */}
        <div style={{
          maxWidth: "1280px", margin: "0 auto",
          padding: "0 1.25rem",
          height: "68px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: "0.75rem",
        }}>

          {/* Logo */}
          <button
            onClick={() => go("hero")}
            style={{ display:"flex", alignItems:"center", gap:"0.625rem", background:"none", border:"none", cursor:"pointer", flexShrink:0 }}
          >
            <div className="nb-logo-icon" style={{
              width:"38px", height:"38px", borderRadius:"10px",
              background:"linear-gradient(135deg,#6366f1,#8b5cf6)",
              display:"flex", alignItems:"center", justifyContent:"center",
              boxShadow:"0 4px 14px rgba(99,102,241,0.40)", flexShrink:0,
            }}>
              <svg width="18" height="18" fill="none" stroke="white" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div style={{ textAlign:"left" }}>
              <div className="font-display" style={{ fontSize:"1.1875rem", fontWeight:700, lineHeight:1.2 }}>
                <span className="gradient-text">Velocity</span>
                <span style={{ color:"#f8fafc" }}>AI</span>
              </div>
              <div style={{ fontSize:"8px", color:"#475569", textTransform:"uppercase", letterSpacing:"0.18em", marginTop:"1px" }}>
                Motors
              </div>
            </div>
          </button>

          {/* Desktop nav links */}
          <nav className="nb-desktop-nav">
            {NAV_LINKS.map((l) => (
              <button key={l.section} onClick={() => go(l.section)} className="nb-link">{l.label}</button>
            ))}
          </nav>

          {/* Right controls */}
          <div style={{ display:"flex", alignItems:"center", gap:"0.625rem", flexShrink:0 }}>

            {/* Currency pill */}
            <span className="nb-currency" style={{
              alignItems:"center",
              fontSize:"0.75rem", fontWeight:600,
              background:"rgba(99,102,241,0.14)", color:"#a5b4fc",
              padding:"0.25rem 0.75rem", borderRadius:"999px",
              border:"1px solid rgba(99,102,241,0.28)", whiteSpace:"nowrap",
            }}>
              {currency}
            </span>

            {/* CTA button */}
            <button
              onClick={() => go("booking")}
              className="nb-cta-btn btn-neon"
              style={{
                background:"linear-gradient(135deg,#6366f1,#8b5cf6)",
                color:"white", fontWeight:700, fontSize:"0.875rem",
                padding:"0.5rem 1.125rem", borderRadius:"10px", border:"none",
                cursor:"pointer", boxShadow:"0 4px 14px rgba(99,102,241,0.35)",
                whiteSpace:"nowrap", transition:"opacity 0.2s, transform 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity="0.9"; e.currentTarget.style.transform="translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.opacity="1"; e.currentTarget.style.transform="translateY(0)"; }}
            >
              Book Test Drive
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="nb-hamburger"
              style={{ background:"none", border:"none", cursor:"pointer", padding:"6px", color:"#94a3b8" }}
              aria-label="Toggle menu"
            >
              <div style={{ width:"20px", display:"flex", flexDirection:"column", gap:"5px" }}>
                <span style={{ display:"block", height:"2px", background:"currentColor", borderRadius:"2px", transition:"transform 0.3s", transformOrigin:"center",
                  transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none" }} />
                <span style={{ display:"block", height:"2px", background:"currentColor", borderRadius:"2px", transition:"opacity 0.3s",
                  opacity: menuOpen ? 0 : 1 }} />
                <span style={{ display:"block", height:"2px", background:"currentColor", borderRadius:"2px", transition:"transform 0.3s", transformOrigin:"center",
                  transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none" }} />
              </div>
            </button>
          </div>
        </div>

        {/* ─── Mobile menu ─── */}
        {menuOpen && (
          <div style={{
            background:"rgba(7,7,12,0.97)", backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)",
            borderTop:"1px solid #1e1e2e",
            padding:"0.875rem 1.25rem 1.25rem",
            display:"flex", flexDirection:"column", gap:"2px",
          }}>
            {NAV_LINKS.map((l) => (
              <button key={l.section} onClick={() => go(l.section)} className="nb-mob-link">
                {l.label}
              </button>
            ))}
            <button
              onClick={() => go("booking")}
              style={{
                marginTop:"0.75rem", width:"100%",
                background:"linear-gradient(135deg,#6366f1,#8b5cf6)",
                color:"white", fontWeight:700, fontSize:"0.9375rem",
                padding:"0.75rem", borderRadius:"10px", border:"none", cursor:"pointer",
              }}
            >
              Book Test Drive
            </button>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
