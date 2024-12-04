import { NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Component, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // Variables
  title = 'Sorting Lists By Merge Sort';
  inputString: string = '';
  breakingSteps: string[] = [];
  mergingSteps: string[] = [];
  sortedList:number[] = [];

  // error messages
  private static INVALID_INPUT_MESSAGE = 'Please enter a valid list of numbers separated by commas & a space ", "';

  // constructor:
  constructor(private cdr: ChangeDetectorRef) {};

  // Class methods
  onSubmit() {
    // if string isn't of valid format or is empty, alert the user.
    if(!this.inputString){
      alert(AppComponent.INVALID_INPUT_MESSAGE);
      return;
    }

    let inputList = this.parseInput(this.inputString);
    // if string isn't of valid format or is empty, alert the user.
    if(!this.inputString.length){
      alert(AppComponent.INVALID_INPUT_MESSAGE);
      return;
    }

    const list = this.sanitizeList(inputList)
    console.log("parsed list: ", list);

    this.resetState();

    // Calculate the sorted list
    this.sortedList = this.mergeSort(list);
  };

  // Parsing Input
  parseInput(input: string): number[] {
    try{
      return input
      .split(',')
      .map((item) => parseInt(item.trim(), 10))
      .filter((num) => !isNaN(num));
    }
    catch(e){
      console.error('Error parsing input: ', e);
      return [];
    }
  }

  // Remove Duplicate Values
  sanitizeList(list: number[]): number[] {
    return Array.from(new Set(list));
  }

  // Reset State Defined
  resetState(){
    this.breakingSteps = [];
    this.mergingSteps = [];
    this.sortedList = [];
  }

  // MERGE_SORT ALGORITHM (Recursive Approach)
  mergeSort(list: number[]): number[] {
    if(list.length <= 1) return list;

    // Variables Local
    let size: number = list.length;

    // determine mid, left & right & call recursively
    const mid: number = Math.floor(size/2);
    let left: number[] = this.mergeSort(list.slice(0,mid));
    let right: number[] = this.mergeSort(list.slice(mid));
    const merged: number[] = this.merge(left, right);

    this.breakingSteps.push(`Breaking: ${list.join(', ')}`);
    this.mergingSteps.push(`Merging: ${merged.join(', ')}`);

    // return merge
    return merged;
  }

  // Merge function of merge-sort algo
  merge(left: number[], right: number[]): number[]{
    let sortedList: number[] = [];
    let i = 0, j=0;

    while(i < left.length && j < right.length){
      if(left[i] < right[j]){
        sortedList.push(left[i]);
        i++;
      } else {
        sortedList.push(right[j]);
        j++;
      }
    }

    const result = [...sortedList,...left.slice(i),...right.slice(j)];

    return result;
  }
}
