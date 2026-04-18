import { useState, useEffect } from 'react';

function App() {
  const [permission, setPermission] = useState(Notification.permission);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      setDeferredPrompt(null);
    }
  };

  const requestNotificationPermission = async () => {
    const status = await Notification.requestPermission();
    setPermission(status);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>PWA Deal Alerts</h1>

      {deferredPrompt && (
        <button onClick={handleInstallClick}>
          Install App
        </button>
      )}

      <p>Permission: {permission}</p>

      {permission !== 'granted' && (
        <button onClick={requestNotificationPermission}>
          Enable Notifications
        </button>
      )}
    </div>
  );
}

export default App;