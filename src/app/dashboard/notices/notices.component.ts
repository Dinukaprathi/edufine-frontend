import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faPlus,
  faTrash,
  faCircleInfo,
  faBullhorn,
  faToggleOn,
  faToggleOff,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';
import { NoticeService, Notice, NoticeRequest } from '../../core/services/notice.service';

@Component({
  selector: 'app-notices',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './notices.component.html',
  styleUrl: './notices.component.css'
})
export class NoticesComponent implements OnInit {
  private noticeService = inject(NoticeService);

  faPlus = faPlus;
  faTrash = faTrash;
  faBullhorn = faBullhorn;
  faCircleInfo = faCircleInfo;
  faToggleOn = faToggleOn;
  faToggleOff = faToggleOff;
  faSpinner = faSpinner;

  notices = this.noticeService.notices;
  loading = this.noticeService.loading;

  showCreateForm = false;
  submitted = false;
  submitting = false;
  formActive = true;

  userName = 'Super Admin';
  userRole = 'SUPER_ADMIN';

  allRoles = [
    { value: 'SUPER_ADMIN', label: 'Super Admin' },
    { value: 'LIC', label: 'LIC' },
    { value: 'LECTURER', label: 'Lecturer' },
    { value: 'INSTRUCTOR', label: 'Instructor' },
    { value: 'STAFF', label: 'Staff' },
    { value: 'STUDENT', label: 'Student' },
  ];

  selectedRoles: string[] = ['SUPER_ADMIN', 'LIC', 'LECTURER', 'INSTRUCTOR', 'STAFF', 'STUDENT'];

  newNotice: NoticeRequest = {
    title: '',
    content: '',
  };

  ngOnInit(): void {
    this.noticeService.loadAll();
  }

  noticeKey(notice: Notice): string {
    return this.noticeService.noticeKey(notice.id);
  }

  toggleRole(role: string): void {
    const idx = this.selectedRoles.indexOf(role);
    if (idx >= 0) {
      this.selectedRoles.splice(idx, 1);
    } else {
      this.selectedRoles.push(role);
    }
  }

  toggleCreateForm(): void {
    this.showCreateForm = !this.showCreateForm;
    if (!this.showCreateForm) {
      this.resetForm();
      this.submitted = false;
    }
  }

  createNotice(): void {
    this.submitted = true;
    if (!this.newNotice.title.trim() || !this.newNotice.content.trim()) return;
    this.submitting = true;
    this.noticeService.create({ ...this.newNotice }).subscribe({
      next: () => {
        /* If user set inactive, deactivate after creation */
        if (!this.formActive) {
          /* The loadAll in create will refresh, then we deactivate the newest */
        }
        this.showCreateForm = false;
        this.submitted = false;
        this.submitting = false;
        this.resetForm();
      },
      error: () => {
        this.submitting = false;
      }
    });
  }

  deleteNotice(notice: Notice): void {
    this.noticeService.delete(this.noticeKey(notice)).subscribe();
  }

  toggleActive(notice: Notice): void {
    const key = this.noticeKey(notice);
    if (notice.active) {
      this.noticeService.deactivate(key).subscribe();
    } else {
      this.noticeService.activate(key).subscribe();
    }
  }

  markAsRead(notice: Notice): void {
    this.noticeService.markAsRead(this.noticeKey(notice));
  }

  private resetForm(): void {
    this.newNotice = {
      title: '',
      content: '',
    };
    this.formActive = true;
    this.selectedRoles = ['SUPER_ADMIN', 'LIC', 'LECTURER', 'INSTRUCTOR', 'STAFF', 'STUDENT'];
  }
}
