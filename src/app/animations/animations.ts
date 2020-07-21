import { trigger, state, transition, style, animate, animation, useAnimation, stagger, query } from '@angular/animations';

export let fadeInAnimation = animation([
      style({ opacity:0 }),
      animate('{{duration}} {{ easing }}')
], {params: {
    duration: '0.5s',
    easing: 'ease-out'
}}
)

export let fade = trigger('fade', [
    transition(':leave,:enter',[
        useAnimation(fadeInAnimation)
    ])
  ])

export let slide = trigger('slide',[
    transition(':enter',[
        style({ transform: 'translateY(-100px)' }),
        animate(200)
    ]),
    transition(':leave', [
        animate(200,style({ transform: 'translateX(-100%)' }),)
    ])
])

export let slideAdd = trigger('slideAdd',[
    transition(':enter',[
                style({ transform: 'translateY(-200px)' }),
                animate(200)
    ]),
    transition(':leave', [
        animate(200, style({ transform: 'translateX(-100%)'}))
    ])
])

