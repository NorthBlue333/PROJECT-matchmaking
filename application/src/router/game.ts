import { RouteConfig } from 'vue-router'

export default [
  {
    path: '/game',
    component: () => import('@/views/Game/Game.vue'),
    children: [
      {
        path: '',
        name: 'game.index',
        component: () => import('@/views/Game/Index.vue'),
      },
      {
        path: 'waiting',
        name: 'game.waiting',
        component: () => import('@/views/Game/Waiting.vue'),
      },
      {
        path: 'play/:id',
        name: 'game.play',
        component: () => import('@/views/Game/Play.vue'),
        props: route => ({
          id: parseInt(route.params.id),
        }),
      },
    ],
  },
] as Array<RouteConfig>
