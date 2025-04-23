// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/Home/index.jsx';
import ContactPage from './pages/Contact/index.jsx';
import AboutPage from './pages/About/index.jsx';
import ErrorPage from './pages/404/index.jsx';
import AdminDashboard from './pages/Admin/pages/Dashboard/index.jsx';
import StudentsPage from './pages/Admin/pages/Students/index.jsx';
import LecturerPage from './pages/Admin/pages/Lecturer/index.jsx';
import CoursePage from './pages/Admin/pages/Courses/index.jsx';
import AnalyticsPageS from './pages/Admin/pages/Analytics/index.jsx';




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
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/students" element={<StudentsPage />} />
            <Route path="/admin/lecturer" element={<LecturerPage />} />
            <Route path="/admin/courses" element={<CoursePage />} />
            <Route path="/admin/analytics" element={<AnalyticsPageS />} />
            {/* Add a catch-all route for 404 errors */}
            <Route path="*" element={
              <ErrorPage />
            } />
          </Routes>
        </main>

      </div>
    </Router>
  );
}

export default App;