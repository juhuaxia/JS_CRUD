<template>
    <div :class="['modal',{'show':showModal} ]">
        <div class="modal-inner">
            <input type='text' v-model="textVal"/>
            <button v-on:click='clickHandle'>ok</button>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import {changeModalState} from '../controller'

export default {
    name: 'modal',
    data () {
        return {
            textVal:''
        }
    },
    props: [ 'okCallback' ],
    computed: {
        ...mapState([ 'showModal' ])
    },
    methods: {
        clickHandle () {
            this.okCallback(this.textVal)
            changeModalState.call(this, false)
            this.textVal = ''
        }
    }
}
</script>

<style scoped>
.modal{
    background: rgba(0,0,0,.3);
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    display: none;
}
.modal-inner{
    background: #fff;
    border: 1px solid #e1e1e1;
    padding: 10px;
    position: absolute;
    top:100px;
    width: 100%;
    text-align: center;
}
</style>

