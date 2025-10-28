import { Component, Input } from '@angular/core';

import { AfterViewInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionnaireService } from '../@services/questionnaire.service';

@Component({
  selector: 'app-list',
  imports: [MatTableModule, MatPaginatorModule, FormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  name!: string;
  no!: number;
  status!: string;
  startDate!: string;
  endDate!: string;
  result!: string;

  displayedColumns: string[] = ['no', 'name', 'status', 'startDate', 'endDate', 'result'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  constructor(private questionList: QuestionnaireService, private route: ActivatedRoute, router: Router) { }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    console.log(this.route.snapshot.queryParamMap.get("id"));

    this.route.params.subscribe(params => {
      console.log(params['id']);

    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  searchData!: string;

  searchForm() {
    let arrayData = [];
    for (let data of ELEMENT_DATA) {
      if (data.name.indexOf(this.searchData) != -1) {
        arrayData.push(data);
        console.log(arrayData);

      }
    }
    this.dataSource.data = arrayData;
  }

}

export interface PeriodicElement {
  name: string;
  no: number;
  status: string;
  startDate: string;
  endDate: string;
  result: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { no: 1, name: 'Hydrogen', status: "尚未開始", startDate: "2025-12-21", endDate: "2025-12-31", result: "前往" },
  { no: 2, name: 'Helium', status: "進行中", startDate: "2025-10-27", endDate: "2025-11-20", result: "前往" },
  { no: 3, name: 'Lithium', status: "已結束", startDate: "2025-10-01", endDate: "2025-10-01", result: "前往" },
  { no: 4, name: 'Beryllium', status: "已結束", startDate: "2025-10-07", endDate: "2025-10-07", result: "前往" },
  { no: 5, name: 'Boron', status: "已結束", startDate: "2025-10-07", endDate: "2025-10-07", result: "前往" },
  { no: 6, name: 'Carbon', status: "已結束", startDate: "2025-10-07", endDate: "2025-10-07", result: "前往" },
  { no: 7, name: 'Nitrogen', status: "已結束", startDate: "2025-10-07", endDate: "2025-10-07", result: "前往" },
  { no: 8, name: 'Oxygen', status: "已結束", startDate: "2025-10-07", endDate: "2025-10-07", result: "前往" },
  { no: 9, name: 'Fluorine', status: "已結束", startDate: "2025-10-07", endDate: "2025-10-07", result: "前往" },
  { no: 10, name: 'Neon', status: "已結束", startDate: "2025-10-07", endDate: "2025-10-07", result: "前往" },
  { no: 11, name: 'Sodium', status: "已結束", startDate: "2025-10-07", endDate: "2025-10-07", result: "前往" },
  { no: 12, name: 'Magnesium', status: "已結束", startDate: "2025-10-07", endDate: "2025-10-07", result: "前往" },
  { no: 13, name: 'Aluminum', status: "已結束", startDate: "2025-10-07", endDate: "2025-10-07", result: "前往" },
  { no: 14, name: 'Silicon', status: "已結束", startDate: "2025-10-07", endDate: "2025-10-07", result: "前往" },
  { no: 15, name: 'Phosphorus', status: "已結束", startDate: "2025-10-07", endDate: "2025-10-07", result: "前往" },
  { no: 16, name: 'Sulfur', status: "已結束", startDate: "2025-10-07", endDate: "2025-10-07", result: "前往" },
  { no: 17, name: 'Chlorine', status: "已結束", startDate: "2025-10-07", endDate: "2025-10-07", result: "前往" },
  { no: 18, name: 'Argon', status: "已結束", startDate: "2025-10-07", endDate: "2025-10-07", result: "前往" },
  { no: 19, name: 'Potassium', status: "已結束", startDate: "2025-10-07", endDate: "2025-10-07", result: "前往" },
  { no: 20, name: 'Calcium', status: "已結束", startDate: "2025-10-07", endDate: "2025-10-07", result: "前往" },
];
