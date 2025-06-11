import React from 'react';
import { X, Download, Send, Printer, FileText, CheckCircle } from 'lucide-react';

interface Invoice {
  id: string;
  patient: string;
  dentist: string;
  date: string;
  dueDate: string;
  services: string[];
  subtotal: number;
  tax: number;
  total: number;
  status: string;
  dianStatus: string;
}

interface InvoiceDetailModalProps {
  invoice: Invoice;
  isOpen: boolean;
  onClose: () => void;
}

const InvoiceDetailModal: React.FC<InvoiceDetailModalProps> = ({ invoice, isOpen, onClose }) => {
  if (!isOpen || !invoice) return null;

  const serviceDetails = [
    { name: 'Limpieza dental profunda', quantity: 1, unitPrice: 150000, total: 150000 },
    { name: 'Aplicación de flúor', quantity: 1, unitPrice: 30000, total: 30000 },
  ];

  const handleDownloadPDF = () => {
    console.log('Descargando PDF de factura:', invoice.id);
    // Implementar descarga de PDF
  };

  const handleDownloadXML = () => {
    console.log('Descargando XML de factura:', invoice.id);
    // Implementar descarga de XML
  };

  const handlePrint = () => {
    console.log('Imprimiendo factura:', invoice.id);
    // Implementar impresión
    window.print();
  };

  const handleSendEmail = () => {
    console.log('Enviando factura por email:', invoice.id);
    // Implementar envío por email
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Factura {invoice.id}</h2>
            <p className="text-gray-600">Factura Electrónica DIAN</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Invoice Content */}
        <div className="p-6">
          {/* Company Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 flex items-center justify-center">
                <img 
                  src="/Consultorio Yadira.png" 
                  alt="Consultorio Yadira" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Consultorio Yadira</h3>
                <p className="text-gray-600">NIT: 900.123.456-7</p>
                <p className="text-gray-600">Calle 123 #45-67, Bogotá, Colombia</p>
                <p className="text-gray-600">Tel: +57 (1) 234-5678</p>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg mb-2">
                <span className="font-bold">FACTURA ELECTRÓNICA</span>
              </div>
              <p className="text-sm text-gray-600">Resolución DIAN: 18764000001234</p>
              <p className="text-sm text-gray-600">Fecha: {new Date().toLocaleDateString('es-CO')}</p>
            </div>
          </div>

          {/* Customer Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Facturar a:</h4>
              <p className="font-medium text-gray-900">{invoice.patient}</p>
              <p className="text-gray-600">CC: 1.234.567.890</p>
              <p className="text-gray-600">Calle 456 #78-90, Bogotá</p>
              <p className="text-gray-600">Tel: +57 300 123 4567</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Atendido por:</h4>
              <p className="font-medium text-gray-900">{invoice.dentist}</p>
              <p className="text-gray-600">Registro Profesional: COL12345</p>
              <p className="text-gray-600">Especialidad: Odontología General</p>
            </div>
          </div>

          {/* Services Table */}
          <div className="mb-8">
            <h4 className="font-semibold text-gray-900 mb-4">Servicios Prestados</h4>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Descripción</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">Cant.</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">Valor Unit.</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {serviceDetails.map((service, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 text-sm text-gray-900">{service.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-center">{service.quantity}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">
                        ${service.unitPrice.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right font-medium">
                        ${service.total.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals */}
          <div className="flex justify-end mb-8">
            <div className="w-80">
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">${invoice.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">IVA (19%):</span>
                  <span className="font-medium">${invoice.tax.toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-300 pt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-purple-600">${invoice.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* DIAN Status */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-900">Factura Validada por la DIAN</span>
            </div>
            <p className="text-green-700 text-sm mt-1">
              UUID: 12345678-1234-1234-1234-123456789012
            </p>
            <p className="text-green-700 text-sm">
              Fecha de validación: {new Date().toLocaleDateString('es-CO')} {new Date().toLocaleTimeString('es-CO')}
            </p>
          </div>

          {/* Payment Info */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 className="font-semibold text-purple-900 mb-2">Información de Pago</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-purple-700">Fecha de vencimiento: {new Date(invoice.dueDate).toLocaleDateString('es-CO')}</p>
                <p className="text-purple-700">Método de pago: Efectivo</p>
              </div>
              <div>
                <p className="text-purple-700">Estado: Pagada</p>
                <p className="text-purple-700">Fecha de pago: {new Date(invoice.date).toLocaleDateString('es-CO')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="border-t border-gray-200 p-6">
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              Descargar PDF
            </button>
            <button 
              onClick={handleDownloadXML}
              className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <FileText className="w-4 h-4" />
              Descargar XML
            </button>
            <button 
              onClick={handlePrint}
              className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Printer className="w-4 h-4" />
              Imprimir
            </button>
            <button 
              onClick={handleSendEmail}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Send className="w-4 h-4" />
              Enviar por Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetailModal;