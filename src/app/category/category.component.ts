import { NotificationService } from './../notification.service';
import { CategoryService } from './category.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ResponseICategory } from './category';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  displayedColumns: string[] = ['name', 'action'];
  responseICategory!: ResponseICategory;
  erroMessage: string = '';
  dataSource: any;
  next: boolean = false;
  previous: boolean = false;

   //Paginator
   length!:number;
   pageSize:number = 5;
   pageIndex:number = 0;
   offset: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private categoryService: CategoryService, private notification: NotificationService) { }

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory() {
    this.categoryService.getCategory(this.pageIndex, this.pageSize).subscribe({
      next: category => {
        this.setPagination(category['totalElements'], category['number'], category['size']);
        this.dataSource = new MatTableDataSource(category.content);
        this.responseICategory = category
        this.previous = true;
        //this.dataSource.paginator = this.paginator;
      },
      error: err => this.erroMessage = err
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  reload() {
    window.location.reload();
  }

  openDialog(id:any) {
    this.notification.openDialog(
    id,
    'Deseja realmente excluir essa categoria?',
    'Está ação não poderá ser revertida.', 
    true,
    this,
    () => {this.deleteCategory(id)});
  }

  deleteCategory(id: any) {
    this.categoryService.deleteCategory(id).subscribe(res => {});
  }

  setPagination(length: number, startIndex: number, pageSize: number) {
    this.length = length;
    this.pageIndex = startIndex;
    this.pageSize = pageSize;
  }

  onPaginateChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getCategory();
  }

}
