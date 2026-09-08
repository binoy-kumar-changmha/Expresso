# React State Management & Styling

## 1. State Management (Preventing Data Loss)
- **Elevate Persistent UI State**: When an application uses conditional rendering (e.g., tab switching or routing), do NOT store persistent interactive data (like reaction counts, likes, or form inputs) in local component state (`useState`). 
- **Use Global Stores**: Always elevate this state to a global store (Context API, Redux, or Zustand) or a parent component that remains mounted, so the data is not lost when child components unmount.
- **Page Reloads**: If the data needs to survive a full page refresh, the global state must be synced with `localStorage` or a backend database.

## 2. Styling & Scalability
- **No Complex Inline CSS**: Strictly avoid using the `style={{...}}` prop in React components for anything other than dynamic, JavaScript-calculated values (e.g., `top: ${y}px`). 
- **Scalable Approaches**: To keep JSX readable and manageable, strictly use one of the following:
  1. **CSS Modules** (e.g., `Component.module.css`) for scoped, pure CSS.
  2. **Tailwind CSS** / **Bootstrap** purely via `className`. If a design requires custom CSS that the framework doesn't provide, put it in a CSS file, not inline.
