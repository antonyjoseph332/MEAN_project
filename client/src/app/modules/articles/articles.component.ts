import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ArticleListComponent } from './article-list/article-list.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ArticleFormComponent } from './article-form/article-form.component';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [RouterOutlet, ArticleListComponent, ArticleFormComponent, NzButtonModule, NzModalModule],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss'
})
export class ArticlesComponent {

  showCreate: boolean = false;

  handleCancelMiddle() {
    this.showCreate = false;
  }

  handleOkMiddle() {

  }
}
