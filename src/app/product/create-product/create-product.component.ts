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
export class CreateProductComponent implements OnInit {
  productForm!: FormGroup;
  createSuccess!: boolean;
  buttonDisabled!: any;
  responseICategory!: ResponseICategory;
  
  constructor(private fb: FormBuilder, 
    private productService: ProductService,
    private router: Router) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      amount: [,[Validators.required]],
      value: [,[Validators.required]],
      category: [,[Validators.required]]
    });
    this.getCategory();
    this.createSuccess = false;
    this.buttonDisabled = false;
  }

  getCategory() {
    this.productService.getCategory().subscribe({
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
  }

  onBack(): void {
    this.router.navigate(['product']);
  }

}
