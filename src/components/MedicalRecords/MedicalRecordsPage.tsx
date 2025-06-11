import React, { useState } from 'react';
import { FileText, Plus, Search, Filter, Calendar, User, Stethoscope, Eye, Edit, Download } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const MedicalRecordsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState('all');
  const [showNewRecord, setShowNewRecord] = useState(false);
  const { user } = useAuth();

  // Mock medical records data
  const mockRecords = [
    {
      id: '1',
      patientId: '4',
      patientName: 'Carlos Pérez González',
      dentistName: 'Dr. María González',
      date: '2024-01-15',
      diagnosis: 'Caries dental en molar superior derecho',
      treatment: 'Obturación con resina compuesta',
      notes: 'Paciente presenta sensibilidad al frío. Se realizó limpieza previa y aplicación de anestesia local. Obturación exitosa.',
      nextAppointment: '2024-02-15',
      attachments: ['radiografia_1.jpg', 'foto_antes.jpg', 'foto_despues.jpg'],
      medications: ['Ibuprofeno 400mg cada 8 horas por 3 días'],
      vitalSigns: {
        bloodPressure: '120/80',
        heartRate: '72',
        temperature: '36.5°C'
      }
    },
    {
      id: '2',
      patientId: '5',
      patientName: 'Ana García Martínez',
      dentistName: 'Dr. Carlos Martínez',
      date: '2024-01-10',
      diagnosis: 'Gingivitis moderada',
      treatment: 'Profilaxis dental y aplicación de flúor',
      notes: 'Paciente con acumulación de placa bacteriana. Se realizó limpieza profunda y educación en higiene oral.',
      nextAppointment: '2024-04-10',
      attachments: ['radiografia_panoramica.jpg'],
      medications: ['Enjuague bucal con clorhexidina 0.12% por 15 días'],
      vitalSigns: {
        bloodPressure: '110/70',
        heartRate: '68',
        temperature: '36.2°C'
      }
    },
    {
      id: '3',
      patientId: '6',
      patientName: 'María Rodríguez Silva',
      dentistName: 'Dr. María González',
      date: '2024-01-08',
      diagnosis: 'Endodoncia necesaria en premolar inferior izquierdo',
      treatment: 'Primera sesión de endodoncia - apertura cameral',
      notes: 'Paciente con dolor intenso. Se realizó apertura cameral y medicación intraconducto. Requiere segunda sesión.',
      nextAppointment: '2024-01-22',
      attachments: ['radiografia_periapical.jpg', 'foto_tratamiento.jpg'],
      medications: ['Amoxicilina 500mg cada 8 horas por 7 días', 'Acetaminofén 500mg cada 6 horas'],
      vitalSigns: {
        bloodPressure: '125/85',
        heartRate: '78',
        temperature: '36.8°C'
      }
    }
  ];

  const mockPatients = [
    { id: '4', name: 'Carlos Pérez González' },
    { id: '5', name: 'Ana García Martínez' },
    { id: '6', name: 'María Rodríguez Silva' },
    { id: '7', name: 'Juan López Hernández' },
  ];

  const filteredRecords = mockRecords.filter(record => {
    const matchesSearch = record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.treatment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPatient = selectedPatient === 'all' || record.patientId === selectedPatient;
    return matchesSearch && matchesPatient;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Historias Clínicas</h1>
          <p className="text-gray-600 mt-1">
            Gestión completa de historiales médicos y tratamientos
          </p>
        </div>
        {(user?.role === 'admin' || user?.role === 'dentist' || user?.role === 'assistant') && (
          <button
            onClick={() => setShowNewRecord(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Nueva Historia Clínica
          </button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-50 rounded-lg">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{mockRecords.length}</h3>
              <p className="text-gray-600 text-sm">Total Historias</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-pink-50 rounded-lg">
              <User className="w-6 h-6 text-pink-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{mockPatients.length}</h3>
              <p className="text-gray-600 text-sm">Pacientes Activos</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-50 rounded-lg">
              <Stethoscope className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">12</h3>
              <p className="text-gray-600 text-sm">Tratamientos Activos</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-pink-50 rounded-lg">
              <Calendar className="w-6 h-6 text-pink-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">8</h3>
              <p className="text-gray-600 text-sm">Citas de Seguimiento</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por paciente, diagnóstico o tratamiento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={selectedPatient}
              onChange={(e) => setSelectedPatient(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">Todos los pacientes</option>
              {mockPatients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.name}
                </option>
              ))}
            </select>
            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Medical Records List */}
      <div className="space-y-4">
        {filteredRecords.map((record) => (
          <div key={record.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{record.patientName}</h3>
                  <p className="text-gray-600">Atendido por {record.dentistName}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(record.date).toLocaleDateString('es-CO')}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-purple-600 hover:text-purple-900 hover:bg-purple-50 rounded-lg transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
                {(user?.role === 'admin' || user?.role === 'dentist') && (
                  <button className="p-2 text-pink-600 hover:text-pink-900 hover:bg-pink-50 rounded-lg transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                )}
                <button className="p-2 text-purple-600 hover:text-purple-900 hover:bg-purple-50 rounded-lg transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Diagnóstico</h4>
                <p className="text-gray-700 mb-4">{record.diagnosis}</p>
                
                <h4 className="font-semibold text-gray-900 mb-2">Tratamiento</h4>
                <p className="text-gray-700 mb-4">{record.treatment}</p>

                <h4 className="font-semibold text-gray-900 mb-2">Observaciones</h4>
                <p className="text-gray-700">{record.notes}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Signos Vitales</h4>
                <div className="bg-gray-50 p-3 rounded-lg mb-4">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-600">Presión arterial:</span>
                      <span className="ml-2 font-medium">{record.vitalSigns.bloodPressure}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Frecuencia cardíaca:</span>
                      <span className="ml-2 font-medium">{record.vitalSigns.heartRate} bpm</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-600">Temperatura:</span>
                      <span className="ml-2 font-medium">{record.vitalSigns.temperature}</span>
                    </div>
                  </div>
                </div>

                <h4 className="font-semibold text-gray-900 mb-2">Medicamentos</h4>
                <div className="space-y-1 mb-4">
                  {record.medications.map((med, index) => (
                    <div key={index} className="text-sm text-gray-700 bg-pink-50 px-2 py-1 rounded">
                      {med}
                    </div>
                  ))}
                </div>

                <h4 className="font-semibold text-gray-900 mb-2">Archivos Adjuntos</h4>
                <div className="flex flex-wrap gap-2">
                  {record.attachments.map((file, index) => (
                    <span key={index} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                      {file}
                    </span>
                  ))}
                </div>

                {record.nextAppointment && (
                  <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium text-purple-900">
                        Próxima cita: {new Date(record.nextAppointment).toLocaleDateString('es-CO')}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredRecords.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron historias clínicas</h3>
          <p className="text-gray-600 mb-6">
            No hay historias clínicas que coincidan con los criterios de búsqueda
          </p>
        </div>
      )}

      {/* New Record Modal Placeholder */}
      {showNewRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Nueva Historia Clínica</h3>
            <p className="text-gray-600 mb-4">
              Funcionalidad en desarrollo. Aquí se implementará el formulario para crear nuevas historias clínicas.
            </p>
            <button
              onClick={() => setShowNewRecord(false)}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalRecordsPage;