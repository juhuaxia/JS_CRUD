<template>
  <div>
      <button v-on:click="loadMoreData">load more data</button>
      <button v-on:click="addData">add</button>
      <button v-on:click="deleteData">delete</button>
      <button v-on:click="updateData">update</button>
      <button v-on:click="searchData">search</button>
      <List :pageData='currentPageData'/>
      <Modal :okCallback='modalCallback'/>
  </div>
</template>

<script>
import List from './components/list'
import Modal from './components/modal'
import {getTotalPageData, getCurrentPageData, changeModalState, changePageData} from './controller'
import {mapState} from 'vuex'

export default {
  name: 'App',
  data () {
    return {
      pageSize: 10,
      pageIndex: 0,
      modalCallback: this.CRUDCallback,
      action: null
    }
  },
  created () {
    this.getPageData()
  },
  computed: {
    ...mapState(
      [ 'currentPageData', 'selectedId' ]
    )
  },
  methods: {
    async getPageData () {
      await getTotalPageData.call(this)
      getCurrentPageData.call(this)
    },
    loadMoreData () {
      let params = {
        pageIndex: ++this.pageIndex,
        pageSize: this.pageSize
      }
      getCurrentPageData.call(this, params)
    },
    addData () {
      changeModalState.call(this, true)
      this.action = 'add'
    },
    deleteData () {
      this.action = 'delete'
      let params = {
          selectedId: this.selectedId,
          pageData: this.currentPageData
      }
      let res = {
          action: this.action,
          params
        }
      changePageData.call(this, res)
    },
    updateData () {
      changeModalState.call(this, true)
      this.action = 'update'
    },
    searchData () {
      changeModalState.call(this, true)
      this.action = 'search'
    },
    CRUDCallback (val) {
        let action = this.action,
            params = {}
        if (action === 'add') {
            params = {
                val,
                pageData: this.currentPageData
            }
        } else if (action === 'update') {
            params = {
                selectedId: this.selectedId,
                val,
                pageData: this.currentPageData
            }
        } else if (action === 'search') {
            params = {
                val
            }
            this.resetPageIndex()
        }
        let res = {
          action,
          params
        }
        changePageData.call(this, res)
    },
    resetPageIndex () {
      this.pageIndex = -1
    }
  },
  components: {
    List,
    Modal
  }
}
</script>

<style>
html,body{
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
}
span{
    font-size: 16px;
    color:#333;
}
img{
    vertical-align: middle;
}
.show{
  display: block !important;
}
.hide{
  display: none !important;
}
.p20{
  padding: 20px;
}
</style>
