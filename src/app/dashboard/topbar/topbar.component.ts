import { Component, Output, EventEmitter, inject, HostListener, ElementRef, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBars, faBell, faSearch, faSignOutAlt,
  faCircleInfo, faCheckDouble, faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import { NoticeService } from '../../core/services/notice.service';
import { AuthService } from '../../core/services/auth.service';

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
  private authService = inject(AuthService);
  private router = inject(Router);

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
  activeNotices = computed(() => this.notices().filter(notice => notice.active));
  activeUnreadCount = computed(() => this.activeNotices().filter(notice => !notice.read).length);

  showNotifications = false;

  ngOnInit(): void {
    this.noticeService.loadActive();
    this.userName = this.authService.getUsername() || 'User';
    this.userRole = this.authService.getRole() || 'STAFF';
  }

  noticeKey(id: string): string {
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

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.el.nativeElement.contains(event.target)) {
      this.showNotifications = false;
    }
  }
}
