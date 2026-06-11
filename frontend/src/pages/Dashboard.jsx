import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import AdminDashboard from '../components/dashboards/AdminDashboard';
import StudentDashboard from '../components/dashboards/StudentDashboard';
import FacultyDashboard from '../components/dashboards/FacultyDashboard';

export default function Dashboard() {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <main className="dashboard-container">
      {user.role === 'admin' && <AdminDashboard />}
      {user.role === 'student' && <StudentDashboard />}
      {user.role === 'faculty' && <FacultyDashboard />}
    </main>
  );
}