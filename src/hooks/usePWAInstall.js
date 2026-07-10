import { useEffect, useState } from "react";

export default function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [canInstall, setCanInstall] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();

      setDeferredPrompt(e);
      setCanInstall(true);
    };

    window.addEventListener(
      "beforeinstallprompt",
      handler
    );

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handler
      );
    };
  }, []);

  const install = async () => {
  if (!deferredPrompt) {
    return false;
  }

  deferredPrompt.prompt();

  const choiceResult =
    await deferredPrompt.userChoice;

  if (choiceResult.outcome === "accepted") {
    setDeferredPrompt(null);
    setCanInstall(false);
  }

  return true;
};

  return {
    canInstall,
    install,
  };
}