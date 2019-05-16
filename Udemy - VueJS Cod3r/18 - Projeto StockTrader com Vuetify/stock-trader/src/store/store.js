import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'

import stocks from '../store/modules/stocks'
import portfolio from '../store/modules/portfolio'

Vue.use(Vuex)

export default new Vuex.Store({
    actions,
    modules: {
        stocks,
        portfolio
    }
})