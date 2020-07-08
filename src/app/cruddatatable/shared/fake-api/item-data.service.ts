import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Item} from './item-data';
import { Injectable } from '@angular/core';

@Injectable({providedIn:'root'})
export class ItemData implements InMemoryDbService {
  createDb(){
    const items: Item[]=[
      { id: 1, name: 'Ram',age: 19,salary:212870 , email: 'ram@gmail.com', contact: '8851400140'  },
      { id: 2, name: 'Shyam',age: 18,salary:258129900, email: 'sh@gmail.com', contact: '1111111111'  },
      { id: 3, name: 'Mohan', age: 30,salary:3350000, email: 'moh@live.in', contact: '2222222222'  },
      { id: 4, name: 'Rohan', age: 35,salary:35980000, email: 'rohan@gmail.com', contact: '6666666666' },
      { id: 5, name: 'Sumit', age: 40,salary:40000, email: 'sumit@live.in', contact: '9909999999'  }

    ];
    return {items};
  }
}