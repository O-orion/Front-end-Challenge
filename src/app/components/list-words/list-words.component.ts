import { LocalStorageService } from './../../services/local-storage.service';
import { word } from './../../models/word';
import { Component, OnInit } from '@angular/core';
import { GetWordsService } from 'src/app/services/get-words.service';


@Component({
  selector: 'app-list-words',
  templateUrl: './list-words.component.html',
  styleUrls: ['./list-words.component.scss']
})
export class ListWordsComponent implements OnInit {

  letras: String [] = [];
  wordHistory: word[] = [];
  wordFavorites:  word[] = [];

  wordSelected: word = {word: "", phonetic: "", definition: "", audio: ""};

  favoriteClicked: boolean = false;

  constructor(private getWordsService: GetWordsService, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.getWords()
    this.getWord('hello')
  }

  getWords(): void {

    let localWords = this.localStorageService.getItemStorage('words')



    if( localWords == null ){
      this.getWordsService.getWords().subscribe({
        next: (words) => {
          console.log('oi')

          words[0].map( (letra: string) => {
              this.letras.push(letra)
          })
         this.localStorageService.setItemStorage("words", this.letras)
         this.localStorageService.setItemStorage('word', []);
         this.localStorageService.setItemStorage('favorites', [])
        }
      })

      return
    }

    this.letras = localWords;
    this.favoriteClicked = false;
  }

  getWord(word: String){


    if(this.wordHistory !== null &&  this.wordHistory.find((palavra) => palavra.word === word)){

      this.wordSelected = this.wordHistory.find((palavra) => palavra.word === word) as word
      return;
     }

    this.getWordsService.getWord(word).subscribe({
      next: (wordObject) => {

          this.wordSelected = {
            word: wordObject[0].word,
            phonetic: wordObject[0].phonetics[1].text,
            definition:  wordObject[0].meanings[0].definitions[0].definition,
            audio:  wordObject[0].phonetics[0].audio
          }



          if(this.wordHistory != null) this.wordHistory.push(this.wordSelected)

          let result = this.localStorageService.setItemStorage('word',this.wordHistory)
          console.log(result)
      }
    })
  }

  getHistory(): void {
    this.wordHistory =  this.localStorageService.getItemStorage('word')
    this.letras = this.wordHistory.map((letra) => letra.word)
    this.favoriteClicked = false;
  }

  getFavorites(): void {
    this.wordFavorites = this.localStorageService.getItemStorage('favorites')
    this.letras = this.wordFavorites.map((word) => word.word)
    this.favoriteClicked = true;
  }

  setFavorites(word: word): void {

    if(this.wordFavorites.find( (palavra) => palavra.word == word.word)){
      return
    }

    this.wordFavorites.push(word)
    this.localStorageService.setItemStorage("favorites", this.wordFavorites)
    this.letras = this.wordFavorites.map((word) => word.word);
  }

  removeLetterFavorites(word: String):void {

    // Capturing word dending from the list
    let result = this.wordFavorites.filter( (letter) => letter.word == word);
    let capturingWord = this.wordFavorites.find((letter) => result[0].word)

    // removing the word
    this.wordFavorites.splice(this.wordFavorites.indexOf(capturingWord as word), 1)

    this.localStorageService.setItemStorage('favorites', this.wordFavorites)
    this.letras = this.wordFavorites.map((word) => word.word);
  }

}
