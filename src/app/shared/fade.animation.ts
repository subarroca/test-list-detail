// ANGULAR
import {
  trigger,
  style,
  transition,
  animate
} from '@angular/core';



// EXTERNAL



// OWN




export const fade = trigger('fade', [
  transition(':enter', [
    style({
      opacity: 0
    }),
    animate('200ms ease-in', style({
      opacity: 1
    }))
  ]),
  transition(':leave', [
    animate('200ms ease-in', style({
      opacity: 0
    }))
  ]),
]);
