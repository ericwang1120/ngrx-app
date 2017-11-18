import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-repository-display',
  templateUrl: './repository-display.component.html',
  styleUrls: ['./repository-display.component.css']
})
export class RepositoryDisplayComponent implements OnInit {
  @Input('gitRepositories') public gitRepositories;
  @Input('loading') public loading;

  constructor() { }

  ngOnInit() {
  }

}
