import { Component, OnInit } from '@angular/core';
import { Element } from 'src/app/models/element.model';
import { ElementService } from 'src/app/_services/element.service';

@Component({
  selector: 'app-add-element',
  templateUrl: './add-element.component.html',
  styleUrls: ['./add-element.component.css']
})
export class AddElementComponent implements OnInit {

  element: Element = {
    title: '',
    description: '',
    published: false
  };
submitted = false;

  constructor( private elementService: ElementService ) { }

  ngOnInit(): void {
  }

  saveElement(): void {
    const data = {
      title: this.element.title,
      description: this.element.description
    };

    this.elementService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newElement(): void {
    this.submitted = false;
    this.element = {
      title: '',
      description: '',
      published: false
    };
  }

}
