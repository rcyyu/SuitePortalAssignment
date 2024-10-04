import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { HomeModule } from './features/home/home.module';
import { AdminModule } from './features/admin/admin.module';
import { LoginComponent } from './features/admin/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { MainComponent } from './features/admin/main/main.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'admin/login',
    component: LoginComponent
  },
  {
    path: 'admin',
    component: MainComponent, canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'home',
  }
];

@NgModule({
  imports: [
    HomeModule,
    AdminModule,
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      enableTracing: true,
      relativeLinkResolution: 'corrected',
    }),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule {}
