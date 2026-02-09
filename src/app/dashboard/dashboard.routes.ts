import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layout/dashboard-layout.component';
import { OverviewComponent } from './overview/overview.component';
import { CoursesComponent } from './courses/courses.component';
import { ModulesComponent } from './modules/modules.component';
import { DepartmentsComponent } from './departments/departments.component';
import { StudentsComponent } from './students/students.component';
import { StaffComponent } from './staff/staff.component';
import { SettingsComponent } from './settings/settings.component';
import { NoticesComponent } from './notices/notices.component';

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: OverviewComponent },
      { path: 'courses', component: CoursesComponent },
      { path: 'modules', component: ModulesComponent },
      { path: 'departments', component: DepartmentsComponent },
      { path: 'students', component: StudentsComponent },
      { path: 'staff', component: StaffComponent },
      { path: 'notices', component: NoticesComponent },
      { path: 'settings', component: SettingsComponent },
    ]
  }
];
