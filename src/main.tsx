import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const stored = localStorage.getItem('theme');
let useDark: boolean;
if (stored === 'dark') useDark = true;
else if (stored === 'light') useDark = false;
else useDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
document.documentElement.classList.toggle('dark', useDark);
createRoot(document.getElementById("root")!).render(<App />);
