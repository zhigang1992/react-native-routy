/**
 * @flow
 */

import React, { Component, Element } from 'react'
import { Navigator, BackAndroid } from 'react-native'
import { connect } from 'react-redux'
import _ from 'lodash'
import update from './diff'
import type { Route } from './reducer'
import {resetTo, pop} from './action';

type PropType = {
  routes: Array<Route>,
  resetRoutes: (routes:Array<Route>)=>any,
  pop: ()=>any,
  shouldPop?: (routes: Array<Route>) => boolean,
  renderScene: (route: Route) => Element<*>,
  configureScene?: (route: Route) => Navigator.SceneConfigs
}

class Router extends Component {

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.onBackPressed)
  }

  componentWillReceiveProps(nextProps: PropType) {
    const oldRoutes = this.props.routes
    const newRoutes = nextProps.routes
    update(oldRoutes, newRoutes, this.navigator)
  }

  onBackPressed = () => {
    if (this.props.shouldPop && this.props.shouldPop(this.props.routes)) {
      this.props.pop()
      return true
    }
    return false
  }

  componentWillUnMount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.onBackPressed)
  }

  props: PropType
  navigator: Navigator

  syncRoutesToRedux() {
    if (this.navigator === undefined) {
      return
    }
    const currentRoutes = this.navigator.getCurrentRoutes()
    if (_.isEqual(currentRoutes, this.props.routes)) {
      return
    }
    this.props.resetRoutes(currentRoutes)
  }

  render() {
    return (
      <Navigator
        ref={(navigator) => { this.navigator = navigator }}
        style={{ flex: 1 }}
        initialRouteStack={this.props.routes}
        renderScene={this.props.renderScene}
        onDidFocus={() => { this.syncRoutesToRedux() }}
        configureScene={this.props.configureScene}
      />
    )
  }
}

const mapProps = (store, props) => {
  const mountPoint = props.routyMountPoint || 'routes'
  const routesMap = store[mountPoint]
  const routes = props.routyGroup != null ? routesMap[props.routyGroup] : routesMap
  if (routes == null) {
    console.error(`No routes found in ${mountPoint}`)
  }
  return { routes }
}

const mapAction = (dispatch, props) => {
  return {
    pop: () => dispatch(pop(props.routyGroup)),
    resetRoutes: (routes: Array<Route>) => dispatch(resetTo(routes, props.routyGroup))
  }
}

export default connect(mapProps, mapAction)(Router)
