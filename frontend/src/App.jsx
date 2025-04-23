// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/Home/index.jsx';
import ContactPage from './pages/Contact/index.jsx';
import AboutPage from './pages/About/index.jsx';
import ErrorPage from './pages/404/index.jsx';
import FooterComponent from './components/ui/Components/Footer.jsx';




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
              <ErrorPage />
            } />
          </Routes>
        </main>
        <FooterComponent />
      </div>
    </Router>
  );
}

export default App;