import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { CommonFormComponent } from '../../../shared/components/common-form/common-form.component';

@Component({
  selector: 'app-article-form',
  standalone: true,
  imports: [CommonFormComponent],
  templateUrl: './article-form.component.html',
  styleUrl: './article-form.component.scss'
})
export class ArticleFormComponent {

  articleForm = {
    config: [
      { name: 'article', label: 'Article', validators: [Validators.required] },
      { name: 'price', label: 'Price', type: 'numeber', validators: [Validators.required] },
    ],
    submitButton: 'Submit',
    resetButton: 'Clear'
  }
}
