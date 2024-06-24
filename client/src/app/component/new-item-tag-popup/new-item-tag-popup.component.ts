import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-new-item-tag-popup',
  standalone: true,
  imports: [],
  templateUrl: './new-item-tag-popup.component.html',
  styleUrl: './new-item-tag-popup.component.scss'
})
export class NewItemTagPopupComponent {
  label: string = "";

  @Output() finishCreation = new EventEmitter<string>();
  @Output() abortCreation = new EventEmitter<void>();  

  onKey(event: any)
  {
    this.label = event.target.value;
  }

  confirmNewTag()
  {
    this.finishCreation.emit(this.label);
  }

  abort()
  {
    this.abortCreation.emit();
  }
}
