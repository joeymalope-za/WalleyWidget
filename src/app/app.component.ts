import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = "Walley's Widget";
  sizeArray = [250, 500, 1000, 2000, 5000];
  indexTracker = [
    { value: 250, count: 0 },
    { value: 500, count: 0 },
    { value: 1000, count: 0 },
    { value: 2000, count: 0 },
    { value: 5000, count: 0 }
  ]; 
  orderNumber:number = 0;
  focused:boolean = false;
  showReceipt:boolean = false;

  setOrderInputFocus(){
    this.focused = !this.focused ; 
  }

  generateQuote(e:any){
    let input = this.orderNumber;
    e.stopPropagation();
    e.preventDefault();
    this.reset();
    this.showReceipt = true;
  //  this.calculatePacketsV3(input);
    this.calculatePacketsV2(input);
    console.log("called:",this.orderNumber)
    this.printList();
  }

  calculatePacketsV2(input:number){
    if (input == 0) {
      //base case
      return 0;
      //in between cases
    } else if (this.sizeArray[4] <= input) {
      this.calculatePacketsV2(input - this.sizeArray[4]);
      this.indexTracker[4].count++;
    } else if (this.sizeArray[3] <= input) {
      this.calculatePacketsV2(input - this.sizeArray[3]);
      this.indexTracker[3].count++;
    } else if (this.sizeArray[2] <= input) {
      this.calculatePacketsV2(input - this.sizeArray[2]);
      this.indexTracker[2].count++;
    } else if (this.sizeArray[1] <= input) {
      this.calculatePacketsV2(input - this.sizeArray[1]);
      this.indexTracker[1].count++;
    } else if (
      //last element
      this.sizeArray[0] <= input &&
      input - this.sizeArray[0] < this.sizeArray[0] &&
      input - this.sizeArray[0] > 0
    ) {
      this.indexTracker[1].count++;
      this.calculatePacketsV2(0);
    } // smaller than last element
    else if (this.sizeArray[0] >= input) {
      this.indexTracker[0].count++;
      this.calculatePacketsV2(0);
    }

    return;
  };

  calculatePacketsV3(input:any) {
    if (input == 0) {
      //base case
      return;
    } else if (this.sizeArray[0] < input) {
      //in between cases
      for (let i = this.sizeArray.length - 1; i >= 0; i--) {
        if (
          i == 0 &&
          input - this.sizeArray[0] < this.sizeArray[0] &&
          input - this.sizeArray[0] > 0
        ) {
          this.indexTracker[i + 1].count++;
          // calculatePacketsV3(0);
        } else if (this.sizeArray[i] <= input) {
          this.calculatePacketsV3(input - this.sizeArray[i]);
          this.indexTracker[i].count++;
        }
      }
    } else if (
      //last element
      this.sizeArray[0] <= input &&
      input - this.sizeArray[0] < this.sizeArray[0] &&
      input - this.sizeArray[0] > 0
    ) {
      this.indexTracker[1].count++;
    //  this.calculatePacketsV3(0);
    } // smaller than last element
    else if (this.sizeArray[0] >= input) {
      this.indexTracker[0].count++;
    }
  }

  calculatePacketsV4(input:any){
    if (input == 0) {
      //base case
      return 0;
    } else if (this.sizeArray[0] < input) {
      //in between cases
      for (let i = this.sizeArray.length - 1; i > 0; i--) {
        if (
          i == 0 &&
          input - this.sizeArray[0] < this.sizeArray[0] &&
          input - this.sizeArray[0] > 0
        ) {
          this.indexTracker[i + 1].count++;
          // calculatePacketsV3(0);
        } else if (this.sizeArray[i] <= input) {
          this.calculatePacketsV4(input - this.sizeArray[i]);
          this.indexTracker[i].count++;
        }
      }
    } else if (
      //last element
      this.sizeArray[0] <= input &&
      input - this.sizeArray[0] < this.sizeArray[0] &&
      input - this.sizeArray[0] > 0
    ) {
      this.indexTracker[1].count++;
      this.calculatePacketsV4(0);
    } // smaller than last element
    else if (this.sizeArray[0] >= input) {
      this.indexTracker[0].count++;
      this.calculatePacketsV4(0);
    }

    return 0;
  }

  reset(){
    this.indexTracker.forEach((el)=>{
      el.count = 0;
    })
  };

  printList(){
    for (let i = 0; i < this.indexTracker.length; i++) {
      if (this.indexTracker[i].count > 0)
        console.log(`${this.indexTracker[i].value} x ${this.indexTracker[i].count}`);
    }
    //this.reset();
  }
}
