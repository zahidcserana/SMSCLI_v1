import { Injectable } from "@angular/core";
import {
  PreloadingStrategy,
  Route,
  Router,
  ActivatedRoute,
  NavigationEnd
} from "@angular/router";
import { Observable, of } from "rxjs";
import { filter, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class SelectivePreloadingStrategyService implements PreloadingStrategy {
  module: string;

  constructor(private router: Router, private activeRoute: ActivatedRoute) {
    router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => activeRoute),
        map((route) => {
          while (route.firstChild) route = route.firstChild; //gets the deepest child
          return route;
        }),
        filter(route => route.outlet === "primary")
      )
      .subscribe(route => {
        if (route.snapshot.data["preloadDashboard"] !== undefined) {
          this.module = route.snapshot.data["preloadDashboard"];
        }
      });
  }

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (
      route.data &&
      route.data["module"] === this.module &&
      route.data["preload"]
    ) {
      return load();
    } else {
      return of(null);
    }
  }
}
