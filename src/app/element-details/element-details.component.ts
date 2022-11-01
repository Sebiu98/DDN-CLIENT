import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Element } from 'src/app/models/element.model';
import { ElementService } from 'src/app/_services/element.service';

@Component({
  selector: 'app-element-details',
  templateUrl: './element-details.component.html',
  styleUrls: ['./element-details.component.css']
})
export class ElementDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentElement: Element = {
    title: '',
    description: '',
    published: false
  };

  message = '';

  constructor(
    private elementService: ElementService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getElement(this.route.snapshot.params['id']);
    }
  }

  getElement(id: string): void {
    this.elementService.get(id)
      .subscribe(
        data => {
          this.currentElement = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updatePublished(status: boolean): void {
    const data = {
      title: this.currentElement.title,
      description: this.currentElement.description,
      published: status
    };

    this.message = '';

    this.elementService.update(this.currentElement.id, data)
      .subscribe(
        response => {
          this.currentElement.published = status;
          this.message = 'The status was updated successfully!';
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  updateElement(): void {
    this.elementService.update(this.currentElement.id, this.currentElement)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The element was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deleteElement(): void {
    this.elementService.delete(this.currentElement.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/elements']);
        },
        error => {
          console.log(error);
        });
  }

}
