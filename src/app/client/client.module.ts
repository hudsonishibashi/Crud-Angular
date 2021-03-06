import { DeactivateGuard } from './../guards/deactivate.guard';
import { ClientRoutingModule } from './cliente-routing.module';
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
import { TextMaskModule } from 'angular2-text-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ClientComponent } from './client.component';
import { CreateClientComponent } from './create-client/create-client.component';
import { UpdateClientComponent } from './update-client/update-client.component';


@NgModule({
    declarations: [
        ClientComponent,
        CreateClientComponent,
        UpdateClientComponent
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
        TextMaskModule,
        ClientRoutingModule
    ],
    providers: [
        DeactivateGuard
    ]
})

export class ClientModule {}