import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface PublicSitePage {
  slug: string;
  title: string;
  html: string;
  updatedAt: string;
}

@Injectable({ providedIn: 'root' })
export class SitePageService {
  private readonly baseUrl = environment.apiBaseUrl;
  /** Short-term client cache (aligns with public Cache-Control ~2 min). */
  private readonly ttlMs = 120_000;
  private cache = new Map<string, { data: PublicSitePage; exp: number }>();

  constructor(private http: HttpClient) { }

  getPage(slug: string): Observable<PublicSitePage> {
    const now = Date.now();
    const hit = this.cache.get(slug);
    if (hit && hit.exp > now) {
      return of(hit.data);
    }
    return this.http
      .get<{ data: PublicSitePage }>(`${this.baseUrl}public/site-pages/${encodeURIComponent(slug)}`)
      .pipe(
        map((r) => r.data),
        tap((data) => this.cache.set(slug, { data, exp: now + this.ttlMs })),
      );
  }

  clearCache(slug?: string): void {
    if (slug) {
      this.cache.delete(slug);
    } else {
      this.cache.clear();
    }
  }
}
