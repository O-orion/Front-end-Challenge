import { word } from './../models/word';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private storage: Storage;
  constructor() {
    this.storage = window.localStorage;
  }

  setItemStorage(key: string, value: any[]): boolean {
    if( this.storage ) {
      this.storage.setItem(key, JSON.stringify(value))
      return true;
    }

    return false;
  }

  getItemStorage(key: string): any {
    key = key === null ? "" : key;

    if(this.storage){
      let dados = JSON.parse(this.storage.getItem(key) as string )
      return dados
    }

    return null;
  }
}
