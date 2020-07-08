import { Component, OnInit, Input } from '@angular/core';
import { InputOption } from './shared/input.model';
import { Router } from '@angular/router';
import { InputService } from './shared/input.service';

@Component({
  selector: 'app-cruddatatable',
  templateUrl: './cruddatatable.component.html',
  styleUrls: ['./cruddatatable.component.css']
})
export class CRUDdatatableComponent implements OnInit {
  @Input() options:InputOption;
  
  constructor(private router:Router, private inputService:InputService) { }

  ngOnInit(): void {
    this.inputService.setInputOption(this.options);    
  }
}