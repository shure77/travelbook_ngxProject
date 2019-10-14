import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { PlacesResolver } from '@app/core/route-resolver/places.resolver';
import { HomeComponent } from './home.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent, data: { title:'Home' }, resolve: { places: PlacesResolver}, runGuardsAndResolvers: 'pathParamsOrQueryParamsChange'}
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
