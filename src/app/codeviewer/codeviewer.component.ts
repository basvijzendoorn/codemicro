import { Component, OnInit } from '@angular/core';
import { HighlightLoader } from 'ngx-highlightjs';
import { CodeService } from '../services/code.service';

@Component({
  selector: 'app-codeviewer',
  templateUrl: './codeviewer.component.html',
  styleUrls: ['./codeviewer.component.css']
})
export class CodeviewerComponent implements OnInit {

  themeGithub: string = 'node_modules/highlight.js/styles/github.css';
  themeAndroidStudio: string = 'node_modules/highlight.js/styles/androidstudio.css';
  code: string = '';

  constructor(
    private hljsLoader: HighlightLoader
    , private codeService: CodeService
    ) {
    this.hljsLoader.setTheme(this.themeAndroidStudio);
   }

  ngOnInit(): void {
  }

  getCode(): string {
    var code = `function myFunction() {
      document.getElementById("demo1").innerHTML = "Test 1!";
      document.getElementById("demo2").innerHTML = "Test 2!";
    }
    `;

    return this.codeService.getCode();
    // return code;
    // return this.codeService.getCode;
  }


}
