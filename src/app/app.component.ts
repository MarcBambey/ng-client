import {Component, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';

@Component({
  selector: 'ea-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnDestroy {
  title = 'ea';

  private _mobileQuery: MediaQueryList;
  private _mobileQueryListener: (e: MediaQueryList) => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this._mobileQuery = media.matchMedia('(max-width: 599px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this._mobileQuery.addListener(this._mobileQueryListener);
  }

  isMobile() {
    return this._mobileQuery.matches;
  }

  getModeByScreenSize() {
    return this.isMobile() ? 'over' : 'side';
  }

  ngOnDestroy(): void {
    this._mobileQuery.removeListener(this._mobileQueryListener);
  }

  isNavigationOpened(): boolean {
    return !this.isMobile();
  }
}
