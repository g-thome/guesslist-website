import 'normalize.css';
import { createGlobalStyle } from 'styled-components';
import './index.css';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { MyLists } from './Pages/MyLists';
import { CreateList } from './Pages/CreateList/CreateList';
import { PreviewPage } from './Pages/Preview';

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }
`;
const app = document.getElementById('app');
//TODO: ReactDom.render is deprecated
ReactDOM.render(
    <>
        <GlobalStyle />
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/mylists" element={<MyLists />} />
                <Route path="/create-list" element={<CreateList />} />
                <Route path="/preview" element={<PreviewPage />} />
                <Route path='*' element={
                    <main>
                        <h1>404</h1>
                    </main>
                }/>
            </Routes>
        </BrowserRouter>
        </>,
    app);
