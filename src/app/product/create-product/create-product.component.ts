import { ICanDeactivate } from './../../guards/candeactivate';
import { CategoryService } from './../../category/category.service';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponseICategory } from 'src/app/category/category';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit, ICanDeactivate {
  productForm!: FormGroup;
  createSuccess!: boolean;
  buttonDisabled!: any;
  responseICategory!: ResponseICategory;
  private modifyForm:boolean = false;
  
  constructor(private fb: FormBuilder, 
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      amount: [,[Validators.required]],
      value: [,[Validators.required]],
      image: ['', [Validators.required]],
      category: [,[Validators.required]]
    });
    this.getCategory();
    this.createSuccess = false;
    this.buttonDisabled = false;
  }

  getCategory() {
    this.categoryService.getCategory().subscribe({
      next: category => {
        this.responseICategory = category
      }
    });
  }

  save() {
    this.productService.createProduct(this.productForm.value).subscribe(res => {
      this.buttonDisabled = this.productForm.valid;
    });
    this.productForm.reset();
    this.createSuccess = true;
    this.modifyForm = false;
  }

  onBack(): void {
    this.router.navigate(['product']);
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
