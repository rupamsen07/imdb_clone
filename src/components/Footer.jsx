import React from 'react';

/**
 * Footer Component
 * Demonstrates: Static UI and social links.
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-links">
          <span>Help</span>
          <span>Site Index</span>
          <span>IMDbPro</span>
          <span>Box Office Mojo</span>
          <span>IMDb Developer</span>
        </div>
        <div className="footer-social">
          <span>TikTok</span>
          <span>Instagram</span>
          <span>YouTube</span>
          <span>Facebook</span>
          <span>Twitter</span>
        </div>
        <div className="footer-copy">
          <p>© 1990-{currentYear} by IMDb.com, Inc.</p>
        </div>
      </div>

      <style>{`
        .footer {
          padding: 64px 0;
          background: #000;
          border-top: 1px solid rgba(255,255,255,0.05);
          color: #fff;
          text-align: center;
        }

        .footer-links, .footer-social {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 24px;
          margin-bottom: 24px;
        }

        .footer-links span, .footer-social span {
          font-size: 0.9rem;
          font-weight: 700;
          cursor: pointer;
          transition: color 0.2s;
        }

        .footer-links span:hover, .footer-social span:hover {
          color: var(--accent-color);
        }

        .footer-copy {
          margin-top: 32px;
          font-size: 0.8rem;
          color: var(--text-secondary);
        }
      `}</style>
    </footer>
  );
};

export default Footer;
