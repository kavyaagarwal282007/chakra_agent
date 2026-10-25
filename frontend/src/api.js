// Base URL configuration: detects if port is proxied or directly targeting FastAPI port 8000
const API_BASE_URL = 
  window.location.port === '8000'
    ? ''
    : (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://127.0.0.1:8000'
    : '';

export async function fetchStatus() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/status`);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    return await res.json();
  } catch (err) {
    // Fallback to relative proxy
    try {
      const resFallback = await fetch('/api/status');
      if (resFallback.ok) return await resFallback.json();
    } catch {
      // pass
    }
    console.warn('Backend /api/status fetch failed, fallback to local state:', err);
    return null;
  }
}

export async function triggerPasswordResetDemo(payload) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/demo/password-reset`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload || {})
    });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    return await res.json();
  } catch (err) {
    // Fallback to relative proxy
    try {
      const resFallback = await fetch('/api/demo/password-reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload || {})
      });
      if (resFallback.ok) return await resFallback.json();
    } catch {
      // pass
    }
    console.error('Failed to trigger password reset demo:', err);
    throw err;
  }
}
