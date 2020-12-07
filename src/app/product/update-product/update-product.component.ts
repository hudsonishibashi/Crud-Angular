import { ICanDeactivate } from './../../guards/candeactivate';
import { CategoryService } from './../../category/category.service';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseICategory } from 'src/app/category/category';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit, ICanDeactivate {
  productForm!: FormGroup;
  createSuccess!: boolean;
  id: any;
  responseICategory!: ResponseICategory;
  private modifyForm:boolean = false;
  
  constructor(private fb: FormBuilder, 
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProductId();
    this.getCategory();
  }

  getProductId() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.productService.getProductId(this.id).subscribe(res => {
      this.productForm = this.fb.group({
        name: `${res.name}`,
        amount: `${res.amount}`,
        value: `${res.value}`,
        image: res.image,
        category: res.category,
      })
    })
    this.createSuccess = false;
  }

  getCategory() {
    this.categoryService.getCategory().subscribe({
      next: category => {
        this.responseICategory = category
      }
    });
  }

  save() {
    this.productService.updateProduct(this.id, this.productForm.value).subscribe(res => {
    })
    this.productForm.reset();
    this.createSuccess = true;
    this.modifyForm = false;
    this.router.navigate(['product']);
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
      if (confirm('Tem certeza que deseja sair da página? As alterações serão perdidas.')){
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
