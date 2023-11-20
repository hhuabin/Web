<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script lang="ts">
// 使用方法
import { defineComponent, computed, onMounted, watch,ref,getCurrentInstance,reactive,nextTick ,toRefs} from 'vue';
// import {
//   useStore,
//   mapState,
//   // mapMutations,
//   // mapActions,
//   // mapGetters
// } from 'vuex'
// import {useRoute,useRouter,useLink,UseLinkOptions} from "vue-router"
// import { useI18n } from "vue-i18n";
// import {data} from "@/utils/TypeState"
// import HelloWorld from '@/components/HelloWorld.vue'
// export default defineComponent({
//   components:{
//     HelloWorld
//   },
//   setup(props, context){
//     console.log('context',context);
//     const age=ref<Number>(10)
//     const count=ref(50)
//     const name=ref<any>(0)
//     const store=useStore()
//     const {proxy}:any=getCurrentInstance()
//     const number=ref<string|Number>(store.state.app.age)
//     const Route=useRoute()
//     const RouteLink=useLink
//     const data = reactive<data>({
//       tableData: [
//         {
//           time: '姓名1'
//         }
//       ],
//       language:[{
//         name:'中文',
//         value:'zh'
//       },
//       {
//         name:'英文',
//         value:'en'
//       }],
//       seleLanguage:'zh'
//     })
//     const { t } = useI18n();
//     const languageD=()=>{
//       proxy.$i18n.locale=data.seleLanguage
//     }
//     console.log(store.state.app.allMenuList instanceof  Array);
//     console.log(proxy);
//   // 监听指定基础类型数据
//     const addNum=()=>{
//       //  name.value=Number(name.value) +1
//       name.value++
//     }
//     watch(name, (now, prev) => {
//           console.log(now, prev, 'count')
//     })
//     // 监听reactive创建的响应式变量,可以直接监听对象，必须使用内联函数
//     watch(() => data.tableData, (now, prev) => {
//       console.log(now, prev, 'tableData')
//     })
//     const myModalShow = ref(false)
//     const myModealHide=(val:any)=>{
//       myModalShow.value=false
//       console.log(val);
//     }
//     const myModalBlock =()=>{
//       myModalShow.value=true
//     }
//     const toDelit=():void=>{
//       proxy.$router.push("/userAdminDetils")
//     }
//     return {
//       age,
//       number,
//       proxy,
//       store,
//       name,
//       addNum,
//       ...toRefs(data) ,
//       t,
//       languageD,
//       myModealHide,
//       myModalBlock,
//       myModalShow,
//       toDelit
//     }
//   },
//   created () {
//     console.log(this.$route);
//     console.log(this.store.state.app.age);
//     // console.log(this.$store);//报错
//   }
// })
</script>
