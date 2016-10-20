/**
 * @flow
 */

import _ from 'lodash'
import type { Action } from './action'

export type Route = {
  page: string,
}

export default function (initialRouts: Array<Route> = [], group: string = 'default') {
  return (routes: Array<Route> = initialRouts, action: Action): Array<Route> => {
    if (action.group !== group) {
      return routes
    }
    if (action.type === 'ROUTY_PUSH_ROUTE') {
      return [...routes, action.route]
    }
    if (action.type === 'ROUTY_POP_ROUTE') {
      return routes.slice(0, routes.length - 1)
    }
    if (action.type === 'ROUTY_POP_TO_ROUTE') {
      const index = _.findIndex(routes, _.curry(_.isEqual)(action.route))
      return routes.slice(0, index + 1)
    }
    if (action.type === 'ROUTY_RESET_ROUTES_TO') {
      return action.routes
    }
    return routes
  }
}