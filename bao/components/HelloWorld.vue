<template>
  <div>
    <div v-for="(item, key) in dataProvider.model.ejxb" :key="key">
      <input type="text" v-model="item.dj">
      <input type="text" v-model="item.sl">
      <input type="text" v-model="item.zj">
    </div>
    <button @click="handleClick">switch me</button>
  </div>
</template>

<script>
export default {
  inject: {
    dataProvider: {
      default: {
        model: null
      }
    },
    dataviewPropHook: {
      default: {}
    },
    conextProvider: {
      default: {}
    }
  },
  created () {
    console.log(this.dataProvider)
    console.log(this.conextProvider, 'conextProvider=================')
  },
  methods: {
    handleClick () {
      for (let i = 0; i < this.dataProvider.model.ejxb.length; i++) {
        this.dataProvider.model.ejxb[i].$options.readonly = false
      }
    }
  }
}
</script>
