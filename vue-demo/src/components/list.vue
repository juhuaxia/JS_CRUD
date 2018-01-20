<template>
  <div class="list">
    <Item :selectedId='selectedId' :key ="index" v-for="(item, index) in pageData" :item="item"/>
  </div>
</template>

<script>
import Item from './item'
import {mapState} from 'vuex'

export default {
  name: 'List',
  components: {
    Item
  },
  computed: {
    ...mapState(
      [ 'selectedId' ]
    )
  },
  props: [ 'pageData' ]
}
</script>
