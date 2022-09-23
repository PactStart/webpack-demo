import '../css/main.css';
import '@/css/main.less';
import $ from 'jquery';

// eslint-disable-next-line
console.log('hello webpack');

const sayHello = () => {
  // eslint-disable-next-line
  alert('我是箭头函数');
};

// eslint-disable-next-line
window.sayHello = sayHello;

// sayHello();

// new Promise((resolve) => {
//   resolve();
//   // eslint-disable-next-line
//   console.log('promise执行了');
// });

// // eslint-disable-next-line
// console.log(testPromise());

// eslint-disable-next-line
console.log(API_BASE_URL);

$('body').append('<h1>引用了jquery</h1>');

// eslint-disable-next-line
document.getElementById('test_btn').onclick = () => {
  // eslint-disable-next-line
  import(/* webpackChunkName:'dynamic', webpackPrefetchz:true  */'./dynamic').then(({exec} )=> {
    exec();
  });
};

// function treeShaking() {
//   return 'tree shaking';
//   // eslint-disable-next-line
//   console.log('tree shaking');
// }
