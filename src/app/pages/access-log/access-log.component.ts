import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';

interface AccessLog {
  id: string;
  date: string;
  operation: string;
  ipAddress: string;
  success: boolean;
}

@Component({
  selector: 'app-access-log',
  imports: [CommonModule],
  templateUrl: './access-log.component.html',
  styleUrl: './access-log.component.css',
})
export class AccessLogsComponent {

  protected readonly loading = false;

  protected readonly logs: AccessLog[] = [
    {
      id: 'log1',
      date: '22 set 2026, 10:04:07',
      operation: 'Login',
      ipAddress: '87.25.8.164',
      success: true,
    },
    {
      id: 'log2',
      date: '22 set 2026, 10:03:12',
      operation: 'Login',
      ipAddress: '87.25.197.213',
      success: true,
    },
    {
      id: 'log3',
      date: '21 set 2026, 09:14:23',
      operation: 'Login',
      ipAddress: '87.25.144.12',
      success: true,
    },
    {
      id: 'log4',
      date: '20 set 2026, 18:32:01',
      operation: 'Bonifico',
      ipAddress: '87.25.144.12',
      success: true,
    },
    {
      id: 'log5',
      date: '20 set 2026, 18:30:45',
      operation: 'Login',
      ipAddress: '87.25.144.12',
      success: true,
    },
    {
      id: 'log6',
      date: '19 set 2026, 14:21:38',
      operation: 'Ricarica cellulare',
      ipAddress: '87.25.144.12',
      success: true,
    },
    {
      id: 'log7',
      date: '18 set 2026, 11:08:17',
      operation: 'Modifica password',
      ipAddress: '87.25.144.12',
      success: true,
    },
    {
      id: 'log8',
      date: '17 set 2026, 23:47:52',
      operation: 'Login',
      ipAddress: '185.72.91.44',
      success: false,
    },
  ];

  protected readonly totalOperations = computed(
    () => this.logs.length
  );

  protected readonly successfulOperations = computed(
    () => this.logs.filter(log => log.success).length
  );

  protected readonly failedOperations = computed(
    () => this.logs.filter(log => !log.success).length
  );
}

export default AccessLogsComponent;