import { trigger, style, state, animate, transition } from '@angular/animations';

export let slide = trigger('slide',[
    transition(':enter',[
        style({transform: 'translateX(-100px)'}),
        animate('500ms ease-out')
    ]),
    transition(':leave',[
        animate('500ms ease-in',style({transform: 'translateX(-100%)'}))
    ])
])