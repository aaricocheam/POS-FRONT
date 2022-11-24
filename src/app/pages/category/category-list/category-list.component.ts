import { Component, OnInit } from '@angular/core';
import { stagger40ms } from '../../../../@vex/animations/stagger.animation';
import { scaleIn400ms } from '../../../../@vex/animations/scale-in.animation';
import { fadeInRight400ms } from '../../../../@vex/animations/fade-in-right.animation';
import { CustomTitleService } from '../../../shared/services/custom-title.service';
import { CategoryService } from '../../../services/category.service';
import { componentSetting } from './category-list-config';
import { CategoryApi } from 'src/app/response/category/category.response';

@Component({
  selector: 'vex-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  animations: [
    stagger40ms,
    scaleIn400ms,
    fadeInRight400ms
  ]
})
export class CategoryListComponent implements OnInit {

  component;

  constructor(
    customTitle: CustomTitleService,
    public _categoryService: CategoryService
  ) {
    customTitle.set('Categoria');
  }

  ngOnInit(): void {
    this.component = componentSetting;
  }

  rowClick(e: any) {
    let action = e.action;
    let category = e.row;

    switch (action) {
      case "edit":
        this.CategoryEdit(category);
        break;
      case "remove":
        this.CategoryRemove(category);
        break;
    }
    return false;
  }

  CategoryEdit(row: CategoryApi) {

  }

  CategoryRemove(category: any) {

  }

}
