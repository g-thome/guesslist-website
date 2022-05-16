import 'normalize.css';
import './index.css';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { MyLists } from './MyLists';

const app = document.getElementById('app');
ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/mylists" element={<MyLists />} />
            <Route path='*' element={
                <main>
                    <h1>404</h1>
                </main>
            }/>
        </Routes>
    </BrowserRouter>,
    app);