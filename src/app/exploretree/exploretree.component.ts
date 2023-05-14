import { Component } from '@angular/core';
import { CodeService, DownloadType } from '../services/code.service';
import { TableSettings, TableSettingsService } from '../services/table-settings.service';


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

export interface Node {
  name: string,
  children?: Node[],
  showChildren?: boolean
  downloadType?: DownloadType
}

@Component({
  selector: 'app-exploretree',
  templateUrl: './exploretree.component.html',
  styleUrls: ['./exploretree.component.css']
})
export class ExploretreeComponent {

  nodes: Node[] = [
    {
      name: "src",
      children: [
        {
          name: "main",
        }
      ]
    }
  ]

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
              private codeService: CodeService) {
  }

  ngOnInit() {
    this.codeService.getControllerCode(0,0)
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

    this.nodes = [{
        name: "Controllers",
        // children: this.tableSettingsService.getTables().map<Node>(tableSettings => ({name: tableSettings.name + "Controller.java", downloadType: DownloadType.Controller}))
        children: [{
          name: "abc"
        }]
    }];

    return this.nodes;
    // return this.nodes;
  }


}
