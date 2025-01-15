'use client';

import { useEffect, useState } from "react";
import { setCookie, parseCookies } from "nookies";
import { Card, Button } from "@nextui-org/react";
import { CookieConsentProps } from "@/types/types";

const CookieConsentBanner: React.FC<CookieConsentProps> = ({
  cookieName,
  cookieExpirationDays = 365, // expiration period for cookie
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const cookies = parseCookies();
      if (!cookies[cookieName]) {
        setIsVisible(true); // Show banner if cookie doesn't exist
      }
    } catch (error) {
      console.error("Error parsing cookies:", error);
      setError("There was an issue loading your preferences.");
    }
  }, [cookieName]);

  const handleAccept = () => {
    try {
      setCookie(null, cookieName, "accepted", {
        maxAge: cookieExpirationDays * 24 * 60 * 60,
        path: "/",
      });
      setIsVisible(false); // Hide banner after consent
    } catch (error) {
      console.error("Error setting the cookie:", error);
      setError("There was an issue saving your preferences.");
    }
  };

  const handleReject = () => {
    try {
      setCookie(null, cookieName, "rejected", {
        maxAge: cookieExpirationDays * 24 * 60 * 60,
        path: "/",
      });
      setIsVisible(false); // Hide banner after rejection
    } catch (error) {
      console.error("Error setting the cookie:", error);
      setError("There was an issue saving your preferences.");
    }
  };

  if (!isVisible || error) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent banner"
    >
      <Card
        style={{
          maxWidth: "500px",
          padding: "32px",
          backgroundColor: "#ffffff",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25)",
          borderRadius: "16px",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <h2 className="text-xl font-bold text-black text-center mb-4">
  We Value Your Privacy
</h2>

        <p className="text-sm text-center text-gray-700 mb-6">
          This website uses cookies to improve your experience and analyze
          performance. Do you accept the use of cookies?
        </p>
        <div className="flex justify-around gap-4">
          <Button
            size="lg"
            onClick={handleReject}
            style={{
              color: "#e53e3e",
              border: "2px solid #e53e3e",
              borderRadius: "12px",
              backgroundColor: "transparent",
              cursor: "pointer",
              padding: "12px 24px",
            }}
            aria-label="Reject cookies"
          >
            Reject
          </Button>
          <Button
            size="lg"
            onClick={handleAccept}
            style={{
              color: "#48bb78",
              border: "2px solid #48bb78",
              borderRadius: "12px",
              backgroundColor: "transparent",
              cursor: "pointer",
              padding: "12px 24px",
            }}
            aria-label="Accept cookies"
          >
            Accept
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CookieConsentBanner;
