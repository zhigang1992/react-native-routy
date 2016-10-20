React Native Routy

--------



**Using Navigator with Redux, and keep everything in store.**



### Install



```bash
npm install --save react-native-routy
```



### Setup



#### Reducer

```javascript
import {reducer as routyReducer} from 'routy'

export default combineReducers({
  //... other routes here
  routes: routyReducer([{page: 'Home'}]) // `[{page: 'Home'}]` is your initial route
})

```

> by default, you should mount this reducer in `routes` of your root reducer, but you customize this too.


#### Component

```javascript
import {Route} from 'routy'

<Route
  routyMountPoint="routes" // this is optional
  renderScene={ (route) => {
    //you're in charge of creating your pages from route
    return createElement(Pages[route.page], route)
  }}
/>
```

#### Actions

```javascript
import {actions as routyAction} from 'routy'
...
export default connect(null, (dispatch) => ({
  pushToEvent: () => dispatch(routyAction.pushRoute({page: 'Events'})),
  pop: () => dispatch(routyAction.pop())
}))
```



### Multiple Routes

This component also support having multiple router instances, here is how:

#### Reducer

```javascript
import {reducer as routyReducer} from 'routy'

export default combineReducers({
  //... other routes here
  routes: combineReducers({
    home: routyReducer([{page: 'Home'}], 'home'), // passing extra `home` at the end for id, should be the same as the key for this reducer.
    settings: routyReducer([{page: 'Settings'}], 'settings'),
    main: routyReducer([{page: 'Main'}], 'settings'),
  })
})
```

#### Component

```javascript
import {Route} from 'routy'

<Tab>
  <TabItem>
  	<Route
  	  routyGroup="home" // same key in reducer
  	  renderScene={ (route) => {
        //you're in charge of creating your pages from route
  	    return createElement(Pages[route.page], route) 
  	  }}
  	/>
  </TabItem>
  <TabItem>
  	<Route
  	  routyGroup="settings"
  	  renderScene={ (route) => {
  	    return createElement(Pages[route.page], route)
  	  }}
  	/>
  </TabItem>
  <TabItem>
  	<Route
  	  routyGroup="home" // same key in reducer
  	  renderScene={ (route) => {
  	    return createElement(Pages[route.page], route)
  	  }}
  	/>
  </TabItem>
</Tab>
```

#### Actions

```javascript
import {actions as routyAction} from 'routy'
...
export default connect(null, (dispatch) => ({
  pushToEvent: () => dispatch(routyAction.pushRoute({page: 'Events'}, 'home')),
  pop: () => dispatch(routyAction.pop('home')) // Extra home at the end, I know this is not sexy. Fill free to create issues or PRs if have a better idea.
}))
```




