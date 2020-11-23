import { CategoryService } from './../category.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
  categoryForm!: FormGroup;
  createSuccess!: boolean;
  buttonDisabled!: any;
  
  constructor(private fb: FormBuilder, 
    private categoryService: CategoryService,
    private router: Router) { }

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
  }

  onBack(): void {
    this.router.navigate(['category']);
  }

}
