import CookieConsentBanner from "@/components/CookieConsentBanner";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <CookieConsentBanner cookieName="userConsent" cookieExpirationDays={365} />
      <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold text-center">
        Welcome to the Albert Plus
      </h1>
    </div>
  );
}
