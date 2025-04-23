import { io } from 'socket.io-client';
import { boot } from 'quasar/wrappers';

const socket = io('http://localhost:3000'); // your backend URL

export default boot(({ app }) => {
  app.config.globalProperties.$socket = socket;
});

export { socket };
