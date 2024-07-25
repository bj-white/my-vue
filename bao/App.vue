<template>
  <div>sss</div>
</template>

<script>
import docType from './assets/schema1.json'
import data from './assets/data.json'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      docType: {}
    }
  },
  created () {
    this.init()
  },
  methods: {
    ...mapActions(['bootstrap']),
    async init () {
      await this.bootstrap()
    }
  }
}
</script>
