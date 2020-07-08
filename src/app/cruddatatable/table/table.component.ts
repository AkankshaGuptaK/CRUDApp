import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { formatNumber } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { InputService } from '../shared/input.service';
import { Router } from '@angular/router';
import { DataService } from '../shared/data.service';
import { ShortNumberPipe } from '../shared/short-number.pipe';
import { Column, InputOption } from '../shared/input.model';
declare var $: any 
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  options:InputOption;
  datatableData=[];
  closeResult: string;
  dtOptions: DataTables.Settings = {};
  columns:Column[];
  dtTrigger: Subject<any> = new Subject();

  constructor(private http:HttpClient,private inputService:InputService, private router:Router,
              private dataService:DataService, private shortNumberPipe:ShortNumberPipe) { }

  ngOnInit(): void {
    $(document).on( 'click', '.getDetails', function () {
     $("#myModal").modal('show');
    } );
    this.options=this.inputService.getInputOption();
    this.columns = this.options.dataTableOptions.Columns;
    this.inputService.setColumns(this.columns);
    this.getItems();
    this.dtOptions = {
          pagingType: 'full_numbers',
          pageLength: 8,
          processing: true,
          dom: 'Bfrtip',
            // buttons: [
            //     'copy', 'csv', 'excel', 'print'
            // ]
        };
  }

  getItems(){
    this.dataService.getItems().subscribe(response=>{
      this.datatableData=response;
      for(let column of this.columns){
        if(column.format.toLowerCase()=="amount"){
          for(let j=0;j<this.datatableData.length;j++){
            this.datatableData[j][column.data] = this.shortNumberPipe.transform(this.datatableData[j][column.data]);
          }
        }
        else if(column.format.toLowerCase()=="number"){
          for(let j=0;j<this.datatableData.length;j++){
            this.datatableData[j][column.data] = formatNumber(this.datatableData[j][column.data],"en-US");
          }
        }
      }
      this.rerender();
    })
  }

  
  onAddClick(){
    this.router.navigate(['/add']);
  }

  onEdit(index:number){
    this.router.navigate(['/edit',index]);
  }

  executeCallback(callback: Function) : void {
    callback();
  }

  onDelete(index:number){
    this.executeCallback(this.options.events.deleted);
    this.dataService.deleteItem(index).subscribe(data => {
      $(document).on( 'click', '.getDetails', function () {
        // $(".username").text("");
        // $(".username").text($(this).parents("tr").find(".fname").text());
       $("#myModal").modal('show');
      } );      
      this.getItems();   
      this.rerender();   
    });
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      //this.dtTrigger.next();
      setTimeout(() => {
        this.dtTrigger.next();
    });
    });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(){
    this.dtTrigger.unsubscribe();
  }

}
