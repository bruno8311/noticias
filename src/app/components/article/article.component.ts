import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/Interfaces';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {

  constructor() { }
  button:string = 'MOSTRAR GALERIA';
  stateButton:boolean = false;
  @Input() distrito!: any;
  @Input() i!: number;

  ngOnInit() {}

  hideButton(){
   this.stateButton = !this.stateButton
   this.button = this.stateButton ? 'OCULTAR GALERIA' : 'MOSTRAR GALERIA';
  }

}
