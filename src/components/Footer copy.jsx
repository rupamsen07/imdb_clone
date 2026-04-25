import React from 'react';


const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="social-links">
          <span>TikTok</span>
          <span>Instagram</span>
          <span>YouTube</span>
          <span>Facebook</span>
          <span>Twitter</span>
        </div>
        
        <div className="footer-links">
          <span>Get the IMDb App</span>
          <span>Help</span>
          <span>Site Index</span>
          <span>IMDbPro</span>
          <span>Box Office Mojo</span>
          <span>IMDb Developer</span>
        </div>

        <div className="footer-links">
          <span>Press Room</span>
          <span>Advertising</span>
          <span>Jobs</span>
          <span>Conditions of Use</span>
          <span>Privacy Policy</span>
          <span>Your Ads Privacy Choices</span>
        </div>

        <div className="amazon-company">an amazon company</div>
        
        <div className="copyright">
          © 1990-{currentYear} by IMDb.com, Inc.
        </div>
      </div>

      <style>{`
        .footer {
          padding: 4rem 0;
          text-align: center;
          color: var(--imdb-text);
          background: var(--imdb-black);
          border-top: 1px solid #333;
        }

        .social-links {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-bottom: 2rem;
          font-weight: bold;
        }

        .footer-links {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 1.5rem;
          margin-bottom: 1rem;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .footer-links span {
          cursor: pointer;
        }

        .footer-links span:hover {
          text-decoration: underline;
        }

        .amazon-company {
          margin: 2rem 0 1rem;
          font-size: 0.8rem;
          color: var(--imdb-text-dim);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .copyright {
          font-size: 0.8rem;
          color: var(--imdb-text-dim);
        }
      `}</style>
    </footer>
  );
};

export default Footer;
