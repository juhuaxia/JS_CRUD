<template>
    <div v-on:click="select" :class="['list-item', 'p20' ,{'sel-item':item.id==selectedId}]">
        <span>{{item.id}}. {{item.title}}</span>
        <img src="http://via.placeholder.com/80x50"/>
    </div>
</template>

<script>
import {sendSelectedId} from '../controller'
export default {
  name: 'Item',
  props: [ 'item', 'selectedId' ],
  methods: {
      select () {
          sendSelectedId.call(this, this.item.id)
      }
  }
}
</script>

<style scoped>
.list-item{
    border-bottom: 1px solid #e1e1e1;
}
.sel-item{
    background: #efaa4f;
}
</style>
