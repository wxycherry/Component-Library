<script setup lang="ts">
import { ref,onMounted ,h} from 'vue';
import type {Options} from '@popperjs/core'
import Button from './components/Button/Button.vue';
import Collapse from './components/Collapse/Collapse.vue';
import Item from './components/Collapse/CollapseItem.vue';
import Icon from './components/Icon/Icon.vue';
import Tooltip from './components/Tooltip/Tooltip.vue';
import Dropdown from './components/Dropdown/Dropdown.vue';
import Message from './components/Message/Message.vue';
import {createMessage} from './components/Message/method'
import type {MenuOption} from './components/Dropdown/types';
import type {ButtonInstance } from './components/Button/types';
import type { TooltipInstance } from './components/Tooltip/types';
const openedValue = ref(['a'])
const buttonRef = ref<ButtonInstance | null>(null)
const tooltipRef = ref<TooltipInstance  | null>(null)
const trigger = ref<any>('hover')
// const options:Partial<Options> = {
//   placement:'right-end',
//   strategy:'fixed'
// }
const options:MenuOption[]=[
  { key: 1, label: h('b','this is bold')},
  { key: 2, label: 'item2', disabled: true },
  { key: 3, label: 'item3', divided: true },
  { key: 4, label: 'item4' }
]
const open = ()=>{
  tooltipRef.value?.show()
}
const close = ()=>{
  tooltipRef.value?.hide()
}
onMounted(()=>{
  if(buttonRef.value){
    console.log('buttonRef',buttonRef.value.ref)
  }
  const instance = createMessage({message:'helloworld',duration:0,showClose:true})
  createMessage({message:'helloworld again',duration:0,showClose:true,type:'warning'})
  createMessage({message:'helloworld three',duration:0,showClose:true})
  setTimeout(()=>{
    instance.destory()
  },3000)
})
</script>

<template>

  <header>
    <Dropdown placement="right" :trigger="trigger" :menu-options="options">
      <img src="./assets/logo.svg" alt="" width="125" height="125" >
      <template #content>
        <h1>hello tooltip</h1>
      </template>
    </Dropdown>

  </header>
  <div>
    <Icon icon="arrow-up" size="2xl" type="danger"/>
    <Button ref="buttonRef" @click="open">Test Button</Button>
    <Button plain @click="close">Plain Button</Button>
    <Button round>Round Button</Button>
    <Button circle>HS</Button>
    <Button disabled>Disabled Button</Button><br /><br />
    <Button type="primary">Primary</Button>
    <Button type="success">Success</Button>
    <Button type="info">Info</Button>
    <Button type="warning">Warning</Button>
    <Button type="danger">Danger</Button><br/><br/>
    <Button type="primary" plain>Primary</Button>
    <Button type="success" plain>Success</Button>
    <Button type="info" plain>Info</Button>
    <Button type="warning" plain>Warning</Button>
    <Button type="danger" plain>Danger</Button><br/><br/>
    <Button size="large">size</Button>
    <Button size="small" >small</Button><br/><br/>
    <Button size="large" loading>Loading</Button>
    <Button size="large" icon="arrow-up">Icon</Button><br/>
  </div>
  <h1>helloworld</h1>
  <h2>helloworld</h2>
  <h3>helloworld</h3>
  <a href="#">the link</a>
  <hr/>

  <Collapse v-model="openedValue" accordion>
    <Item name="a">
      <template #title>
        <h1>title1</h1>
      </template>
      <h1>headline title</h1>
      <div>this is content a aaa</div>
    </Item>
    <Item name="b" title="title2">
      <div>this is bbbbb test</div>
    </Item>
    <Item name="c" title="title3" disabled>
      <div>this is cccc test</div>
    </Item>
  </Collapse>
  {{ openedValue }}
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
