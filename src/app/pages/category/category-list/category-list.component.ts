import { Component, OnInit } from '@angular/core';
import { stagger40ms } from '../../../../@vex/animations/stagger.animation';
import { scaleIn400ms } from '../../../../@vex/animations/scale-in.animation';
import { fadeInRight400ms } from '../../../../@vex/animations/fade-in-right.animation';
import { CustomTitleService } from '../../../shared/services/custom-title.service';
import { CategoryService } from '../../../services/category.service';
import { componentSetting } from './category-list-config';
import { CategoryApi } from 'src/app/response/category/category.response';
import { DatesFilter } from '@shared/functions/actions';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';
import { CategoryManageComponent } from '../category-manage/category-manage.component';
import Swal from 'sweetalert2';
import { Icon } from '@visurel/iconify-angular';

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
    public _categoryService: CategoryService,
    public _dialog: MatDialog
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

  setData(data: any = null) {
    this.component.filters.stateFilter = data.value;
    this.component.menuOpen = false;
    this.formatGetInputs();
  }

  search(data: any) {
    this.component.filters.numFilter = data.searchValue;
    this.component.filters.textFilter = data.searchString;
    this.formatGetInputs();
  }

  datesFilterOpen() {
    DatesFilter(this);
  }

  formatGetInputs() {
    let inputs = {
      numFilter: 0,
      textFilter: "",
      stateFilter: null,
      startDate: null,
      endDate: null
    }

    if (this.component.filters.numFilter != "") {
      inputs.numFilter = this.component.filters.numFilter;
      inputs.textFilter = this.component.filters.textFilter;
    }

    if (this.component.filters.stateFilter != null) {
      inputs.stateFilter = this.component.filters.stateFilter;
    }

    if (this.component.filters.startDate != "" && this.component.filters.endDate != "") {
      inputs.startDate = this.component.filters.startDate;
      inputs.endDate = this.component.filters.endDate;
    }

    this.component.getInputs = inputs;
  }

  openDialogRegister() {
    this._dialog.open(CategoryManageComponent, {
      disableClose: true,
      width: '400px'
    }).afterClosed().subscribe(
      (res) => {
        if (res) {
          this.formatGetInputs();
        }
      }
    );
  }

  CategoryEdit(row: CategoryApi) {
    const dialoConfig = new MatDialogConfig();
    dialoConfig.data = row;
    let dialogRef = this._dialog.open(CategoryManageComponent, {
      data: dialoConfig,
      disableClose: true,
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(
      (res) => {
        this.formatGetInputs()
      }
    );
  }

  CategoryRemove(category: any) {
    Swal.fire({
      title: `??Realmente deseas eliminar la categor??a ${category.name}?`,
      text: "Se borrar?? de forma permanente!",
      icon: "warning",
      showCancelButton: true,
      focusCancel: true,
      confirmButtonColor: 'rgb(210,155,253)',
      cancelButtonColor: 'rgb(79,109,253)',
      confirmButtonText: "S??, eliminar",
      cancelButtonText: "Cancelar",
      width: '430px'
    }).then((result) => {
      if (result.isConfirmed) {
        this._categoryService.CategoryRemove(category.categoryId).subscribe(() => this.formatGetInputs())
      }
    });
  }

}
