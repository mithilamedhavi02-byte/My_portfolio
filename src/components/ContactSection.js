import React, { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EarthCanvas from "./EarthCanvas";

const ContactSection = ({ form, formLoading, isSubmitted, onChange, onSubmit }) => {
  const formRef = useRef();

  return (
    <section id="contact" className="contact-3d">
      <div className="contact-3d-container">

        {/* LEFT SIDE – CONTACT FORM */}
        <motion.div
          className="contact-left"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="contact-subtitle">GET IN TOUCH</h2>
          <h1 className="contact-title">Contact.</h1>

          <form ref={formRef} onSubmit={onSubmit} className="contact-form">
            <input
              type="text"
              name="name"
              placeholder="What's your name?"
              value={form.name}
              onChange={onChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="What's your email?"
              value={form.email}
              onChange={onChange}
              required
            />

            <textarea
              name="message"
              placeholder="What do you want to say?"
              rows="5"
              value={form.message}
              onChange={onChange}
              required
            />

            <button type="submit" disabled={formLoading}>
              {formLoading ? "Sending..." : "Send"}
            </button>
          </form>
        </motion.div>

        {/* RIGHT SIDE – 3D EARTH */}
        <motion.div
          className="contact-right"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <EarthCanvas />
        </motion.div>

      </div>
    </section>
  );
};

export default ContactSection;
