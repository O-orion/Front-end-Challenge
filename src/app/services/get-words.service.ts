import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class GetWordsService {

  constructor(private http: HttpClient) { }

  getWords(): Observable<any>{
    return this.http.get<any>('http://localhost:2000/listword').pipe(take(1))
  }

  getWord(word: String ): Observable<any>{
    return this.http.get<any>(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`).pipe(take(1))
  }

}
