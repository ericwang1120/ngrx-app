import { Observable } from 'rxjs/Observable';
import { GitRepository } from '../models/git-repository';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class GitRepositoryService {
  constructor(private http: Http) { }

  public load(userName: string): Observable<GitRepository[]> {
    return this.http
      .get(`https://api.github.com/users/${userName}/repos`, this.jwt())
      .map((res) => {
        return res.json();
      });
  }

  private jwt() {
    const jwtHeaders = new Headers({ 'Content-Type': 'application/json' });
    return new RequestOptions({ headers: jwtHeaders });
  }
}
