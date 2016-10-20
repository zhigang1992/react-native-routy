/**
 * @flow
 */

import type { Route } from './reducer'

export type Action = { type: 'ROUTY_PUSH_ROUTE', route: Route, group: string }
  | { type: 'ROUTY_POP_ROUTE', group: string }
  | { type: 'ROUTY_POP_TO_ROUTE', route: Route, group: string }
  | { type: 'ROUTY_RESET_ROUTES_TO', routes: Array<Route>, group: string}

export function pushRoute(route: Route, group: string = 'default'):Action {
  return {
    type: 'ROUTY_PUSH_ROUTE',
    group,
    route,
  }
}

export function pop(group: string = 'default'): Action {
  return {
    type: 'ROUTY_POP_ROUTE',
    group,
  }
}

export function popTo(route: Route, group: string = 'default'): Action {
  return {
    type: 'ROUTY_POP_TO_ROUTE',
    route,
    group,
  }
}

export function resetTo(routes:Array<Route>, group: string = 'default'):Action {
  return {
    type: 'ROUTY_RESET_ROUTES_TO',
    routes,
    group,
  }
}
