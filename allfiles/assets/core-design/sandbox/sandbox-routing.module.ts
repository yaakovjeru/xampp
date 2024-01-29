import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibSandboxComponent } from './sandbox.component';

const routes: Routes = [
    { path: 'sandbox', component: LibSandboxComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class SandboxRoutingModule { }
