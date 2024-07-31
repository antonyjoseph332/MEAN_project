import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleFormComponent } from './article-form/article-form.component';
import { AntDesignModule } from '../../shared/modules/ant-design.module';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [RouterOutlet, ArticleListComponent, ArticleFormComponent, AntDesignModule],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss'
})
export class ArticlesComponent {

}
