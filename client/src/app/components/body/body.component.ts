import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
})
export class BodyComponent implements OnInit {
  constructor(private http: HttpClient) {}

  total: any;

  ngOnInit(): void {
    this.http.get('http:localhost:5000/transactions/').subscribe((res) => {
      if (Response) {
        this.hideloader();
      }
      this.total = res;
    });
  }
  hideloader() {
    document.getElementById('loading').style.display = 'none';
  }
  // TODO: ADD LOADING ELEMENT #loading
}
