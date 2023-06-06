import { Component } from '@angular/core';
import { CodeService, DownloadType } from '../services/code.service';
import { NodeService } from '../services/node.service';
import { Table, TableSettingsService } from '../services/table-settings.service';


// const TREE_DATA: TreeNode[] = [
//   {
//     name: 'Controllers',
//     children: [{name: 'TickerController.java'}],
//   },
//   {
//     name: 'Entities',
//     children: [
//       {
//         name: 'TickerEntity.java'
//       },
//       {
//         name: 'PriceEntity.java'
//       },
//     ],
//   },
// ];


@Component({
  selector: 'app-exploretree',
  templateUrl: './exploretree.component.html',
  styleUrls: ['./exploretree.component.css']
})
export class ExploretreeComponent {

  //nodes: Node[] =

  // nodes: Node[] = [{
  //   name: "Controllers",
    // children: this.tableSettingsService.getTables().map<Node>((tableSettings, index) => ({
    //   name: tableSettings.name + "Controller.java",
    //   downloadType: DownloadType.Controller,
    //   tableIndex: index
    // })),

    // children: this.tableSettingsService.getTables().map<Node>(tableSettings => ({name: tableSettings.name + "Controller.java", downloadType: DownloadType.Controller}))
    // children: [{
    //   name: "FirstTableController.java",
    //   downloadType: DownloadType.Controller,
    //   tableIndex: 0
    // }, {
    //   name: "SecondTableContoller.java",
    //   downloadType: DownloadType.Controller,
    //   tableIndex: 1
    // }],

  //   showChildren: true
  // }]

  // nodes: Node[] = [
  //   {
  //     name: "Controllers",
  //   }, {
  //     name: "Repositories",
  //   }, {
  //     name: "Entities",
  //   }
  // ]

  constructor(private tableSettingsService: TableSettingsService,
              private codeService: CodeService,
              private nodeService: NodeService) {
  }

  ngOnInit() {
    //var controllerNode = this.nodes[0].children[0].children[0].children[0].children[0];

    // this.codeService.getControllerCode(0).subscribe(code => {
    //   this.codeService.code = code
    //   this.codeService.currentTableIndex = 0
    //   this.codeService.currentDownloadType = DownloadType.Controller
    // });
    // this.codeService.currentFileName = this.tableSettingsService.getTables()[0].name + "Controller.java"
    
    //this.codeService.downloadCode(controllerNode.downloadType ?? DownloadType.Controller, controllerNode.name, controllerNode.tableIndex);
  }

  getNodes() {
    // const nodes: Node[] = [
    //   {
    //     name: "Controllers"
    //     // children: this.tableSettingsService.getTables().map<Node>(tableSettings => ({ name: tableSettings.name }))
    //   }, {
    //     name: "Entities",
    //     children: [{
    //       name: "abc"
    //     }]
    //   }
    // ]


    // this.nodes[0].children = this.tableSettingsService.getTables().map<Node>(tableSettings => ({ name: tableSettings.name + "Controller.java" }))
    // this.nodes[1].children = this.tableSettingsService.getTables().map<Node>(tableSettings => ({ name: tableSettings.name + "Repository.java" }))
    // this.nodes[2].children = this.tableSettingsService.getTables().map<Node>(tableSettings => ({ name: tableSettings.name + ".java" }))


    // this.nodes.forEach(folder => {
    //   folder.children = this.tableSettingsService.getTables().map<Node>(tableSettings => ({ name: tableSettings.name }))
    // })

    // this.tableSettingsService.getTables().map(tableSettings => {
    //     name: tableSettings.name,
    //     children: []
    // })

    // return this.nodes;
    return this.nodeService.getNodes()
  }


}
