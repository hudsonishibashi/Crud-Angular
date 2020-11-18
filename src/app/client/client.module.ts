import { ClientRoutingModule } from './cliente-routing.module';
import { ClientComponent } from './client.component';
import { NgModule } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { CreateClientComponent } from './create-client/create-client.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        ClientComponent,
        CreateClientComponent
    ],
    imports: [
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MatProgressSpinnerModule,
        ClientRoutingModule
    ]
})

export class ClientModule {}