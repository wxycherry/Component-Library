import {defineComponent,ref} from 'vue'
// const vnode = h('div',{id:'foo'},'hello')
export default defineComponent({
  name:'VNode',
  props:{
    msg:{
      type:String,
      required:true
    }
  },
  setup(props){
    const count = ref(1)
    //render function
    // return ()=>h('h1',props.msg+count.value)
    return ()=>(
      <div>
        <h1>{props.msg}</h1>
        <h1>{count.value}</h1>
      </div>
    )
  }
})