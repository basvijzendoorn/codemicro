import { Injectable } from '@angular/core';
import { CodeService, DownloadType } from './code.service';
import { TableSettingsService } from './table-settings.service';

export interface Node {
  name: string,
  children: Node[],
  showChildren?: boolean
  downloadType?: DownloadType
  tableIndex?: number
}

@Injectable({
  providedIn: 'root'
})
export class NodeService {

  constructor(private codeService: CodeService,
              private tableSettingsService: TableSettingsService) { }

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
                      name: "models",
                      showChildren: true,
                      children: []
                    }, {
                      name: "dto",
                      showChildren: true,
                      children: []
                    }, {
                      name: "services",
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
              showChildren: true,
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
    }, {
      name: "README.md",
      children: []
    }
  ]

  getNodes() {
    var packageFolder = this.nodes[0].children[0].children[0].children[0];

    packageFolder.children[0].children = this.tableSettingsService.getTables().map<Node>( (tableSettings, index) => ({
      name: tableSettings.name + "Controller.java",
      downloadType: DownloadType.Controller,
      tableIndex: index,
      children: []
    }));

    packageFolder.children[1].children = this.tableSettingsService.getTables().map<Node>( (tableSettings, index) => ({
      name: tableSettings.name + ".java",
      downloadType: DownloadType.Entity,
      tableIndex: index,
      children: []
    }));

    packageFolder.children[2].children = this.tableSettingsService.getTables().map<Node>( (tableSettings, index) => ({
      name: tableSettings.name + "DTO.java",
      downloadType: DownloadType.DTO,
      tableIndex: index,
      children: []
    }));

    packageFolder.children[3].children = this.tableSettingsService.getTables().map<Node>( (tableSettings, index) => ({
      name: tableSettings.name + "Service.java",
      downloadType: DownloadType.Service,
      tableIndex: index,
      children: []
    }));


    packageFolder.children[4].children = this.tableSettingsService.getTables().map<Node>( (tableSettings, index) => ({
      name: tableSettings.name + "Repository.java",
      downloadType: DownloadType.Repository,
      tableIndex: index,
      children: []
    }));

    packageFolder.children[5] = {
      name: this.codeService.artifactId.charAt(0).toUpperCase() + this.codeService.artifactId.substring(1) + "Application.java",
      downloadType: DownloadType.Application,
      children: []
    }

    this.nodes[1] = {
      name: "pom.xml",
      downloadType: DownloadType.Pom,
      children: []
    }

    this.nodes[2] = {
      name: "README.md",
      downloadType: DownloadType.Readme,
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
  }
}
