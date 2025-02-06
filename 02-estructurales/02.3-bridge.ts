/**
 * ! Patrón Bridge
 * Este patrón nos permite desacoplar una abstracción de su implementación,
 * de tal forma que ambas puedan variar independientemente.
 *
 * * Es útil cuando se tienen múltiples implementaciones de una abstracción
 * * Se puede utilizar para separar la lógica de negocio de la lógica de presentación
 * * Se puede utilizar para separar la lógica de la interfaz de usuario también.
 *
 * https://refactoring.guru/es/design-patterns/bridge
 */
import { COLORS } from '../helpers/colors.ts';

// 1. Interfaz NotificationChannel
// Define el método `send`, que cada canal de comunicación implementará.
interface NotificationChannel {
  send(message: string): void;
}

// 2. Implementaciones de Canales de Comunicación

class EmailChannel implements NotificationChannel {
  send(message: string): void {
    console.log(`Enviando correo electrónico: ${message}`);
  }
}

class SMSChannel implements NotificationChannel {
  send(message: string): void {
    console.log(`Enviando SMS: ${message}`);
  }
}

class PushNotificationChannel implements NotificationChannel {
  send(message: string): void {
    console.log(`Enviando Push: ${message}`);
  }
}

// 3. Clase Abstracta Notification
// Define la propiedad `channel` y el método `notify`

abstract class Notification {
  constructor(protected channels?: NotificationChannel[]) {
    if (!this.channels) {
      this.channels = [];
    }
  }

  public notify(message: string): void {
    if (!this.channels?.length) {
      console.log('--- No hay channels para notificar ---');
    }
    this.channels?.forEach(channel => channel.send(message));
  }

  public addChannel(channel: NotificationChannel): void {
    this.channels?.push(channel);
  }
}

// 4. Clases Concretas de Notificaciones

class AlertNotification extends Notification {
  override notify(message: string): void {
    console.log('\n%cNotificación de Alerta:', COLORS.red);
    super.notify(message);
  }
}

class ReminderNotification extends Notification {
  override notify(message: string): void {
    console.log('\n%cNotificación de Recordatorio:', COLORS.blue);
    super.notify(message);
  }
}

function main(): void {
  const alert = new AlertNotification([new EmailChannel()]);
  const reminder = new ReminderNotification([]);
  
  alert.notify('Alerta de seguridad: Se ha detectado un acceso no autorizado.');
  alert.addChannel(new SMSChannel());
  alert.notify('Alerta de seguridad: Se ha detectado un acceso no autorizado.');
  
  reminder.notify('Recordatorio: Tu cita con el médico es mañana a las 10:00 a.m.');
  reminder.addChannel(new PushNotificationChannel());
  reminder.notify('Recordatorio: Tu cita con el médico es mañana a las 10:00 a.m.');
}

main();