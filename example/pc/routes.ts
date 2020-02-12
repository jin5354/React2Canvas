import HelloWorld from './helloWorld/HelloWorld';
import Home from './Home';

const routes = [
  {
      path: '/',
      exact: true,
      component: Home,
  },
  {
      path: '/hello-world',
      exact: true,
      component: HelloWorld,
  },
];

export default routes;
