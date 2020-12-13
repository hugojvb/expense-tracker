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
  collectionSize: number;
  pageSize: number = 10;
  page: number = 1;

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
    this.loading = true;
    this.dataService.deleteTransactions(id).subscribe(() => {
      this.data = this.data.filter((c) => c._id !== id);
      this.loading = false;
    });

    if (this.data.length === 1) {
      this.noData = true;
    }
  }
}
