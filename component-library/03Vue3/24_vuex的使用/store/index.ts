import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

export interface State {
  count: number
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    count: 0
  },
  getters: {
    getcount(state) {
      return state.count + 1;
    }
  },
  actions: {
    changeCount(context) {
      console.log('--------');
      
      context.commit('changeCount');
    }
  },
  mutations: {
    changeCount(state) {
      console.log('aaaaaaaaaa');
      state.count = 100;
      console.log('完成了');
      
    }
  }
})

// 定义自己的 `useStore` 组合式函数
export function useStore () {
  return baseUseStore(key)
}
