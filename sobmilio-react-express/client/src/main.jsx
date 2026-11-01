import React from 'react';
import { createRoot } from 'react-dom/client';
import './shell.css';
function App(){return <main className="storefront-shell"><iframe title="Sobmilio online marketplace" src="/original-homepage.html" loading="eager" /></main>}
createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
