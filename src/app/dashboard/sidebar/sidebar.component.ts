import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faGaugeHigh,
  faBookOpen,
  faCubes,
  faBuilding,
  faUserGraduate,
  faUsers,
  faGear,
  faChevronLeft,
  faBullhorn
} from '@fortawesome/free-solid-svg-icons';

interface NavItem {
  label: string;
  icon: IconDefinition;
  route: string;
  children?: NavItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FontAwesomeModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() collapsed = false;
  @Output() toggle = new EventEmitter<void>();

  faChevronLeft = faChevronLeft;

  /* Super-admin sees every section */
  navItems: NavItem[] = [
    { label: 'Dashboard', icon: faGaugeHigh, route: '/dashboard' },
    { label: 'Courses', icon: faBookOpen, route: '/dashboard/courses' },
    { label: 'Modules', icon: faCubes, route: '/dashboard/modules' },
    { label: 'Departments', icon: faBuilding, route: '/dashboard/departments' },
    { label: 'Students', icon: faUserGraduate, route: '/dashboard/students' },
    { label: 'Staff', icon: faUsers, route: '/dashboard/staff' },
    { label: 'Notices', icon: faBullhorn, route: '/dashboard/notices' },
    { label: 'Settings', icon: faGear, route: '/dashboard/settings' },
  ];

  onToggle(): void {
    this.toggle.emit();
  }
}
