import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { HighlightAutoResult, HighlightLoader } from 'ngx-highlightjs';

export enum dataType {
  Integer,
  String
}

export interface column {
  name: string,
  type: dataType
}


@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css']
})

export class ColumnComponent implements OnInit {


 themeGithub: string = 'node_modules/highlight.js/styles/github.css';
 themeAndroidStudio: string = 'node_modules/highlight.js/styles/androidstudio.css';
 response: HighlightAutoResult | null = null;


  columns: column[] = [{
    name: "id",
    type: dataType.Integer
  }, {
    name: "name",
    type: dataType.String
  }];

  constructor(private hljsLoader: HighlightLoader) {
    this.hljsLoader.setTheme(this.themeAndroidStudio);
  }

  code = `function myFunction() {
  document.getElementById("demo1").innerHTML = "Test 1!";
  document.getElementById("demo2").innerHTML = "Test 2!";
}
`;

  onHighlight(e: HighlightAutoResult) {
    this.response = {
      language: e.language,
      relevance: e.relevance,
      secondBest: '{...}',
      value: '{...}',
    };
  }



  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<column[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
    // moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }

  add() {
    this.columns = this.columns.concat([{
      name: "newColumn",
      type: dataType.String
    }]);
  }

  model = {
    left: true,
    middle: false,
    right: false
  };

}
