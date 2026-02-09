import { Component, Output, EventEmitter, inject, HostListener, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBars, faBell, faSearch, faSignOutAlt,
  faCircleInfo, faCheckDouble, faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import { NoticeService, NoticeId } from '../../core/services/notice.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterLink],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent implements OnInit {
  @Output() menuToggle = new EventEmitter<void>();

  private el = inject(ElementRef);
  private noticeService = inject(NoticeService);

  faBars = faBars;
  faBell = faBell;
  faSearch = faSearch;
  faSignOutAlt = faSignOutAlt;
  faCheckDouble = faCheckDouble;
  faArrowRight = faArrowRight;
  faCircleInfo = faCircleInfo;

  userName = 'Super Admin';
  userRole = 'SUPER_ADMIN';

  notices = this.noticeService.notices;
  unreadCount = this.noticeService.unreadCount;

  showNotifications = false;

  ngOnInit(): void {
    this.noticeService.loadActive();
  }

  noticeKey(id: NoticeId): string {
    return this.noticeService.noticeKey(id);
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }

  markAsRead(key: string): void {
    this.noticeService.markAsRead(key);
  }

  markAllAsRead(): void {
    this.noticeService.markAllAsRead();
  }

  onMenuToggle(): void {
    this.menuToggle.emit();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.el.nativeElement.contains(event.target)) {
      this.showNotifications = false;
    }
  }
}
