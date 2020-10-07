import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
})
export class BodyComponent implements OnInit {
  transactions = {};

  constructor(private DataService: DataService) {}

  ngOnInit(): void {
    this.transactions = this.DataService.getData().subscribe((res) => {
      this.transactions = res;
    });
  }
}
