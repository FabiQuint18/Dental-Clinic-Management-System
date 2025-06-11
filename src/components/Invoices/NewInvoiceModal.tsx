import React, { useState } from 'react';
import { X, Plus, Trash2, Calculator } from 'lucide-react';

interface NewInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (invoice: any) => void;
}

const NewInvoiceModal: React.FC<NewInvoiceModalProps> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    patientId: '',
    dentistId: '',
    dueDate: '',
    services: [{ name: '', quantity: 1, unitPrice: 0 }]
  });

  const mockPatients = [
    { id: '1', name: 'Carlos Pérez González' },
    { id: '2', name: 'Ana García Martínez' },
    { id: '3', name: 'María Rodríguez Silva' },
  ];

  const mockDentists = [
    { id: '1', name: 'Dr. María González' },
    { id: '2', name: 'Dr. Carlos Martínez' },
    { id: '3', name: 'Dr. Juan López' },
  ];

  const commonServices = [
    { name: 'Limpieza dental', price: 150000 },
    { name: 'Obturación', price: 200000 },
    { name: 'Endodoncia', price: 500000 },
    { name: 'Extracción simple', price: 120000 },
    { name: 'Blanqueamiento dental', price: 300000 },
    { name: 'Ortodoncia - Consulta', price: 100000 },
    { name: 'Radiografía', price: 50000 },
  ];

  if (!isOpen) return null;

  const addService = () => {
    setFormData({
      ...formData,
      services: [...formData.services, { name: '', quantity: 1, unitPrice: 0 }]
    });
  };

  const removeService = (index: number) => {
    const newServices = formData.services.filter((_, i) => i !== index);
    setFormData({ ...formData, services: newServices });
  };

  const updateService = (index: number, field: string, value: any) => {
    const newServices = [...formData.services];
    newServices[index] = { ...newServices[index], [field]: value };
    setFormData({ ...formData, services: newServices });
  };

  const selectCommonService = (index: number, serviceName: string) => {
    const service = commonServices.find(s => s.name === serviceName);
    if (service) {
      updateService(index, 'name', service.name);
      updateService(index, 'unitPrice', service.price);
    }
  };

  const calculateSubtotal = () => {
    return formData.services.reduce((sum, service) => sum + (service.quantity * service.unitPrice), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.19; // 19% IVA
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const invoiceData = {
      ...formData,
      subtotal: calculateSubtotal(),
      tax: calculateTax(),
      total: calculateTotal(),
      issueDate: new Date().toISOString().split('T')[0],
      status: 'draft'
    };
    onSave(invoiceData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Nueva Factura</h2>
            <p className="text-gray-600">Crear factura electrónica DIAN</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Paciente *
              </label>
              <select
                value={formData.patientId}
                onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Seleccionar paciente</option>
                {mockPatients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Odontólogo *
              </label>
              <select
                value={formData.dentistId}
                onChange={(e) => setFormData({ ...formData, dentistId: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Seleccionar odontólogo</option>
                {mockDentists.map((dentist) => (
                  <option key={dentist.id} value={dentist.id}>
                    {dentist.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha de Vencimiento *
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Services */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Servicios</h3>
              <button
                type="button"
                onClick={addService}
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Agregar Servicio
              </button>
            </div>

            <div className="space-y-4">
              {formData.services.map((service, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Servicio
                      </label>
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={service.name}
                          onChange={(e) => updateService(index, 'name', e.target.value)}
                          placeholder="Nombre del servicio"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <select
                          onChange={(e) => selectCommonService(index, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                        >
                          <option value="">Seleccionar servicio común</option>
                          {commonServices.map((commonService) => (
                            <option key={commonService.name} value={commonService.name}>
                              {commonService.name} - ${commonService.price.toLocaleString()}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cantidad
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={service.quantity}
                        onChange={(e) => updateService(index, 'quantity', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Precio Unitario
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={service.unitPrice}
                        onChange={(e) => updateService(index, 'unitPrice', parseFloat(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium text-gray-900">
                        Total: ${(service.quantity * service.unitPrice).toLocaleString()}
                      </div>
                      {formData.services.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeService(index)}
                          className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <Calculator className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">Resumen de Factura</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">${calculateSubtotal().toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">IVA (19%):</span>
                <span className="font-medium">${calculateTax().toLocaleString()}</span>
              </div>
              <div className="border-t border-gray-300 pt-2">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-purple-600">${calculateTotal().toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-colors"
            >
              Crear Factura
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewInvoiceModal;