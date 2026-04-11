import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { SitePageService } from '../../services/site-page.service';

@Component({
  selector: 'app-dynamic-site-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dynamic-site-page.component.html',
  styleUrl: './dynamic-site-page.component.scss',
})
export class DynamicSitePageComponent implements OnInit {
  pageLabel = '';
  title = '';
  updatedAt: string | null = null;
  safeHtml: SafeHtml | null = null;
  loading = true;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private sitePage: SitePageService,
    private sharedService: SharedService,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    const data = this.route.snapshot.data as { sitePageSlug: string; pageLabel: string };
    const slug = data.sitePageSlug;
    this.pageLabel = data.pageLabel;
    this.sharedService.addSeo(`${data.pageLabel} - Green Glow`);

    this.sitePage.getPage(slug).subscribe({
      next: (p) => {
        this.title = p.title;
        this.updatedAt = p.updatedAt;
        this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(p.html);
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      },
    });
  }
}
