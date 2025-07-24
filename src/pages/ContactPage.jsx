import React from "react";
import contactImg from '../assets/img/img-1.jpg';
import Footer from '../components/common/footer';

const ContactPage = () => (
  <div className="contact-root">
    <div className="contact-main">
      <div className="contact-grid">
        {/* Left */}
        <div className="contact-left">
          <div>
            <h1 className="contact-title">GET IN TOUCH</h1>
            <div className="contact-email">
              <a href="mailto:abitude@gmail.com">getcoffee@bluetokaicoffee.com</a>
            </div>
            <div className="contact-desc">
            Have coffee questions, feedback for us, or thoughts to share? We're here for you!
            </div>
          </div>
          <div className="contact-label">CONTACT /</div>
        </div>
        {/* Right */}
        <div className="contact-right">
          <div className="contact-info-img-grid">
            <div>
              <div className="contact-phones">
                <a href="tel:+919606047045">+91 96060 47045</a><br />
                <a href="tel:+919606047077">+91 96060 47077</a>
              </div>
              <div className="contact-location">
                <div className="contact-location-label">LOCATION</div>
                <div className="contact-location-desc">
                Chandigarh | Delhi | Haryana | Karnataka | Maharashtra | Punjab | Telangana | Uttarakhand | Uttar Pradesh | West Bengal
                </div>
              </div>
              <form className="contact-form" autoComplete="off">
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" placeholder="Your Name" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="Your Email" required />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" placeholder="Your Message" rows={4} required></textarea>
                </div>
                <button type="submit" className="form-submit">Send Message</button>
              </form>
            </div>
            <div className="contact-img-wrap">
              <img src={contactImg} alt="contact" className="contact-img" />
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <style>{`
      .contact-root {
        min-height: 100vh;
        background: #000;
        color: #fff;
        font-family: 'DM Sans';
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .contact-main {
        margin: 0 auto;
        width: 100%;
        padding: 8vw 4vw 6vw 4vw;
        flex: 1;
      }
      .contact-grid {
        display: grid;
        grid-template-columns: 1.1fr 1.2fr;
        gap: 5vw;
        align-items: start;
      }
      .contact-left {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 420px;
        height: 100%;
      }
      .contact-title {
        font-size: clamp(2.5rem, 8vw, 7rem);
        font-weight: 500;
        letter-spacing: 0em;
        margin: 0 0 2vw 0;
        line-height: 1.05;
        text-transform: uppercase;
      }
      .contact-email a {
        color: #ffb22c;
        text-decoration: none;
        font-weight: 500;
        font-size: 1.1rem;
        letter-spacing: 0.01em;
        margin-bottom: 0.7vw;
        display: inline-block;
      }
      .contact-desc {
        font-size: 1rem;
        color: #bbb;
        max-width: 340px;
        margin-bottom: 2vw;
        margin-top: 0.5vw;
        line-height: 1.5;
        text-transform: uppercase;
        letter-spacing: 0.01em;
      }
      .contact-label {
        font-size: 1.1rem;
        color: #fff;
        margin-top: 2vw;
        letter-spacing: 0.04em;
        text-transform: uppercase;
      }
      .contact-right {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 2vw;
        padding: 0;
      }
      .contact-info-img-grid {
        display: grid;
        grid-template-columns: 1.2fr 1fr;
        gap: 2vw;
        align-items: start;
      }
      .contact-phones a {
        color: #fff;
        text-decoration: none;
        font-size: 1.1rem;
        font-weight: 600;
        display: inline-block;
        margin-bottom: 0.2vw;
        letter-spacing: 0.01em;
      }
      .contact-location-label {
        font-size: 0.95rem;
        color: #bbb;
        margin: 1.2vw 0 0 0;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.01em;
      }
      .contact-location-desc {
        font-size: 0.95rem;
        color: #bbb;
        margin-bottom: 1vw;
        margin-top: 0.2vw;
        text-transform: uppercase;
        letter-spacing: 0.01em;
      }
      .contact-img-wrap {
        min-width: 120px;
        max-width: 180px;
        margin-left: 2vw;
        margin-top: 0.2vw;
      }
      .contact-img {
        width: 100%;
        border-radius: 4px;
        object-fit: cover;
        aspect-ratio: 1/1;
        filter: grayscale(1);
        display: block;
      }
      .contact-footer {
        width: 100%;
        border-top: 2px solid #222;
        margin-top: 5vw;
        background: #111;
        padding: 2vw 0 1vw 0;
      }
      .contact-footer-inner {
        max-width: 1200px;
        margin: 0 auto;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        padding: 0 6vw;
      }
      .contact-socials {
        display: flex;
        gap: 2vw;
        font-size: 1rem;
        color: #fff;
        flex-wrap: wrap;
        text-transform: uppercase;
        letter-spacing: 0.01em;
      }
      .contact-socials a {
        color: #fff;
        text-decoration: none;
        margin-right: 0.5vw;
        transition: color 0.2s;
      }
      .contact-socials a:hover {
        color: #FFB22C;
      }
      .contact-copyright {
        font-size: 3.5rem;
        font-weight: 700;
        color: #fff;
        display: flex;
        align-items: center;
        gap: 0.5vw;
      }
      .contact-copyright span {
        font-size: 2.2rem;
        font-weight: 400;
        margin-right: 0.2vw;
      }
      .contact-form-section {
        margin-top: 3vw;
        background: #181818;
        border-radius: 10px;
        padding: 2.5vw 2vw 2vw 2vw;
        box-shadow: 0 2px 16px 0 rgba(0,0,0,0.10);
        max-width: 600px;
        margin-left: auto;
        margin-right: 0;
      }
      .contact-form {

        
        border-radius: 10px;
        padding: 2vw 0vw 2vw 0vw;
        box-shadow: 0 2px 16px 0 rgba(0,0,0,0.10);
        max-width: 100%;
      }
      .form-grid {
        display: grid;
        grid-template-columns: 0.8fr 1.2fr;
        gap: 1.5vw;
        margin-bottom: 2vh;
      }
      .form-group {
        display: flex;
        flex-direction: column;
        gap: 0.5vw;
      }
      .form-group label {
        color: #fff;
        font-size: 1rem;
        font-weight: 500;
        margin-bottom: 0.2vw;
        letter-spacing: 0.03em;
        text-transform: uppercase;
      }
      .form-group input,
      .form-group textarea {
        background: #111;
        color: #fff;
        border: 1px solid #333;
        border-radius: 6px;
        padding: 0.8em 1em;
        font-size: 1rem;
        font-family: inherit;
        outline: none;
        transition: border 0.2s;
        resize: none;
      }
      .form-group input:focus,
      .form-group textarea:focus {
        border: 1.5px solid #FFB22C;
      }
      .form-submit {
        background: #FFB22C;
        color: #111;
        font-weight: 700;
        border: none;
        border-radius: 6px;
        padding: 0.9em 2.2em;
        font-size: 1.1rem;
        cursor: pointer;
        margin-top: 1vw;
        width: 100% !important;
        align-self: flex-end;
        transition: background 0.2s;
      }
      .form-submit:hover {
        background: #ffcb5c;
      }
      
      @media (max-width: 600px) {
        .contact-main, .contact-footer-inner {
          padding-left: 6vw;
        padding-right: 9vw;
        padding-top: 20%;
        }
        .contact-grid {
          grid-template-columns: 1fr;
          gap: 2vw;
        }
        .contact-left{
          min-height: 45vh;
          }
        .contact-right {
          flex-direction: column;
          gap: 2vw;
        }

        .contact-location-desc{
          max-width: 70%;
        }

        .contact-location-label{
            margin: 5vw 0 0 0;
        }

        .contact-img-wrap {
          margin-left: 0;
          max-width: 100px;
        }
        .contact-title {
          font-size: clamp(1.5rem, 12vw, 2.5rem);
        }
        .contact-footer-inner {
          flex-direction: column;
          align-items: flex-start;
          gap: 2vw;
        }
        .contact-copyright {
          font-size: 2rem;
        }
        .contact-form {
        }
        .contact-form-title {
          font-size: 1.1rem;
        }
        .contact-form-wrap {
          padding: 6vw 4vw;
          margin-top: 8vw;
        }
        .form-group label {
          font-size: 0.95rem;
        }
        .form-group input,
        .form-group textarea {
          font-size: 0.95rem;
        }
        .form-submit {
          font-size: 1rem;
          padding: 0.8em 1.5em;
        }
.form-group{
          width: 85vw;
        }
        .form-grid{
          grid-template-columns: 1fr;
          gap: 1vw;
          width: 170%;
        }

        
        .contact-img{
        position: absolute;
        top: 35%;
        right: 40px;
        width: 35%;
        height: 30%;
        object-fit: cover;
      
        }

      }
    `}</style>

    {/* Footer Section */}
    <Footer />
  </div>
);

export default ContactPage;