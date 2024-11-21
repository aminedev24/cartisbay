import React from 'react';
import '../css/contact.css';

const Contact = () => {
  return (
    <div class="contact-container">
    <h1>
     We like to hear from you!
    </h1>
    <p>
     Contact Us
    </p>
    <p>
     If you have any questions or would like to learn more about our offerings, please don’t hesitate to reach out using the form below. We’re always eager to connect with our customers and will respond as promptly as possible.
    </p>
    <p>
     If you’re interested in exploring our full inventory and would like to register with us, please use this alternate form to gain access to our complete stock list. We look forward to assisting you!
    </p>
    <form>
     <input placeholder="Your Name" required="" type="text"/>
     <input placeholder="Your Email" required="" type="email"/>
     <textarea placeholder="Your Message" required="" rows="4"></textarea>
     <button type="submit">
      SUBMIT
     </button>
    </form>
    <div class="contact-image-container">
     <img alt="A man in a suit pointing to the contact form"  src={`${process.env.PUBLIC_URL}/images/welcoming.png`}/>
    </div>
   </div>
  );
};

export default Contact;
