// export type FadeState = 'visible' | 'hidden';

//     @Component({
//       selector: 'app-fade',
//       templateUrl: './fade.component.html',
//       styleUrls: ['./fade.component.scss'],
//       animations: [
//         trigger('state', [
//           state(
//             'visible',
//             style({
//               opacity: '1'
//             })
//           ),
//           state(
//             'hidden',
//             style({
//               opacity: '0'
//             })
//           ),
//           transition('* => visible', [animate('500ms ease-out')]),
//           transition('visible => hidden', [animate('500ms ease-out')])
//         ])
//       ],
//       changeDetection: ChangeDetectionStrategy.OnPush
//     })
