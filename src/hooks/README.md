# Hooks

This folder contains custom React hooks for reusable stateful logic.

## Purpose
- Custom React hooks
- Shared state management
- Side effect handling
- Reusable component logic

## Example
```javascript
// useTimer.js
import { useState, useEffect } from 'react';

export const useTimer = (initialTime) => {
  const [time, setTime] = useState(initialTime);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(t => t > 0 ? t - 1 : 0);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return time;
};
```
