import { Cta, FooterNewsLetter } from "@lib/@types/global.types";
import { KeyboardEvent, useState } from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import { decode } from "html-entities";

export const NewsLetter: React.FC<FooterNewsLetter> = ({
  title,
  placeholder,
  ctaButton,
}) => {
  const MAILCHIMP_URL = process.env.NEXT_PUBLIC_MAILCHIMP_URL;

  return (
    <section className="w-full lg:absolute lg:right-0 top-0 max-w-lg | font-semibold">
      <div className="mb-4 text-left">{title}</div>

      <MailchimpSubscribe
        url={MAILCHIMP_URL as string}
        render={(props) => {
          const { subscribe, status, message } = props || {};

          return (
            <Form
              status={status}
              message={message}
              ctaButton={ctaButton}
              placeholder={placeholder}
              onValidated={(formData) => subscribe(formData)}
            />
          );
        }}
      />
    </section>
  );
};

interface IForm {
  status: "error" | "success" | "sending" | null;
  message: string | Error | null;
  placeholder: string;
  ctaButton: Cta;
  onValidated: (formData: any) => void;
}

const Form: React.FC<IForm> = ({
  placeholder,
  message,
  onValidated,
  status,
  ctaButton,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  const handleFormSubmit = () => {
    setError(null);
    if (!email) {
      setError("Please enter a valid email address");
      return null;
    }
    const isFormValidated = onValidated({ EMAIL: email });
    // On success return true
    return email && email.indexOf("@") > -1 && isFormValidated;
  };

  const handleInputKeyEvent = (event: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      handleFormSubmit();
    }
  };

  const getMessage = (message: any) => {
    if (!message) {
      return null;
    }
    const result = message?.split("-") ?? null;
    if ("0" !== result?.[0]?.trim()) {
      return decode(message);
    }
    const formattedMessage = result?.[1]?.trim() ?? null;
    return formattedMessage ? decode(formattedMessage) : null;
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleFormSubmit();
        }}
        className="relative flex | px-5 py-3  | border__round"
      >
        <input
          type="text"
          className="flex-1 | md:pl-3 pl-0 | bg-transparent outline-none placeholder:text-sm"
          placeholder={placeholder}
          onChange={(event) => setEmail(event?.target?.value ?? "")}
          onKeyUp={(event) => handleInputKeyEvent(event)}
        />
        <button
          type="submit"
          className="absolute right-5 top-0 h-full text-body-2 lg:text-body-1"
        >
          {ctaButton.title}
        </button>
      </form>

      <div className="newsletter-form-info">
        {status === "sending" && <div>Sending...</div>}
        {status === "error" || error ? (
          <div
            className="newsletter-form-error"
            dangerouslySetInnerHTML={{
              __html: error || (getMessage(message) as string),
            }}
          />
        ) : null}
        {status === "success" && !error && (
          <div
            dangerouslySetInnerHTML={{ __html: decode(message as string) }}
          />
        )}
      </div>
    </>
  );
};
