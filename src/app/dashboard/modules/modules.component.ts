import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modules',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modules.component.html',
  styleUrl: './modules.component.css'
})
export class ModulesComponent {
  modules = [
    { id: 1, name: 'Machine Learning Fundamentals', code: 'ML-101', course: 'BSc Computer Science', credits: 4, status: 'active' },
    { id: 2, name: 'Database Systems', code: 'DB-201', course: 'BSc Computer Science', credits: 3, status: 'active' },
    { id: 3, name: 'Linear Algebra', code: 'LA-301', course: 'BSc Mathematics', credits: 4, status: 'active' },
    { id: 4, name: 'Financial Accounting', code: 'FA-101', course: 'BA Business Administration', credits: 3, status: 'inactive' },
    { id: 5, name: 'Circuit Analysis', code: 'CA-201', course: 'BSc Electrical Engineering', credits: 4, status: 'active' },
  ];
}
