import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faUserGraduate,
  faBookOpen,
  faBuilding,
  faUsers,
  faCubes,
  faGear,
  faArrowUp,
  faArrowDown
} from '@fortawesome/free-solid-svg-icons';

interface StatCard {
  label: string;
  value: string;
  icon: IconDefinition;
  change: string;
  trend: 'up' | 'down';
  color: string;
}

interface QuickAction {
  label: string;
  icon: IconDefinition;
  route: string;
  color: string;
}

interface Activity {
  action: string;
  detail: string;
  time: string;
  icon: IconDefinition;
}

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule, RouterLink, FontAwesomeModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent {
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;

  stats: StatCard[] = [
    { label: 'Total Students', value: '2,847', icon: faUserGraduate, change: '+12%', trend: 'up', color: 'blue' },
    { label: 'Active Courses', value: '64', icon: faBookOpen, change: '+3', trend: 'up', color: 'orange' },
    { label: 'Departments', value: '12', icon: faBuilding, change: '0', trend: 'up', color: 'green' },
    { label: 'Staff Members', value: '186', icon: faUsers, change: '+5', trend: 'up', color: 'purple' },
  ];

  quickActions: QuickAction[] = [
    { label: 'Add Student', icon: faUserGraduate, route: '/dashboard/students', color: 'blue' },
    { label: 'Create Course', icon: faBookOpen, route: '/dashboard/courses', color: 'orange' },
    { label: 'New Module', icon: faCubes, route: '/dashboard/modules', color: 'green' },
    { label: 'Add Department', icon: faBuilding, route: '/dashboard/departments', color: 'purple' },
    { label: 'Manage Staff', icon: faUsers, route: '/dashboard/staff', color: 'teal' },
    { label: 'Settings', icon: faGear, route: '/dashboard/settings', color: 'gray' },
  ];

  recentActivities: Activity[] = [
    { action: 'New student enrolled', detail: 'John Doe — BSc Computer Science', time: '2 min ago', icon: faUserGraduate },
    { action: 'Course updated', detail: 'Advanced Mathematics — Semester 2', time: '15 min ago', icon: faBookOpen },
    { action: 'Staff member added', detail: 'Dr. Sarah Chen — Lecturer', time: '1 hr ago', icon: faUsers },
    { action: 'Department activated', detail: 'Data Science & AI', time: '3 hr ago', icon: faBuilding },
    { action: 'Module created', detail: 'Machine Learning Fundamentals', time: '5 hr ago', icon: faCubes },
  ];
}
