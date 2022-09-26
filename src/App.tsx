import 'normalize.css';
import { createGlobalStyle } from 'styled-components';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './Home';
import { MyLists } from './Pages/MyLists';
import { CreateList } from './Pages/CreateList/CreateList';
import { PreviewPage } from './Pages/Preview';

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }
`;

export function App() {
    return (
        <>
            <GlobalStyle />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/mylists" element={<MyLists />} />
                    <Route path="/create-list" element={<CreateList />} />
                    <Route path="/preview" element={<PreviewPage />} />
                    <Route path='*' element={
                        <main>
                            <h1>404</h1>
                        </main>
                    } />
                </Routes>
            </BrowserRouter>
        </>
    )
}