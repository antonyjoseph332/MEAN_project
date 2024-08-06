import { Component, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { CommonFormComponent } from '../../../shared/components/common-form/common-form.component';
import { ArticleService } from '../../../services/article.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-article-form',
  standalone: true,
  imports: [CommonFormComponent],
  templateUrl: './article-form.component.html',
  styleUrl: './article-form.component.scss'
})
export class ArticleFormComponent {
  modalData: any;
  @ViewChild(CommonFormComponent) formComponent!: CommonFormComponent;

  constructor(private articleService: ArticleService,
    private message: NzMessageService,
    private modalRef: NzModalRef<ArticleFormComponent>) { }

  articleForm = {
    config: [
      { name: 'article', label: 'Article', type: 'input', validators: [Validators.required] },
      { name: 'price', label: 'Price', type: 'input', inputType: 'number', validators: [Validators.required] },
    ],
    submitButton: 'Submit',
    resetButton: 'Clear',
    hideButton: false
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
