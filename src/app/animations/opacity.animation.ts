// import {
//   animate,
//   state,
//   style,
//   transition,
//   trigger,
// } from '@angular/animations';

// // export const OpacityAnimation = trigger('conditionalTrigger', [
// export const OpacityAnimation =
//   // state('show', style({})),
//   // state('hide', style({})),

//   // transition('hide => show', [
//   //   style({
//   //     opacity: 0,
//   //     transform: 'scale(1.3)'
//   //   }),
//   //   animate(500, style({ opacity: 1 })),
//   // ]),
//   // transition('show => hide', [animate('0.3s ease-in', style({ opacity: 0 }))]),
//   // transition('void => show', [animate('0.3s ease-out', style({ opacity: 0 }))]),

//   trigger('conditionalTrigger', [
//     state('show', style({
//       opacity: 1,
//       transform: 'scale(1)'
//     })),
//     state('hide', style({
//       opacity: 0,
//       transform: 'scale(1.3)'
//     })),
//     transition('hide => show', [
//       animate('500ms ease-in')
//     ]),
//     transition('show => hide', [
//       animate('500ms ease-out')
//     ])
//   ])
