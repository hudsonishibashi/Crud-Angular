import { SaleService } from './../sale.service';
import { ClientService } from './../../client/client.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/product/product.service';
import { ResponseIClient } from 'src/app/client/client';
import { IResponseProduct } from 'src/app/product/product';
import { SaleHasProduct } from '../sale';

@Component({
  selector: 'app-create-sale',
  templateUrl: './create-sale.component.html',
  styleUrls: ['./create-sale.component.css']
})
export class CreateSaleComponent implements OnInit {
  saleForm!: FormGroup;
  createSuccess!: boolean;
  buttonDisabled!: any;
  responseClient!: ResponseIClient;
  responseProduct!: IResponseProduct;
  shp!: SaleHasProduct;
  
  constructor(private fb: FormBuilder,
    private saleService: SaleService, 
    private productService: ProductService,
    private clientService: ClientService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getClient();
    this.getProduct();
    this.saleForm = this.fb.group({
      totalValue: [, [Validators.required]],
      idClient: [, [Validators.required]],
      saleHasProducts: this.fb.array([])
    });
    this.createSuccess = false;
    this.buttonDisabled = false;
  }

  get saleFormArray(): FormArray {
    return this.saleForm.get('saleHasProducts') as FormArray;
  }

  addSaleHasProduct() {
    this.saleFormArray.push(this.fb.group({idProduct: [, [Validators.required]], qtdProduct: [, [Validators.required]]}));
  }

  deleteSaleHasProduct(idx: number) {
    this.saleFormArray.removeAt(idx);
  }

  getClient() {
    this.clientService.getClient().subscribe({
      next: clients => {
        this.responseClient = clients;
      }
    })
  }

  getProduct() {
    this.productService.getProduct().subscribe({
      next: products => {
        this.responseProduct = products;
      }
    })
  }

  save() {
    this.saleService.createSale(this.saleForm.value).subscribe(res => {
      this.buttonDisabled = this.saleForm.valid;
    });
    this.saleForm.reset();
    this.createSuccess = true;
  }

  onBack(): void {
    this.router.navigate(['sale']);
  }

}
