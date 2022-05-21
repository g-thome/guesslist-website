import 'normalize.css';
import './index.css';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { MyLists } from './Pages/MyLists';
import { CreateList } from './Pages/CreateList/CreateList';

const app = document.getElementById('app');
ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/mylists" element={<MyLists />} />
            <Route path="/create-list" element={<CreateList />} />
            <Route path='*' element={
                <main>
                    <h1>404</h1>
                </main>
            }/>
        </Routes>
    </BrowserRouter>,
    app);