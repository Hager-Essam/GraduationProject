import {
  animate,
  group,
  query,
  style,
  transition,
  trigger
} from '@angular/animations';

/* Example: FADE + SLIDE from right */
export const routeAnimations = trigger('routeAnimations', [

  transition('* <=> *', [

    /* set both pages to absolute so they can overlap */
    query(':enter, :leave', [
      style({ position: 'absolute', width: '100%', top: 0, left: 0 })
    ], { optional: true }),

    group([
      /* page we leave: slide left & fade out */
      query(':leave', [
        animate('300ms ease', style({ opacity: 0, transform: 'translateX(-50px)' }))
      ], { optional: true }),

      /* page we enter: start 50px right & transparent, then slide in */
      query(':enter', [
        style({ opacity: 0, transform: 'translateX(50px)' }),
        animate('300ms ease', style({ opacity: 1, transform: 'translateX(0)' }))
      ], { optional: true })
    ])
  ])
]);
