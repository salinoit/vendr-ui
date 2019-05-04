import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilComponent } from './perfil.component';

const routes: Routes = [
  { path: '', component: PerfilComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);


