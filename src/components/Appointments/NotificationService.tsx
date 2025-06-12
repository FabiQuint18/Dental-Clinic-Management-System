import React, { useEffect } from 'react';

interface NotificationServiceProps {
  appointments: any[];
}

const NotificationService: React.FC<NotificationServiceProps> = ({ appointments }) => {
  
  useEffect(() => {
    // Simulate checking for appointments that need reminders
    const checkReminders = () => {
      const now = new Date();
      const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      const twoHoursFromNow = new Date(now.getTime() + 2 * 60 * 60 * 1000);

      appointments.forEach(appointment => {
        const appointmentDate = new Date(appointment.date);
        
        // Check for 24-hour reminder
        if (appointmentDate.toDateString() === tomorrow.toDateString()) {
          sendWhatsAppReminder(appointment, '24 horas');
          sendEmailReminder(appointment, '24 horas');
        }
        
        // Check for 2-hour reminder
        if (Math.abs(appointmentDate.getTime() - twoHoursFromNow.getTime()) < 30 * 60 * 1000) {
          sendWhatsAppReminder(appointment, '2 horas');
          sendEmailReminder(appointment, '2 horas');
        }
      });
    };

    // Check every 30 minutes
    const interval = setInterval(checkReminders, 30 * 60 * 1000);
    
    // Initial check
    checkReminders();

    return () => clearInterval(interval);
  }, [appointments]);

  const sendWhatsAppReminder = (appointment: any, timeframe: string) => {
    // Simulate WhatsApp API call
    console.log(`Enviando recordatorio por WhatsApp a ${appointment.patient}:`);
    console.log(`🦷 Recordatorio de Cita - Consultorio Yadira
    
Hola ${appointment.patient}! 👋

Te recordamos que tienes una cita programada en ${timeframe}:

📅 Fecha: ${new Date(appointment.date).toLocaleDateString('es-CO')}
🕐 Hora: ${appointment.time}
👨‍⚕️ Con: ${appointment.dentist}
🦷 Servicio: ${appointment.service}

📍 Dirección: Calle 123 #45-67, Bogotá
📞 Teléfono: +57 (1) 234-5678

Por favor confirma tu asistencia respondiendo a este mensaje.

¡Te esperamos! 😊`);

    // In a real implementation, this would call WhatsApp Business API
    // Example: await whatsappAPI.sendMessage(appointment.phone, message);
  };

  const sendEmailReminder = (appointment: any, timeframe: string) => {
    // Simulate Email API call
    console.log(`Enviando recordatorio por email a ${appointment.patient}:`);
    console.log(`
Subject: Recordatorio de Cita - Consultorio Yadira

Estimado/a ${appointment.patient},

Esperamos que se encuentre bien. Le recordamos que tiene una cita programada en ${timeframe}:

DETALLES DE LA CITA:
• Fecha: ${new Date(appointment.date).toLocaleDateString('es-CO')}
• Hora: ${appointment.time}
• Profesional: ${appointment.dentist}
• Servicio: ${appointment.service}

INFORMACIÓN IMPORTANTE:
• Por favor llegue 15 minutos antes de su cita
• Traiga su documento de identidad
• Si necesita cancelar o reprogramar, hágalo con al menos 24 horas de anticipación

UBICACIÓN:
Consultorio Yadira
Calle 123 #45-67, Bogotá, Colombia
Teléfono: +57 (1) 234-5678

Si tiene alguna pregunta, no dude en contactarnos.

Atentamente,
Equipo Consultorio Yadira
`);

    // In a real implementation, this would call Email API
    // Example: await emailAPI.sendEmail(appointment.email, subject, message);
  };

  // This component doesn't render anything visible
  return null;
};

export default NotificationService;