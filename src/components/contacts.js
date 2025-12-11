// src/components/Contact.js
import React from 'react';

const Contact = () => (
  <div className="contact">
    <h2>Contact Me</h2>
    <form>
      <label>
        Name:
        <input type="text" name="name" />
      </label>
      <label>
        Email:
        <input type="email" name="email" />
      </label>
      <label>
        Message:
        <textarea name="message"></textarea>
      </label>
      <button type="submit">Send</button>
    </form>
  </div>
);

export default Contact;
