import ContactForm from "@/components/forms/contactForm";
import NewsLetterForm from "@/components/forms/newsLetterForm";

export const metadata = { title: "Contact" };

export default function Contact() {
  return (
    <>
      <div
        style={{
          padding: "2rem",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: "2rem",
        }}
      >
        <ContactForm />
        <NewsLetterForm />
      </div>
    </>
  );
}
