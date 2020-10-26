import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  constructor(private dataService: DataService) {}
  data;
  loading: boolean = true;
  noData: boolean;

  ngOnInit(): void {
    this.dataService.getTransactions().subscribe((res) => {
      // Sort data Newest to Oldest
      this.data = res.data.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      if (this.data.length === 0) this.noData = true;

      this.loading = false;
    });
  }

  onDelete(id: string) {
    console.log(id);
    this.dataService.deleteTransactions(id).subscribe(() => {
      console.log('hello');
    });
  }
}
