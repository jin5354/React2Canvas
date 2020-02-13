import HelloWorld from './helloWorld/HelloWorld';
import Home from './Home';
import BenchMark from './benchmark/BenchMark';

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
  {
      path: '/benchmark',
      exact: true,
      component: BenchMark,
  }
];

export default routes;
