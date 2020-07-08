import {Component} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragStart, CdkDragEnd, CdkDragEnter} from '@angular/cdk/drag-drop';
import { start } from 'repl';

/**
 * @title Drag&Drop connected sorting
 */
@Component({
  selector: 'app-Dragable',
  templateUrl: './Dragable.component.html',
  styleUrls: ['./Dragable.component.css']
})
export class DragableComponent {
  todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }

    console.log('Final previous containner', event.previousContainer.id);
    console.log('Final Containner Previous Index', event.previousIndex);
    console.log('Final current containner', event.container.id);
    console.log('Final Containner current Index', event.currentIndex);
  }

  onDragStart(event: CdkDragStart) {
    debugger;
    console.log('Stating Containner Index', event.source.dropContainer.id);
  }

  onAllowDrop(event: CdkDragEnter) {
    console.log('OnBlur Containner', event.container.id);
    console.log('OnBlur Containner Index', event.currentIndex);
  }

}
