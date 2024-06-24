import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-new-button',
  standalone: true,
  imports: [],
  templateUrl: './new-button.component.html',
  styleUrl: './new-button.component.scss'
})
export class NewButtonComponent {
  @Output() createNewTag = new EventEmitter<void>();
  
  newTag()
  {
    this.createNewTag.emit();
  }
}
