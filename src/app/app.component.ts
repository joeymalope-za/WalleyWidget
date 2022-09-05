import { Component } from '@angular/core';
import { PacketSize } from './models/PacketSize';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  widgetPacketSizes = [250, 500, 1000, 2000, 5000, 10000, 20000, 50000];
  indexTracker:Array<PacketSize> = [];
  orderNumber:number = 0;
  focused:boolean = false;
  showReceipt:boolean = false;

  constructor(){
    this.initializeIndexTracker();
  }

  setOrderInputFocus(){
    this.focused = !this.focused ; 
  }

  initializeIndexTracker(){
    this.indexTracker = []
    this.widgetPacketSizes.forEach((packetSize:number)=>{
      this.indexTracker.push({
        value: packetSize,
        count: 0
      });
    }) 
  } 

  generateQuote(e:any){
    let orderNo = this.orderNumber;
    //Prevent default button behavior
    e.stopPropagation();
    e.preventDefault();
    //actually implementation
    //Reset indexTracker incase it was used prior
    this.reset();
    this.showReceipt = true;
    //Calculate the boxes and their sizes and store the results in index tracker
    this.calculatePacketsV4(orderNo);
    //print results on the Quotation
  }

  //Can only support an array of size 5
  calculatePacketsV2(orderNo:number){
    if (orderNo == 0) {
      //base case
      return 0;
      //in between cases
    } else if (this.widgetPacketSizes[4] <= orderNo) {
      this.calculatePacketsV2(orderNo - this.widgetPacketSizes[4]);
      this.indexTracker[4].count++;
    } else if (this.widgetPacketSizes[3] <= orderNo) {
      this.calculatePacketsV2(orderNo - this.widgetPacketSizes[3]);
      this.indexTracker[3].count++;
    } else if (this.widgetPacketSizes[2] <= orderNo) {
      this.calculatePacketsV2(orderNo - this.widgetPacketSizes[2]);
      this.indexTracker[2].count++;
    } else if (this.widgetPacketSizes[1] <= orderNo) {
      this.calculatePacketsV2(orderNo - this.widgetPacketSizes[1]);
      this.indexTracker[1].count++;
    } else if (
      //last element
      this.widgetPacketSizes[0] <= orderNo &&
      orderNo - this.widgetPacketSizes[0] < this.widgetPacketSizes[0] &&
      orderNo - this.widgetPacketSizes[0] > 0
    ) {
      this.indexTracker[1].count++;
    } // smaller than last element
    else if (this.widgetPacketSizes[0] >= orderNo) {
      this.indexTracker[0].count++;
    }

    return;
  };

  //This can calculated the size regardless of the number of elements in the widgetPacketSizes.
  calculatePacketsV4(orderNo:number ){
    if (orderNo == 0) {
      //base case
      return 0;
    } else if (
      this.widgetPacketSizes[0] <= orderNo &&
      !(orderNo - this.widgetPacketSizes[0] <= this.widgetPacketSizes[0] && orderNo - this.widgetPacketSizes[0] > 0)
    ) {
      //in between cases
      let index = -1;
      for (let i = this.widgetPacketSizes.length - 1; i >= 0; i--) {
        if (
          i == 0 &&
          orderNo - this.widgetPacketSizes[0] <= this.widgetPacketSizes[0] &&
          orderNo - this.widgetPacketSizes[0] > 0
        ) {
          // exit case
          this.indexTracker[i + 1].count++;
        } else if (this.widgetPacketSizes[i] <= orderNo) {
          index = i;
          break;
        }
      }
      this.calculatePacketsV4((orderNo - this.widgetPacketSizes[index]));
      if(index!=-1)
        this.indexTracker[index].count++;
    } else if ( //accomadate edge case there (orderNo == pack Size)
      this.widgetPacketSizes[0] <= orderNo &&
      orderNo - this.widgetPacketSizes[0] > 0
    ) {
      this.indexTracker[1].count++;
      this.calculatePacketsV4(0);
    } // smaller than last element
    else if (this.widgetPacketSizes[0] >= orderNo) {
      this.indexTracker[0].count++;
    }

    return;
  };

  //resets indexTracker counters
  reset(){
    this.indexTracker.forEach((el)=>{
      el.count = 0;
    })
  };
}
