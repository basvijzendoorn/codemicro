import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AIResponse } from './chat.service';
import { aiurl } from 'src/environments/environment';
import { TableSettingsService } from './table-settings.service';

export interface OpenAIResponse {
  content: string,
  role: string
}

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {

  constructor(private http: HttpClient,
    private tableSettingsService: TableSettingsService) { }

  async downloadopenai(prompt: string) {
    this.http.post<OpenAIResponse>(aiurl, {
        "prompt": prompt
    }).subscribe(resp => {
      console.log(resp);
      // this.addPromptToTables(resp.content);
      this.addTableToTables(resp.content);
    })
  }

  

  addTableToTables(content: string) {
    // content = 'Here is an example of a database schema in SQL that includes tables for reservations and bookings:\n\n```\nCREATE TABLE reservations (\n  id INT PRIMARY KEY,\n  guest_name VARCHAR(100),\n  check_in_date DATE,\n  check_out_date DATE,\n  room_number INT,\n  total_price DECIMAL(10, 2),\n  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);\n\nCREATE TABLE bookings (\n  id INT PRIMARY KEY,\n  reservation_id INT,\n  booking_date DATE,\n  FOREIGN KEY (reservation_id) REFERENCES reservations(id)\n);\n```\n\nExplanation:\n- The `reservations` table includes columns for reservation ID, guest name, check-in date, check-out date, room number, total price, and created timestamp.\n- The `bookings` table includes columns for booking ID, reservation ID (foreign key referencing the reservations table), and the booking date.\n\nThese tables can be used to store information about reservations made by guests and bookings made for those reservations. Each reservation will have a unique ID, with relevant details such as guest name, check-in/check-out dates, and room number. The bookings table will have a unique ID for each booking along with its corresponding reservation.'

    let lines = content.split('\n');


    let startTableLines: number[] = []
    let endTableLines: number[] = []
    lines.forEach( (line, index) => {
      if (line.toLocaleLowerCase().includes('create table')) {
        startTableLines.push(index);
      } else if (line.toLocaleLowerCase().startsWith(')')) {
        endTableLines.push(index);
      }
    });

    let columnIndices: number[][] = [];

    const tables = startTableLines.map ( (tableIndex, index) => {
      return {
        name: this.getTableNameFromSQLLine(lines[tableIndex]),
        fields: Array.from(new Array(endTableLines[index] - startTableLines[index] - 1).keys()).map( (value, columnIndex) => {
          return {
            name: this.getColumnNameFromSQLLine(lines[tableIndex + columnIndex + 1]),
            type: "string"
          }
        })
      }
    });

    this.tableSettingsService.tableSettings.tables = tables;

    console.log(tables);

    // startTableLines.map( (startTable, index) => {
    //   columnIndices[index] =
    // });

    console.log(startTableLines);
    console.log(endTableLines);

    console.log(lines);
  }

  getTableNameFromSQLLine(tableNameLine: string) {
    return tableNameLine.split(' ')[2];
  }

  getColumnNameFromSQLLine(columnNameLine: string) {
    return columnNameLine.trimStart().split(" ")[0];
  }
  
  addPromptToTables(content: string) {
    // const content = "Here is a possible database schema for a reservation and question system:\n\nTable: Users\n- user_id (Primary Key)\n- name\n- email\n- password\n\nTable: Reservations\n- reservation_id (Primary Key)\n- user_id (Foreign Key: Users.user_id)\n- date\n- time\n- status (pending, confirmed, cancelled)\n\nTable: Questions\n- question_id (Primary Key)\n- user_id (Foreign Key: Users.user_id)\n- question\n- answer\n- reservation_id (Foreign Key: Reservations.reservation_id)\n\nNote: In this schema, there are three tables - \"Users\", \"Reservations\", and \"Questions\". The \"Users\" table contains information about the users, such as their names, emails, and passwords. The \"Reservations\" table stores details about the reservations made by the users, including the date, time, and status (whether it's pending, confirmed, or cancelled). Lastly, the \"Questions\" table holds the questions asked by the users, their corresponding answers, and the reservation ID to which the question pertains. Each question is associated with a specific user and reservation.\n\nThe user_id in the \"Reservations\" and \"Questions\" tables act as foreign keys, referencing the user_id in the \"Users\" table. Similarly, the reservation_id in the \"Questions\" table serves as a foreign key, referencing the reservation_id in the \"Reservations\" table.\n\nThis schema allows for the association of reservations with users and questions related to specific reservations. It provides a basis for tracking and managing reservations, answering user queries, and maintaining the overall functionality of a reservation and question system."
    let lines = content.split('\n');
    
    let columnIndices: number[] = []
    lines.forEach((line, index) => {
      if (line.indexOf('-') >= 0 && line.indexOf('-') <= 5) {
        columnIndices.push(index);
      }
    });

    let tableColumnIndices: number[][] = []
    let previousIndex = 0;

    let tableIndices = [columnIndices[0] - 1]
    for (let i = 0; i < columnIndices.length; i++) {
      if (columnIndices[i+1] - columnIndices[i] > 1) {
        tableIndices.push(columnIndices[i+1] - 1);
        tableColumnIndices.push(columnIndices.slice(previousIndex, i+1))
        previousIndex = i + 1;
      }
    }
    tableColumnIndices.push(columnIndices.slice(previousIndex));

    console.log(tableColumnIndices);
    console.log(columnIndices);
    console.log(tableIndices);

    let tables2 = tableColumnIndices.map( (tableColumnIndices, index) => {
      return {
        name: this.getTableNameFromLine(lines[tableIndices[index]]),
        fields: tableColumnIndices.map(columnIndex => {
          return {
            name: this.getColumnNameFromLine(lines[columnIndex]),
            type: "string"  
          }
        })
      }
    })

    const tableNames = tableIndices.map(tableIndex => {
      return this.getTableNameFromLine(lines[tableIndex]);
    });

    const columnNames = columnIndices.map(columnIndex => {
      return this.getColumnNameFromLine(lines[columnIndex]);
    });

    console.log(lines);
    console.log(tableNames);
    console.log(columnNames);

    const tables = tableNames.map(tableName => {
      return {
        name: tableName,
        fields: columnNames.map(columnName => {
          return {
            name: columnName,
            type: "string"
          }
        })
      }
    });
    
    this.tableSettingsService.tableSettings.tables = tables2;
  }

  getColumnNameFromLine(columnLine: string) {
    columnLine = columnLine.replace("-", "");
    columnLine = columnLine.replaceAll(" ","");
    const columns = columnLine.split("(");
    return columns[0];
  }

  getTableNameFromLine(tableLine: string) {
    tableLine = tableLine.replace(/[0-9]/g, '!');
    tableLine = tableLine.replace(".", "")
    tableLine = tableLine.replace("Table", "");
    tableLine = tableLine.replace("table", "");
    tableLine = tableLine.replace(":", "");
    tableLine = tableLine.replace(" ", "");
    return tableLine;
  }
}
