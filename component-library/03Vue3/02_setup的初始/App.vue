<template>
  <div>哈哈,我又变帅了</div>
  <!-- <h1>{{number}}</h1> -->
</template>

<script lang="ts">
/* defineComponent函数，只是对setup函数进行封装，返回options的对象；
defineComponent最重要的是：在TypeScript下，给予了组件 正确的参数类型推断 。
defineComponent可以给组件的setup方法准确的参数类型定义.
defineComponent 可以接受显式的自定义 props 接口或从属性验证对象中自动推断
defineComponent 可以正确适配无 props、数组 props 等形式
引入 defineComponent() 以正确推断 setup() 组件的参数类型
defineComponent函数,目的是定义一个组件,内部可以传入一个配置对象 */
import { defineComponent } from 'vue'

// 暴露出去一个定义好的组件
export default defineComponent({
  // 当前组件的名字是App
  name: 'App',
  // 测试代码 setup是组合API中第一个要使用的函数
  // setup(){
  //   const number =10
  //   return {
  //     number
  //   }
  // }
})
</script>
