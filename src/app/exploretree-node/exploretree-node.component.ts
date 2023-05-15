import { Component, Input, OnInit } from '@angular/core';
import { Node } from '../exploretree/exploretree.component';
import { CodeService, DownloadType } from '../services/code.service';

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

  downloadCode(downloadType: DownloadType, tableIndex?: number) {
    this.codeService.downloadCode(downloadType, tableIndex)
  }

  nodeClick(node: Node) {
    if (node.downloadType !== undefined) {
      this.downloadCode(node.downloadType, node.tableIndex);
      // if (node.downloadType === DownloadType.Controller) {
      //   this.codeService.getControllerCode(node.tableIndex ?? 0)
      // } else if (node.downloadType === DownloadType.Entity) {
      //   this.codeService.getEntityCode(node.tableIndex ?? 0);
      // } else if (node.downloadType === DownloadType.Repository) {
      //   this.codeService.getRepositoryCode(node.tableIndex ?? 0);
      // } else if (node.downloadType === DownloadType.Pom) {
      //   this.codeService.getPomCode();
      // } else if (node.downloadType === DownloadType.Properties) {
      //   this.codeService.getPropertiesCode()
      // } else if (node.downloadType === DownloadType.FlywayInit) {
      //   this.codeService.getFlywayInitCode()
      // } else if (node.downloadType === DownloadType.Application) {
      //   this.codeService.getApplicationCode()
      // }
    } else {
      if (node.showChildren) {
        node.showChildren = false
      } else {
        node.showChildren = true
      }
    }
  }
}
