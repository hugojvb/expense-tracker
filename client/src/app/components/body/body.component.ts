import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
})
export class BodyComponent implements OnInit {
  data;

  constructor(private DataService: DataService) {}

  ngOnInit(): void {
    this.DataService.getTransactions().subscribe((res) => {
      this.data = res.data;
    });
  }
}
