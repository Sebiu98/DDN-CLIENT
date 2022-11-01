import { Component, OnInit } from '@angular/core';
import { Element } from 'src/app/models/element.model';
import { ElementService } from 'src/app/_services/element.service';

@Component({
  selector: 'app-elements-list',
  templateUrl: './elements-list.component.html',
  styleUrls: ['./elements-list.component.css'],
})
export class ElementsListComponent implements OnInit {
  elements?: Element[];
  currentElement: Element = {};
  currentIndex = -1;
  title = '';

  constructor(private elementService: ElementService) {}

  ngOnInit(): void {
    this.retrieveElements();
  }

  retrieveElements(): void {
    this.elementService.getAll().subscribe(
      (data) => {
        this.elements = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  refreshList(): void {
    this.retrieveElements();
    this.currentElement = {};
    this.currentIndex = -1;
  }

  setActiveElement(element: Element, index: number): void {
    this.currentElement = element;
    this.currentIndex = index;
  }

  removeAllElements(): void {
    this.elementService.deleteAll().subscribe(
      (response) => {
        console.log(response);
        this.retrieveElements();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  searchTitle(): void {
    this.currentElement = {};
    this.currentIndex = -1;

    this.elementService.findByTitle(this.title).subscribe(
      (data) => {
        this.elements = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
