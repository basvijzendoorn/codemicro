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
  children: Node[],
  showChildren?: boolean
  downloadType?: DownloadType
  tableIndex?: number

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
      showChildren: true,
      children: [
        {
          name: "main",
          showChildren: true,
          children: [
            {
              name: "java",
              showChildren: true,
              children: [
                {
                  name: "com.example.demo",
                  showChildren: true,
                  children: [
                    {
                      name: "controllers",
                      showChildren: true,
                      children: []
                    }, {
                      name: "entities",
                      showChildren: true,
                      children: []
                    }, {
                      name: "repositories",
                      showChildren: true,
                      children: []
                    }, {
                      name: "Application.java",
                      children: []
                    }
                  ]
                }
              ]
            }, {
              name: "resources",
              showChildren: false,
              children: [
                {
                  name: "db.migration",
                  showChildren: true,
                  children: [ {
                    name: "V1__init.sql",
                    children: []
                  }]
                },
                {
                  name: "application.properties",
                  children: []
                }
              ]
            }
          ]
        }
      ]
    }, {
      name: "pom.xml",
      children: []
    }
  ]

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
              private codeService: CodeService) {
  }

  ngOnInit() {
    //var controllerNode = this.nodes[0].children[0].children[0].children[0].children[0];
    this.codeService.getControllerCode(0);
    this.codeService.currentFileName = this.tableSettingsService.getTables()[0].name + "Controller.java"
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
    var packageFolder = this.nodes[0].children[0].children[0].children[0]

    packageFolder.children[0].children = this.tableSettingsService.getTables().map<Node>( (tableSettings, index) => ({
      name: tableSettings.name + "Controller.java",
      downloadType: DownloadType.Controller,
      tableIndex: index,
      children: []
    }));

    packageFolder.children[1].children = this.tableSettingsService.getTables().map<Node>( (tableSettings, index) => ({
      name: tableSettings.name + "Entity.java",
      downloadType: DownloadType.Entity,
      tableIndex: index,
      children: []
    }));

    packageFolder.children[2].children = this.tableSettingsService.getTables().map<Node>( (tableSettings, index) => ({
      name: tableSettings.name + "Repository.java",
      downloadType: DownloadType.Repository,
      tableIndex: index,
      children: []
    }));

    packageFolder.children[3] = {
      name: this.codeService.artifactId.charAt(0).toUpperCase() + this.codeService.artifactId.substring(1) + "Application.java",
      downloadType: DownloadType.Application,
      children: []
    }

    this.nodes[1] = {
      name: "pom.xml",
      downloadType: DownloadType.Pom,
      children: []
    }

    this.nodes[0].children[0].children[1].children[0].children[0] = {
      name: "V1__init.sql",
      downloadType: DownloadType.FlywayInit,
      children: []
    }

    this.nodes[0].children[0].children[1].children[1] = {
      name: "application.properties",
      downloadType: DownloadType.Properties,
      children: []
    }

    return this.nodes;
    // return this.nodes;
  }


}
