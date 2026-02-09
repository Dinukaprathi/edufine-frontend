import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.css'
})
export class DepartmentsComponent {
  departments = [
    { id: 1, name: 'Computer Science', head: 'Dr. James Wilson', staff: 28, students: 520, status: 'active' },
    { id: 2, name: 'Mathematics', head: 'Prof. Emily Brown', staff: 22, students: 380, status: 'active' },
    { id: 3, name: 'Business Administration', head: 'Dr. Michael Lee', staff: 18, students: 450, status: 'active' },
    { id: 4, name: 'Electrical Engineering', head: 'Prof. Sarah Chen', staff: 24, students: 340, status: 'active' },
    { id: 5, name: 'Data Science & AI', head: 'Dr. Alex Turner', staff: 15, students: 210, status: 'inactive' },
  ];
}
