import { Component, OnInit, Input } from '@angular/core';
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
  @Input() page;
  @Input() pageSize;
  @Input() collectionSize;

  ngOnInit(): void {
    this.dataService.getTransactions().subscribe((res) => {
      // Sort data Newest to Oldest
      this.data = res.data.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      if (this.data.length === 0) this.noData = true;

      this.page = 1;
      this.pageSize = 10;
      this.collectionSize = this.data.length;
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
