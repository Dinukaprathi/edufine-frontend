import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  courses = [
    { id: 1, name: 'BSc Computer Science', code: 'CS-101', semesters: 8, modules: 42, status: 'active' },
    { id: 2, name: 'BSc Data Science', code: 'DS-201', semesters: 6, modules: 36, status: 'active' },
    { id: 3, name: 'BA Business Administration', code: 'BA-301', semesters: 6, modules: 38, status: 'active' },
    { id: 4, name: 'BSc Mathematics', code: 'MT-401', semesters: 8, modules: 40, status: 'inactive' },
    { id: 5, name: 'BSc Electrical Engineering', code: 'EE-501', semesters: 8, modules: 44, status: 'active' },
  ];
}
