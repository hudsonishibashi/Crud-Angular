import { DeactivateGuard } from './../guards/deactivate.guard';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
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

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';


@NgModule({
    declarations: [
        CategoryComponent,
        CreateCategoryComponent,
        UpdateCategoryComponent
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
        CategoryRoutingModule
    ],
    providers: [
        DeactivateGuard
    ]
})

export class CategoryModule {}