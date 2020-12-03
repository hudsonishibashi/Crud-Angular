import { NotificationService } from './../notification.service';
import { CategoryService } from './category.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
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

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private categoryService: CategoryService, private notification: NotificationService) { }

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory() {
    this.categoryService.getCategory().subscribe({
      next: category => {
        this.dataSource = new MatTableDataSource(category.content);
        this.responseICategory = category
        this.previous = true;
        this.dataSource.paginator = this.paginator;
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

}
