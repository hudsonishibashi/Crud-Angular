import { CategoryService } from './../category.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {
  categoryForm!: FormGroup;
  createSuccess!: boolean;
  id: any;
  
  constructor(private fb: FormBuilder, 
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.getCategoryId();
  }

  getCategoryId() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.categoryService.getCategoryId(this.id).subscribe(res => {
      this.categoryForm = this.fb.group({
        name: `${res.name}`
      })
    })
    this.createSuccess = false;
  }

  save() {
    this.categoryService.updateCategory(this.id, this.categoryForm.value).subscribe(res => {
    })
    this.categoryForm.reset();
    this.createSuccess = true;
    this.router.navigate(['category']);
  }

  onBack(): void {
    this.router.navigate(['category']);
  }

}
