// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/Home/index.jsx';
import ContactPage from './pages/Contact/index.jsx';
import AboutPage from './pages/About/index.jsx';




function App()
{
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />

            {/* Add a catch-all route for 404 errors */}
            <Route path="*" element={
              <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
                <p className="text-lg mb-8">The page you're looking for doesn't exist or has been moved.</p>
                <a href="/" className="text-blue-600 hover:underline">Go back to home</a>
              </div>
            } />
          </Routes>
        </main>

      </div>
    </Router>
  );
}

export default App;