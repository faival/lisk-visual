import { combineReducers } from 'redux'

import counter from './counter'
import peers from './peers'

export default combineReducers({
	counter,
	peers
})