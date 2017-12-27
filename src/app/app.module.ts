import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxElectronModule } from 'ngx-electron';


import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { ProjectComponent } from './project/project.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import {ReactiveFormsModule} from "@angular/forms";


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: OverviewComponent },
  { path: 'project/:id', component: ProjectComponent },
  { path: 'create', component: CreateProjectComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    ProjectComponent,
    CreateProjectComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, {useHash: true}),
    NgxElectronModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
