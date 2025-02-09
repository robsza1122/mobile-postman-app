import ReactDOM from 'react-dom/client';
import { App } from './App';
import { BrowserRouter } from 'react-router';
import { PostGlobalProvider } from './PostGlobalProvider';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <PostGlobalProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </PostGlobalProvider>

);
