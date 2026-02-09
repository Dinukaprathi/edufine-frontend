import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-staff-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.css'
})
export class StaffComponent {
  staffMembers = [
    { id: 1, name: 'Dr. James Wilson', role: 'LECTURER', department: 'Computer Science', email: 'j.wilson@edufine.edu', status: 'active' },
    { id: 2, name: 'Prof. Emily Brown', role: 'LIC', department: 'Mathematics', email: 'e.brown@edufine.edu', status: 'active' },
    { id: 3, name: 'Dr. Sarah Chen', role: 'LECTURER', department: 'Electrical Engineering', email: 's.chen@edufine.edu', status: 'active' },
    { id: 4, name: 'Mr. David Kim', role: 'INSTRUCTOR', department: 'Computer Science', email: 'd.kim@edufine.edu', status: 'active' },
    { id: 5, name: 'Ms. Lisa Park', role: 'STAFF', department: 'Business Administration', email: 'l.park@edufine.edu', status: 'inactive' },
  ];
}
