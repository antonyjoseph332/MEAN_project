import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArticleService } from '../../../services/article.service';
import { CommonModule } from '@angular/common';
import { AntDesignModule } from '../../../shared/modules/ant-design.module';
import { BillService } from '../../../services/bill.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-billing-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, AntDesignModule],
  templateUrl: './billing-form.component.html',
  styleUrl: './billing-form.component.scss'
})
export class BillingFormComponent {
  articleList: any[] = []
  form!: FormGroup;
  paramsId: string = ''
  articleLoader: boolean = false;
  constructor(private articleService: ArticleService,
    private billService: BillService,
    private fb: FormBuilder,
    private activetedRoute: ActivatedRoute) { }

  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  createItem(): FormGroup {
    return this.fb.group({
      serialNo: [0],
      article: ['', Validators.required],
      noOfItem: [0, Validators.required],
      deliveredItems: [0],
      discount: [0],
      price: [0],
      totalPrice: [0],
      amountToPay: [0]
    });
  }

  addItem(): void {
    this.items.push(this.createItem());
  }

  removeItem(index: number): void {
    if (this.items.length > 1) {
      this.items.removeAt(index);
    }
    this.setTotalValues();
  }

  onSubmit(): void {
    const bill = this.form.value
    this.billService.createBill(bill).subscribe(result => {
      console.log(result);

    })
  }

  getArticles() {
    this.articleLoader = true;
    this.articleService.getArticles().subscribe(result => {
      if (result.success) {
        this.articleList = result.data;
      }
      this.articleLoader = false;
    })
  }

  onArticleSelect(i: number): void {
    const control = this.items.controls[i]
    const article = this.articleList.find(art => art._id === control.value.article);
    if (article) {
      control.get('price')?.setValue(article.price)
      this.updateTotalPrice(i);
    }
  }

  updateTotalPrice(i: number): void {
    const control = this.items.controls[i]
    let totalValue = 0;
    if (control.value.price && control.value.noOfItem) {
      totalValue = control.value.price * control.value.noOfItem
      const discountValue = (control.value.price * control.value.noOfItem / 100) * control.value.discount
      totalValue = totalValue - discountValue
      control.get('totalPrice')?.setValue(totalValue)
    } else {
      control.get('totalPrice')?.setValue(totalValue)
    }
    this.setTotalValues()
  }

  setTotalValues() {
    const values = this.items.value;
    const noOfItems = values.reduce((sum: number, item: any) => sum + item.noOfItem, 0)
    const totalAmount = values.reduce((sum: number, item: any) => sum + item.totalPrice, 0)
    this.form.get('totalItems')?.setValue(noOfItems);
    this.form.get('totalAmount')?.setValue(totalAmount);
  }

  createForm() {
    this.form = this.fb.group({
      orderDate: [new Date()],
      deliveryDate: [],
      totalAmount: [0],
      deliveryAmount: [0],
      paidAmount: [0],
      totalItems: [0],
      totalDeliveredItems: [0],
      items: this.fb.array([this.createItem()])
    });
  }

  ngOnInit(): void {
    this.getArticles();
    this.createForm();
    if (this.activetedRoute.snapshot.params) {
      this.paramsId = this.activetedRoute.snapshot.params['id'];
      
    }
  }
}
