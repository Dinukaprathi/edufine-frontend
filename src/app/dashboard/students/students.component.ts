import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent {
  students = [
    { id: 1, name: 'John Doe', studentId: 'STU-2024-001', course: 'BSc Computer Science', year: 3, status: 'active' },
    { id: 2, name: 'Jane Smith', studentId: 'STU-2024-002', course: 'BSc Data Science', year: 2, status: 'active' },
    { id: 3, name: 'Mike Johnson', studentId: 'STU-2024-003', course: 'BA Business Administration', year: 1, status: 'active' },
    { id: 4, name: 'Emily Davis', studentId: 'STU-2023-015', course: 'BSc Mathematics', year: 4, status: 'inactive' },
    { id: 5, name: 'Alex Wilson', studentId: 'STU-2024-004', course: 'BSc Electrical Engineering', year: 2, status: 'active' },
  ];
}
