import { Component, OnInit } from '@angular/core';
import { InputOption } from './cruddatatable/shared/input.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Reusable CRUD app';
  options = {
    BaseAPIUrl: "api",  
    Get: "items", //calls---> http://dummy.restapiexample.com/api/v1/employees
    edit: "items/:id",
    add: "items",
    delete: "items/:id",
    dataTableOptions: {
  Columns:[  {name: "Name", data: "name" ,format:"text"},
   {name: "Age", data: "age", format:"number"},
   {name: "Salary", data: "salary",format:"amount" },
   {name: "Contact", data: "contact",format:"number" }]   
    },
    events: {    
      edited: function () {console.log("Edited called");},
      added: function () {console.log("Added called");},
      deleted: function () {console.log("Deleted called");},  }
  };

  inputOptionObj:InputOption=<InputOption>(this.options);

  ngOnInit(){

  }
}