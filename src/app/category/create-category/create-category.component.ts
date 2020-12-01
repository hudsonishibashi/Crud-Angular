import { NotificationService } from './../../notification.service';
import { ICanDeactivate } from './../../guards/candeactivate';
import { CategoryService } from './../category.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit, ICanDeactivate {
  categoryForm!: FormGroup;
  createSuccess!: boolean;
  buttonDisabled!: any;
  private modifyForm:boolean = false;
  
  constructor(private fb: FormBuilder, 
    private categoryService: CategoryService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required]]
    });
    this.createSuccess = false;
    this.buttonDisabled = false;
  }

  save() {
    this.categoryService.createCategory(this.categoryForm.value).subscribe(res => {
      this.buttonDisabled = this.categoryForm.valid;
    });
    this.categoryForm.reset();
    this.createSuccess = true;
    this.modifyForm = false;
  }

  onBack(): void {
    this.router.navigate(['category']);
  }

  input() {
    this.modifyForm = true;
  }

  modifyTrueRouter() {
    let verify: boolean = true;
    if (this.modifyForm) {
      if (confirm('Tem certeza que deseja sair da página? Os dados serão perdidos.')){
        verify = true
      } else {
        verify = false;
      }
    }
    return verify;
  }

  isDisabled(): boolean {
    return this.modifyTrueRouter();
  }

}
