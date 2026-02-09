import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, of } from 'rxjs';

/* ── DTOs matching the backend ── */

export interface NoticeResponse {
  id: string;
  title: string;
  content: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NoticeRequest {
  title: string;
  content: string;
}

export interface NoticeStatusRequest {
  active: boolean;
}

/* Local-only wrapper – adds client-side "read" tracking */
export interface Notice extends NoticeResponse {
  read: boolean;
}

const API = 'http://localhost:8080/api/notices';

@Injectable({ providedIn: 'root' })
export class NoticeService {
  private http = inject(HttpClient);

  /* client-side read tracking (persisted in sessionStorage) */
  private readIds = new Set<string>(
    JSON.parse(sessionStorage.getItem('notice_read_ids') || '[]')
  );

  private readonly _notices = signal<Notice[]>([]);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);

  readonly notices = this._notices.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  readonly unreadCount = computed(() =>
    this._notices().filter(n => !n.read).length
  );

  /** Unique string key for a notice (uses timestamp from ObjectId) */
  noticeKey(id: string): string {
    return id;
  }

  /* ── Fetchers ── */

  loadAll(): void {
    this._loading.set(true);
    this._error.set(null);
    this.http.get<NoticeResponse[]>(API).pipe(
      tap(list => this._notices.set(this.applyReadState(list))),
      catchError(err => {
        console.error('Failed to load notices:', err);
        this._error.set('Failed to load notices');
        this._notices.set([]);
        return of([]);
      })
    ).subscribe(() => this._loading.set(false));
  }

  loadActive(): void {
    this._loading.set(true);
    this._error.set(null);
    this.http.get<NoticeResponse[]>(`${API}/active`).pipe(
      tap(list => this._notices.set(this.applyReadState(list))),
      catchError(err => {
        console.error('Failed to load active notices:', err);
        this._error.set('Failed to load notices');
        this._notices.set([]);
        return of([]);
      })
    ).subscribe(() => this._loading.set(false));
  }

  getById(id: string): Observable<NoticeResponse> {
    return this.http.get<NoticeResponse>(`${API}/${id}`);
  }

  /* ── Mutations ── */

  create(dto: NoticeRequest): Observable<NoticeResponse> {
    return this.http.post<NoticeResponse>(API, dto).pipe(
      tap(() => this.loadAll())
    );
  }

  update(id: string, dto: NoticeRequest): Observable<NoticeResponse> {
    return this.http.put<NoticeResponse>(`${API}/${id}`, dto).pipe(
      tap(() => this.loadAll())
    );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${API}/${id}`).pipe(
      tap(() => this.loadAll())
    );
  }

  activate(id: string): Observable<void> {
    const payload: NoticeStatusRequest = { active: true };
    return this.http.patch<void>(`${API}/${id}/status`, payload).pipe(
      tap(() => this.loadAll())
    );
  }

  deactivate(id: string): Observable<void> {
    const payload: NoticeStatusRequest = { active: false };
    return this.http.patch<void>(`${API}/${id}/status`, payload).pipe(
      tap(() => this.loadAll())
    );
  }

  /* ── Client-side read tracking ── */

  markAsRead(key: string): void {
    this.readIds.add(key);
    this.persistReadIds();
    this._notices.update(list =>
      list.map(n => this.noticeKey(n.id) === key ? { ...n, read: true } : n)
    );
  }

  markAllAsRead(): void {
    this._notices().forEach(n => this.readIds.add(this.noticeKey(n.id)));
    this.persistReadIds();
    this._notices.update(list => list.map(n => ({ ...n, read: true })));
  }

  /* ── Helpers ── */

  private applyReadState(list: NoticeResponse[]): Notice[] {
    return list.map(n => ({ ...n, read: this.readIds.has(this.noticeKey(n.id)) }));
  }

  private persistReadIds(): void {
    sessionStorage.setItem('notice_read_ids', JSON.stringify([...this.readIds]));
  }
}
