# Utils

This folder contains utility functions and helper methods used throughout the application.

## Purpose
- Reusable helper functions
- Data formatting utilities
- Common calculations
- String/array manipulation helpers

## Example
```javascript
// formatTime.js
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};
```
