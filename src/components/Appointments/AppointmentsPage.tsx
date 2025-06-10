import React, { useState } from 'react';
import { Calendar, Plus, Filter, Search, Clock, User, CheckCircle, XCircle } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

const AppointmentsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showNewAppointment, setShowNewAppointment] = useState(false);
  const { appointments } = useData();
  const { user } = useAuth();

  const mockAppointments = [
    {
      id: '1',
      time: '09:00',
      patient: 'Ana García',
      dentist: 'Dr. González',
      service: 'Limpieza dental',
      status: 'confirmed',
      duration: '1h'
    },
    {
      id: '2',
      time: '10:30',
      patient: 'Carlos López',
      dentist: 'Dr. Martínez',
      service: 'Revisión ortodoncia',
      status: 'pending',
      duration: '45min'
    },
    {
      id: '3',
      time: '14:00',
      patient: 'María Rodríguez',
      dentist: 'Dr. González',
      service: 'Endodoncia',
      status: 'confirmed',
      duration: '2h'
    },
    {
      id: '4',
      time: '15:30',
      patient: 'Juan Pérez',
      dentist: 'Dr. López',
      service: 'Extracción',
      status: 'completed',
      duration: '1h'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-purple-600" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'completed':
        return 'bg-purple-100 text-purple-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmada';
      case 'pending':
        return 'Pendiente';
      case 'completed':
        return 'Completada';
      case 'cancelled':
        return 'Cancelada';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {user?.role === 'patient' ? 'Mis Citas' : 'Gestión de Citas'}
          </h1>
          <p className="text-gray-600 mt-1">
            {user?.role === 'patient' 
              ? 'Consulta y gestiona tus citas médicas'
              : 'Administra las citas de la clínica'
            }
          </p>
        </div>
        {user?.role !== 'patient' && (
          <button
            onClick={() => setShowNewAppointment(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Nueva Cita
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por paciente o servicio..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">Todos los estados</option>
              <option value="pending">Pendientes</option>
              <option value="confirmed">Confirmadas</option>
              <option value="completed">Completadas</option>
              <option value="cancelled">Canceladas</option>
            </select>
            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Calendar View Toggle */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Citas de Hoy - {new Date().toLocaleDateString('es-CO', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </h2>
          <button className="flex items-center gap-2 px-3 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors">
            <Calendar className="w-4 h-4" />
            Vista Calendario
          </button>
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {mockAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="text-center min-w-[60px]">
                  <div className="text-lg font-bold text-gray-900">{appointment.time}</div>
                  <div className="text-xs text-gray-500">{appointment.duration}</div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{appointment.patient}</h3>
                    <p className="text-sm text-gray-600">{appointment.service}</p>
                    {user?.role !== 'patient' && (
                      <p className="text-xs text-gray-500">con {appointment.dentist}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getStatusColor(appointment.status)}`}>
                  {getStatusIcon(appointment.status)}
                  {getStatusText(appointment.status)}
                </span>
                
                {user?.role !== 'patient' && (
                  <div className="flex gap-1">
                    <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                      <Calendar className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <XCircle className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {mockAppointments.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay citas programadas</h3>
            <p className="text-gray-600 mb-6">
              {user?.role === 'patient' 
                ? 'No tienes citas programadas para hoy'
                : 'No hay citas programadas para hoy'
              }
            </p>
            {user?.role !== 'patient' && (
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium px-4 py-2 rounded-lg transition-colors">
                Programar Primera Cita
              </button>
            )}
          </div>
        )}
      </div>

      {/* Patient Quick Actions */}
      {user?.role === 'patient' && (
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Acciones Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 transition-colors text-left">
              <Plus className="w-6 h-6 text-purple-600 mb-2" />
              <h3 className="font-semibold text-gray-900">Solicitar Cita</h3>
              <p className="text-sm text-gray-600">Agenda una nueva cita médica</p>
            </button>
            <button className="p-4 bg-pink-50 hover:bg-pink-100 rounded-lg border border-pink-200 transition-colors text-left">
              <Calendar className="w-6 h-6 text-pink-600 mb-2" />
              <h3 className="font-semibold text-gray-900">Ver Historial</h3>
              <p className="text-sm text-gray-600">Consulta tus citas anteriores</p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsPage;