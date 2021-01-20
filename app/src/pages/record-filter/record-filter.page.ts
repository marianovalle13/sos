import { Component, OnInit } from '@angular/core';
import { UserPage } from '../user.page';

@Component({
  selector: 'app-record-filter',
  templateUrl: './record-filter.page.html',
  styleUrls: ['./record-filter.page.scss'],
})
export class RecordFilterPage extends UserPage implements OnInit {

  filters = [
    {
      label: 'Últimas 24 horas',
      value: 1
    },
    {
      label: 'Última semana',
      value: 7
    },
    {
      label: 'Último mes',
      value: 30
    }
  ];
  filterSelected: any;


  ngOnInit() {
    //this.loadAsistenciaMotivos();
  }

  search() {
    this.pageService.navigate("/record/" + this.filterSelected);
  }

}
