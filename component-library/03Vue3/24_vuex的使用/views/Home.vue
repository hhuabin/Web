<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    vuex: {{num}}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useStore } from '../store'
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld,
  },
  mounted() {
    this.$store.dispatch('changeCount')
    console.log(this.$store.state.count);
  },
  setup() {
    const store = useStore();
    const num = ref(store.state.count); // 类型为 number

    onMounted(() => {
      const getCout = store.getters.getcount;
      // store.dispatch('changeCount');
      console.log(getCout, num);
    })
     return {
       num
     }
  },
  
});
</script>
