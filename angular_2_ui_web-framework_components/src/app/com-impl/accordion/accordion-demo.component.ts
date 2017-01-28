import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'accordion-demo',
  templateUrl: './accordion-demo.component.html',
  styleUrls: ['./accordion-demo.component.css']
})
export class AccordionDemoComponent implements OnInit {

public singleModel:string = '1';
 public radioModel:string = 'Middle';
public checkModel:any = {left: false, middle: true, right: false};


  public oneAtATime:boolean = true;
  public items:Array<string> = ['Item 1', 'Item 2', 'Item 3'];
 
  public status:Object = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
 
  public groups:Array<any> = [
    {
      title: 'Dynamic Group Header - 1',
      content: 'Dynamic Group Body - 1'
    },
    {
      title: 'Dynamic Group Header - 2',
      content: 'Dynamic Group Body - 2'
    }
  ];
 
  public addItem():void {
    this.items.push(`Items ${this.items.length + 1}`);
  }

  constructor() { }

  ngOnInit() {
  }

}
