import { Observable } from 'rxjs/Observable';
import { GitUser } from '../models/git-user';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class GitUserService {
  constructor(private http: Http) { }

  public load(): Observable<GitUser[]> {
    return this.http
      .get(`https://api.myapi.com`, this.jwt())
      .map((res) => {
        return res.json();
      });
  }

  private jwt() {
    const jwtHeaders = new Headers({ 'Content-Type': 'application/json' });
    return new RequestOptions({ headers: jwtHeaders });
  }
}
