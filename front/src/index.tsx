import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { initializeClarity } from './analytics/clarity';

const root = ReactDOM.createRoot(document.getElementById('root'));

initializeClarity();

root.render(<App />);
