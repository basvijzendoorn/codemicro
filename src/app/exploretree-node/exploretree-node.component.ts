import { Component, Input, OnInit } from '@angular/core';
import { Node } from '../exploretree/exploretree.component';
import { CodeService } from '../services/code.service';

@Component({
  selector: 'app-exploretree-node',
  templateUrl: './exploretree-node.component.html',
  styleUrls: ['./exploretree-node.component.css']
})
export class ExploretreeNodeComponent implements OnInit {

  constructor(private codeService: CodeService) { }

  @Input() nodes: Node[] = [];

  ngOnInit(): void {
  }

  downloadCode(folderIndex: number, tableIndex: number) {
    this.codeService.downloadCode(folderIndex, tableIndex)
  }

  nodeClick(node: Node) {
    if (node.downloadType) {

    } else {
      if (node.showChildren) {
        node.showChildren = false
      } else {
        node.showChildren = true
      }
    }
  }

}
