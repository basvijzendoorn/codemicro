import { Component } from '@angular/core';
import { CodeService } from '../services/code.service';
import { TableSettingsService } from '../services/table-settings.service';


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
}

@Component({
  selector: 'app-exploretree',
  templateUrl: './exploretree.component.html',
  styleUrls: ['./exploretree.component.css']
})
export class ExploretreeComponent {

  nodes: Node[] = [
    {
      name: "Controllers",
    }, {
      name: "Repositories",
    }, {
      name: "Entities",
    }
  ]

  constructor(private tableSettingsService: TableSettingsService,
              private codeService: CodeService) {
  }

  ngOnInit() {
    this.codeService.getControllerCode(this.tableSettingsService.getTables()[0])

  }

  downloadCode(folderIndex: number, tableIndex: number) {
    if (folderIndex == 0) this.codeService.getControllerCode(this.tableSettingsService.getTables()[tableIndex])
    else if (folderIndex == 1) this.codeService.getRepositoryCode(this.tableSettingsService.getTables()[tableIndex])
    else if (folderIndex == 2) this.codeService.getEntityCode(this.tableSettingsService.getTables()[tableIndex])
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
    this.nodes[0].children = this.tableSettingsService.getTables().map<Node>(tableSettings => ({ name: tableSettings.name + "Controller.java" }))
    this.nodes[1].children = this.tableSettingsService.getTables().map<Node>(tableSettings => ({ name: tableSettings.name + "Repository.java" }))
    this.nodes[2].children = this.tableSettingsService.getTables().map<Node>(tableSettings => ({ name: tableSettings.name + ".java" }))


    // this.nodes.forEach(folder => {
    //   folder.children = this.tableSettingsService.getTables().map<Node>(tableSettings => ({ name: tableSettings.name }))
    // })

    // this.tableSettingsService.getTables().map(tableSettings => {
    //     name: tableSettings.name,
    //     children: []
    // })
    return this.nodes;
    // return this.nodes;
  }

  toggle(folder: Node) {
    if (folder.showChildren) {
      folder.showChildren = false
    } else {
      folder.showChildren = true
    }
  }

}
