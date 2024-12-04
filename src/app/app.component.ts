import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  // Variables
  title = 'Sorting Lists By Merge Sort';
  inputString: string = '';
  inputList: number[] = [];
  sortedList:number[] = [];

  // constructor:
  constructor() {};

  // Class methods
  onSubmit() {


  }
}
