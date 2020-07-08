import { Injectable } from '@angular/core';
import { InputOption, Column } from './input.model';

@Injectable({providedIn:'root'})
export class InputService{
    private inputOption:InputOption;
    private inputColumn:Column[];

    getInputOption(){
        return this.inputOption;
    }

    setInputOption(inputOption:InputOption){
        this.inputOption=inputOption;
    }

    setColumns(column:Column[]){
        this.inputColumn=column;
    }

    getColumns():Column[]{
        return this.inputColumn;
    }

}