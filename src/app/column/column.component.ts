import { Component, OnInit } from '@angular/core';
import { CodeService, DownloadType } from '../services/code.service';
import { saveAs } from 'file-saver';
import * as JSZip from 'jszip';
import { NodeService } from '../services/node.service';
import { Node } from '../services/node.service';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { Clipboard } from '@angular/cdk/clipboard';


@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css']
})

export class ColumnComponent implements OnInit {
  constructor(private codeservice: CodeService,
              private nodeService: NodeService,
              private clipboard: Clipboard) {
  }

  async copyToClipboard() {
    this.clipboard.copy(this.codeservice.code);
  }

  async downloadZip() {
    var zip = new JSZip();

    await this.addToZip(this.nodeService.getNodes()[0], zip)
    await this.addToZip(this.nodeService.getNodes()[1], zip)
    await this.addToZip(this.nodeService.getNodes()[2], zip)

    zip.generateAsync({type:"blob"})
    .then(function(content) {
      // see FileSaver.js
      saveAs(content, "code.zip");
    });
  }

  async addToZip(node: Node, zip, tableIndex?: number) {
    if (node.children.length == 0) {
      let code: string = await firstValueFrom(this.codeservice.downloadCode(node.downloadType ?? DownloadType.Controller, tableIndex));
      zip?.file(node.name, code);
    } else {
      var newFolderZip = zip;
      node.name.split(".").forEach(nodeName => {
         newFolderZip = newFolderZip.folder(nodeName);
      })
      // if (node.name.indexOf(".") !== undefined) {

      // } else {
      //   newFolderZip = zip.folder(node.name);
      // }
      node.children.forEach((childNode, index) => {
        zip = this.addToZip(childNode, newFolderZip, index);
      })
    }
    return zip;
  }

  getFileName() {
    return this.codeservice.getCurrentFileName();
  }

  ngOnInit(): void {
  }
}

