import {Component} from '@angular/core';

@Component({
  selector: 'dropzone',
  template: `
    <div id="myId">Drop down area</div>
    `
    // <div id="myId" style="width: 200px; height: 200px; background-color: gray;">Drop down area</div>
    // <dropzone [config]="config" [message]="'Click or drag images here to upload'" (error)="onUploadError($event)" (success)="onUploadSuccess($event)"></dropzone>
    // <div [dropzone]="config" (error)="onUploadError($event)" (success)="onUploadSuccess($event)">Add Images/Files by clicking here.</div>
})
export class DropzoneComponent {
  private _dropzone: Dropzone;

  constructor() {
    System.import('../dropzone.js').then((dz) => this.initDropzone(dz));
  }

  initDropzone(d: any) {
    this._dropzone = new d('div#myId', { url: 'http://localhost:8000/upload'});
  }
}
