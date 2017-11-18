import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-repository-search',
  templateUrl: './repository-search.component.html',
  styleUrls: ['./repository-search.component.css']
})
export class RepositorySearchComponent implements OnInit {
  @Output('submit') submit = new EventEmitter();
  @Input('userName') userName: string;
  constructor() { }

  ngOnInit() {
  }

}
