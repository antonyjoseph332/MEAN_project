import { Component, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { CommonFormComponent } from '../../../shared/components/common-form/common-form.component';
import { ArticleService } from '../../../services/article.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { CompanyService } from '../../../services/company.service';
import { AuthService } from '../../../core/auth.service';

@Component({
  selector: 'app-article-form',
  standalone: true,
  imports: [CommonFormComponent],
  templateUrl: './article-form.component.html',
  styleUrl: './article-form.component.scss'
})
export class ArticleFormComponent {
  modalData: any;
  loginUser = this.authService.getUser();
  @ViewChild(CommonFormComponent) formComponent!: CommonFormComponent;

  constructor(private articleService: ArticleService,
    private message: NzMessageService,
    private authService: AuthService,
    private companyService: CompanyService,
    private modalRef: NzModalRef<ArticleFormComponent>) { }

  filterOptions: any = {
    companyList: []
  };

  articleForm = {
    config: [
      { name: 'article', label: 'Article', type: 'input', validators: [Validators.required] },
      { name: 'price', label: 'Price', type: 'input', inputType: 'number', validators: [Validators.required] },
      { name: 'company', label: 'Comapany', type: 'autocomplete', filter: 'companyList', validators: [Validators.required] },
    ],
    submitButton: 'Submit',
    resetButton: 'Clear',
    hideButton: false
  }

  ngOnInit() {
    if (this.loginUser.userType !== 'admin') {
      this.articleForm.config = this.articleForm.config.filter(c => c.name !== 'company');
    }
  }

  // company list 
  getCompanyList() {
    this.filterOptions.companyList = [];
    this.companyService.getCompanys().subscribe(result => {
      if (result.success) {
        result.data.forEach((c: any) => this.filterOptions.companyList.push({ label: c.name, value: c._id }))
      }
    })
  }

  // get user by id 
  getUser() {
    this.articleService.getArticle(this.modalData.id).subscribe(result => {
      if (result && result.success) {
        this.formComponent.form.patchValue(result.data);
        if (this.modalData.type === 'View') {
          this.articleForm.hideButton = true;
        }
      }
    })
  }

  // crate user 
  onSubmitForm(ev: any) {
    this.articleService.createArticle(ev).subscribe(result => {
      if (result.success) {
        this.message.create('success', 'User created successfully!');
        this.modalRef.close({ success: true, data: ev });
      } else {
        this.message.create('error', result.message);
      }
    }, err => {

    })
  }


}
