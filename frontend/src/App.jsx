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
import LecturerDashboard from './pages/Lecturer/Pages/Dashboard/index.jsx';
import Bookings from './pages/Lecturer/Pages/Bookings/index.jsx';
import ProfilePage from './pages/Lecturer/Pages/Profile/index.jsx';
import CoursesPage from './pages/Lecturer/Pages/Courses/index.jsx';
import ContentLibraryPage from './pages/Lecturer/Pages/ContentLibrary/index.jsx';
import AssessmentsPage from './pages/Lecturer/Pages/Assessments/index.jsx';
import EarningsPage from './pages/Lecturer/Pages/Earnings/index.jsx';
import ReviewsPage from './pages/Lecturer/Pages/Reviews/index.jsx';
import StudentDashboard from './pages/Students/Pages/Dashboard/index.jsx';




function App()
{
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />

            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/students" element={<StudentsPage />} />
            <Route path="/admin/lecturer" element={<LecturerPage />} />
            <Route path="/admin/courses" element={<CoursePage />} />
            <Route path="/admin/analytics" element={<AnalyticsPageS />} />

            {/* Lecturer Routes */}
            <Route path="/lecturer/dashboard" element={<LecturerDashboard />} />
            <Route path="/lecturer/bookings" element={<Bookings />} />
            <Route path="/lecturer/profile" element={<ProfilePage />} />
            <Route path="/lecturer/courses" element={<CoursesPage />} />
            <Route path="/lecturer/content" element={<ContentLibraryPage />} />
            <Route path='/lecturer/assessments' element={<AssessmentsPage />} />
            <Route path='/lecturer/earnings' element={<EarningsPage />} />
            <Route path='/lecturer/reviews' element={<ReviewsPage />} />

            {/* Student Routes */}
            <Route path='/student/dashboard' element={<StudentDashboard />} />



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