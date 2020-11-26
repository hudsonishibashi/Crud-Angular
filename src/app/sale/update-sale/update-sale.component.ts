import { ResponseIClient } from 'src/app/client/client';
import { ClientService } from './../../client/client.service';
import { SaleService } from './../sale.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/product/product.service';
import { IResponseProduct } from 'src/app/product/product';
import { SaleHasProduct } from '../sale';
import { element } from 'protractor';

@Component({
  selector: 'app-update-sale',
  templateUrl: './update-sale.component.html',
  styleUrls: ['./update-sale.component.css']
})
export class UpdateSaleComponent implements OnInit {
  saleForm!: FormGroup;
  createSuccess!: boolean;
  id: any;
  responseIClient!: ResponseIClient;
  responseIProduct!: IResponseProduct;
  idProduct!: number;
  qtdProduct!:number;
  
  constructor(
    private fb: FormBuilder,
    private saleService: SaleService, 
    private productService: ProductService,
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getSaleId();
    this.getClient();
    this.getProduct();
  }

  getSaleId() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.saleService.getSaleId(this.id).subscribe(res => {
      this.saleForm = this.fb.group({
        totalValue: `${res.totalValue}`,
        idClient: res.idClient,
        saleHasProducts: this.setArray(res.saleHasProducts)
      });
    })
    this.createSuccess = false;
  }

  get saleFormArray(): FormArray {
    return this.saleForm.get('saleHasProducts') as FormArray;
  }

  setArray(saleHasProduct: SaleHasProduct[]) {
    let formArray = this.fb.array([]);
    saleHasProduct.forEach(element => formArray.push(
      this.fb.group({
        idProduct: element.idProduct,
        qtdProduct: element.qtdProduct
      })
    ));
    return formArray;
  }

  addSaleHasProduct() {
    this.saleFormArray.push(this.fb.group({idProduct: [, [Validators.required]], qtdProduct: [, [Validators.required]]}));
    console.log(this.saleForm);
  }

  deleteSaleHasProduct(idx: number) {
    this.saleFormArray.removeAt(idx);
  }

  getClient() {
    this.clientService.getClient().subscribe({
      next: clients => {
        this.responseIClient = clients
      }
    });
  }

  getProduct() {
    this.productService.getProduct().subscribe({
      next: products => {
        this.responseIProduct = products
      }
    })
  }

  save() {
    this.saleService.updateSale(this.id, this.saleForm.value).subscribe(res => {})
    this.saleForm.reset();
    this.createSuccess = true;
    this.router.navigate(['sale']);
  }

  onBack(): void {
    this.router.navigate(['sale']);
  }

}
