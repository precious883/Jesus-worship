import { useState } from 'react';

const CHURCH_EMAIL = 'jesusworshipministry15@gmail.com';

export default function Contact() {
  const [status, setStatus] = useState('idle');

  const handleSubmit = async e => {
    e.preventDefault();
    const form = e.target;
    const data = Object.fromEntries(new FormData(form));
    setStatus('sending');

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${CHURCH_EMAIL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
          _subject: `Website message from ${data.name}`,
          _replyto: data.email,
          _template: 'table',
          _captcha: 'false',
        }),
      });
      const result = await res.json();
      if (!res.ok || result.success === 'false' || result.success === false) throw new Error('send failed');
      setStatus('sent');
      form.reset();
    } catch {
      // Fall back to the visitor's own email app, addressed to the church.
      const body = `${data.message}\n\nFrom: ${data.name} (${data.email})`;
      window.location.href = `mailto:${CHURCH_EMAIL}?subject=${encodeURIComponent(`Website message from ${data.name}`)}&body=${encodeURIComponent(body)}`;
      setStatus('fallback');
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container contact-inner">
        <p className="eyebrow">We'd love to hear from you</p>
        <h2 className="section-title">Get in Touch</h2>
        <div className="contact-grid reveal-up" data-reveal>
          <div className="contact-info">
            <p><strong>Address:</strong> Behind J.D courtyard hotel, Osubi, Delta state, Nigeria</p>
            <p><strong>Email:</strong> jesusworshipministry15@gmail.com</p>
            <p><strong>Phone:</strong> <a href="tel:+2349125126298">09125126298</a></p>
            <p><strong>WhatsApp:</strong> <a href="https://wa.me/2349125126298" target="_blank" rel="noopener noreferrer">Chat with us on WhatsApp</a></p>
            <p><strong>Service Times:</strong> Sundays: Sunday School at 8:00 AM and Breakthrough Service at 9:00 AM; Tuesdays at 10:00 AM for Open Heaven Prophetic Program; Fridays at 4:00 PM for Divine Encounter Service</p>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="email" name="email" placeholder="Your Email" required />
            <textarea name="message" rows="4" placeholder="Your Message" required></textarea>
            <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send Message'}
            </button>
            {status === 'sent' && <p role="status">Thank you for reaching out! Your message has been sent to the church. We will get back to you soon.</p>}
            {status === 'fallback' && <p role="status">Your email app should open with the message ready to send to the church.</p>}
          </form>
        </div>
      </div>
    </section>
  );
}
