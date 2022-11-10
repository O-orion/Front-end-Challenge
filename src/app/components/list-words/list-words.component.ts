import { word } from './../../models/word';
import { Component, OnInit } from '@angular/core';
import { GetWordsService } from 'src/app/services/get-words.service';


@Component({
  selector: 'app-list-words',
  templateUrl: './list-words.component.html',
  styleUrls: ['./list-words.component.scss']
})
export class ListWordsComponent implements OnInit {

  letras: String [] = []
  wordSelected: word = {word: "", phonetic: "", definition: "", audio: ""};

  constructor(private getWordsService: GetWordsService) { }

  ngOnInit(): void {
    this.getWords()
    this.getWord('hello')
  }

  getWords(): void {
    this.getWordsService.getWords().subscribe({
      next: (words) => {
        this.letras.push(words[0])

      }
    })

  }

  getWord(word: String){
    this.getWordsService.getWord(word).subscribe({
      next: (wordObject) => {
          console.log(wordObject[0])
          this.wordSelected = {
            word: wordObject[0].word,
            phonetic: wordObject[0].phonetics[1].text,
            definition:  wordObject[0].meanings[0].definitions[0].definition,
            audio:  wordObject[0].phonetics[0].audio
          }

          console.log(this.wordSelected.audio)
      }
    })
  }

}
