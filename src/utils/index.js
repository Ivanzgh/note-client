import axios from 'axios'

//在生产环境的时候，会被设置成production；在开发环境的时候，会被设置成development
const env = process.env.NODE_ENV;

// let baseURL = env === 'development'? '/api' : '/';
//配置新建一个 axios 实例
const instance = axios.create({
  baseURL:'/api',
  timeout : 15000
});

const xhr = {
  get(url,data,config){
    return new Promise((resolve ,reject) => {
      instance.get(url,{params:data},config).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  fetch(url,data,config,methods){
    return new Promise((resolve ,reject) => {
      instance[methods](url,data,config).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  post(url,data,config) {
    return this.fetch(url,data,config,'post')
  },
  patch(url,data,config) {
    return this.fetch(url,data,config,'patch')
  }
};

export default xhr;



