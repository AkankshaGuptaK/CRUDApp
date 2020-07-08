import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InputOption, Column } from '../shared/input.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { InputService } from '../shared/input.service';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-data-add-edit',
  templateUrl: './data-add-edit.component.html',
  styleUrls: ['./data-add-edit.component.css']
})
export class DataAddEditComponent implements OnInit {
  editIndex:number;
  mode:string;
  itemForm:FormGroup;
  options:InputOption;
  columns:Column[];
  showAlert:boolean=false;
  alertMessage:string='';

  constructor(private router:Router, private activatedRoute:ActivatedRoute,private dataService:DataService,
      private inputService:InputService ) { }

  get formControls() { return this.itemForm.controls; }

  ngOnInit(): void {
    this.options=this.inputService.getInputOption();
    this.columns=this.inputService.getColumns();
    this.activatedRoute.params.subscribe(
      (params:Params)=>{
        if(params.id != null){
          this.editIndex=+params.id;
          this.mode='Edit';
        }
        else{
          this.mode='Add';
        }
        this.formInit();
      }
    )
  }

  getData(data){

    return (this.formControls[data]);
  }

  formInit(){
    if(this.mode=='Edit'){
      this.dataService.getUser(this.editIndex).subscribe(data => {
        let item = data;
        let group={}    
        this.columns.forEach(column=>{
          group[column.data]=new FormControl(item[column.data],Validators.required);  
        })
        this.itemForm = new FormGroup(group);
      });
    }
    else{
      let group={}    
      this.columns.forEach(column=>{
        group[column.data]=new FormControl(null,Validators.required);  
      })
      this.itemForm = new FormGroup(group);
    }    
  }

  executeCallback(callback: Function) : void {
    this.showAlert=true;
    callback();
  }

  onSubmit(){
    if(this.mode=='Add'){
      this.dataService.addItem(this.itemForm.value)
      .subscribe(response => {
          this.executeCallback(this.options.events.added);
          this.alertMessage="Item Added successfully! Call back being executed-check console."
          setTimeout(() => {
            this.onCancel();
          }, 2000);          
      });
    }
    else{
      this.dataService.getUser(this.editIndex).subscribe(data => {
        let item = data;
        this.columns.forEach(column=>{
          item[column.data]=this.itemForm.value[column.data];  
        })
        // item.name = this.itemForm.value.name;
        // item.age = this.itemForm.value.age;
        // item.salary = this.itemForm.value.salary;
        this.dataService.updateItem(item,this.editIndex).subscribe(data1 => {
          this.executeCallback(this.options.events.edited);
          this.onCancel();
        });
      });
    }
  }

  onCancel(){
    this.router.navigate(['']);
  }

}
