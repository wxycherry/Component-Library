<script setup>
defineOptions({
  name:'HsBasic'
})
import Button from '@/components/Button/Button.vue'
</script>
<template>
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
<Button size="large" icon="arrow-up">Icon</Button>
</template>