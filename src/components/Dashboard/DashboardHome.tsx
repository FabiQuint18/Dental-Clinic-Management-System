import React from 'react';
import { useAuth } from '../../context/AuthContext';
import AdminDashboard from './AdminDashboard';
import DentistDashboard from './DentistDashboard';
import AssistantDashboard from './AssistantDashboard';
import PatientDashboard from './PatientDashboard';

const DashboardHome: React.FC = () => {
  const { user } = useAuth();

  switch (user?.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'dentist':
      return <DentistDashboard />;
    case 'assistant':
      return <AssistantDashboard />;
    case 'patient':
      return <PatientDashboard />;
    default:
      return <AdminDashboard />;
  }
};

export default DashboardHome;