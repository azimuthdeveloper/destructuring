import { Routes } from '@angular/router';
import {SimpleComponent} from "./simple/simple.component";
import {ComplexComponent} from "./complex/complex.component";

export const routes: Routes = [
  {
    path: 'simple',
    component: SimpleComponent
  },
  {
    path: 'complex',
    component: ComplexComponent
  }
];
