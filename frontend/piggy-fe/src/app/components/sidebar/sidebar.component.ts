import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

interface NavItem {
  label: string;
  path: string;
  icon: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly currentUser = this.auth.currentUser;

  protected readonly sections: NavSection[] = [
    {
      title: 'Panoramica',
      items: [
        { label: 'Home', path: '/dashboard', icon: '⌂' },
        { label: 'Movimenti', path: '/transactions', icon: '↕' },
      ],
    },
    {
      title: 'Operazioni',
      items: [
        { label: 'Ricarica Tel.', path: '/recharge', icon: '◎' },
        { label: 'Bonifico', path: '/transfer', icon: '→' },
      ],
    },
    {
      title: 'Account',
      items: [
        { label: 'Profilo', path: '/profile', icon: '○' },
        { label: 'Password', path: '/change-password', icon: '◆' },
        { label: 'Log Accessi', path: '/access-log', icon: '≡' },
      ],
    },
  ];

  protected logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}