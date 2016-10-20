/**
 * @flow
 */

import _ from 'lodash'
import { Navigator } from 'react-native'
import type { Route } from './reducer'

export default function (oldRoutes: Array<Route>, newRoutes: Array<Route>, navigator: Navigator) {
  if (_.isEqual(oldRoutes, newRoutes)) {
    return
  }
  const baseLength = Math.min(oldRoutes.length, newRoutes.length)
  const oldBase = _.slice(oldRoutes, 0, baseLength)
  const newBase = _.slice(newRoutes, 0, baseLength)
  if (!_.isEqual(oldBase, newBase)) {
    navigator.immediatelyResetRouteStack(newRoutes)
    return
  }
  if (oldRoutes.length > newRoutes.length) {
    navigator.popToRoute(_.last(newRoutes))
    return
  }
  _.slice(newRoutes, baseLength).forEach(navigator.push)
}
