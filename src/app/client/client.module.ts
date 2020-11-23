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
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';

import { CreateClientComponent } from './create-client/create-client.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UpdateClientComponent } from './update-client/update-client.component';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';


@NgModule({
    declarations: [
        ClientComponent,
        CreateClientComponent,
        UpdateClientComponent,
        DialogConfirmComponent
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
        MatDialogModule,
        MatPaginatorModule,
        ClientRoutingModule
    ]
})

export class ClientModule {}