import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly toasts = signal<ToastMessage[]>([]);

  readonly items = this.toasts.asReadonly();

  showSuccess(title: string, message?: string, durationMs = 3500): void {
    this.addToast({
      id: this.createId(),
      type: 'success',
      title,
      message
    }, durationMs);
  }

  showError(title: string, message?: string, durationMs = 4500): void {
    this.addToast({
      id: this.createId(),
      type: 'error',
      title,
      message
    }, durationMs);
  }

  dismiss(id: string): void {
    this.toasts.update(items => items.filter(item => item.id !== id));
  }

  clear(): void {
    this.toasts.set([]);
  }

  private addToast(toast: ToastMessage, durationMs: number): void {
    this.toasts.update(items => [...items, toast]);

    if (durationMs > 0) {
      setTimeout(() => this.dismiss(toast.id), durationMs);
    }
  }

  private createId(): string {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  }
}
