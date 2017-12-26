import { Component } from '@angular/core';
import {ElectronService} from 'ngx-electron';
import {
  RouterModule,
  Routes,
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(private _electronService: ElectronService) { }
}
