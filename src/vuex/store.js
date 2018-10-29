// import Vue from 'vue'
// import Vuex from 'vuex'
// // import * as actions from './actions.js'
// // import * as getters from './getters.js'
// Vue.use(Vuex)

// const state ={
//    count : 10
// }
// const mutations={
// 	add(context){
//         context.count++
//     },
//     decrease(context){
//         context.count--
//     }
 
// }
// const getters={
// 	 count(context){
//         return context.count
//     },
//     getOdd(context) {
//         return context.count % 2 === 0 ? '偶数' : '奇数'
//     }
// }
// const actions={
  
//   add:({commit})=>commit('add'),
//   jian:({commit})=>commit('jian'),

// }
// const modules={

// }
// export default new Vuex.Store({
//   state,
//   mutations,
//   getters,
//   actions,
//   modules
// })
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
// 这里定义初始值
const state = {
        count:1
    }
 const mutations={
        add(state){
            state.count+=1;
        },
        reduce(state){
            state.count-=1;
        }
    }
const getters={  // getters
            countAdd: function (state) {
                 return state.count++
            }
       }
export default new Vuex.Store({
    state,
    mutations,
    // actions,
    getters
})

