import { createApp } from 'vue';
import store from './store';
import router from './router';
import Antdv from 'ant-design-vue';
import ProLayout, { PageContainer } from '@ant-design-vue/pro-layout';

import App from './App.vue';

createApp(App)
  .use(store)
  .use(router)
  .use(Antdv)
  .use(ProLayout)
  .use(PageContainer)
  .mount('#app');

const defaultRequestHandler = ()=>{}

const requestHandler = (customHandler?:()=>void)=>{

  if(customHandler){
    axios.use(customHandler)
  }else{
    axios.use(defaultRequestHandler)
  }
}