# Services

This folder contains API services and external integrations.

## Purpose
- API calls
- WebSocket connections
- Authentication services
- Code execution services
- Database interactions

## Example
```javascript
// api.js
const API_BASE = 'https://api.codegram.com';

export const submitCode = async (code, problemId) => {
  const response = await fetch(`${API_BASE}/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, problemId })
  });
  return response.json();
};
```
