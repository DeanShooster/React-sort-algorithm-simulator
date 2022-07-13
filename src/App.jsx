import React,{ Fragment, Suspense } from "react";
import { Routes,Route, BrowserRouter } from 'react-router-dom';

import './style/shared.scss';

import Header from "./components/header/Header";
import HomePage from './components/home-page/HomePage';
import Sort from './components/sort/Sort';
import Algorithm from './components/algorithm/Algorithm';
import Page404 from './components/page-404/Page404';
import Footer from './components/footer/Footer';
import SortCard from './components/sort/sort-card/SortCard';

function App() {
  return (
    <BrowserRouter >
      <Fragment>
        <Header />
        <Suspense fallback={ <div>Loading...</div> }>
            <Routes>
              <Route path='/' element={ <HomePage /> }/>
              <Route path='/sort/*' element={ <Sort />}>
                <Route path='selection' element={<SortCard title='Selection'/>}/>
                <Route path='insertion' element={<SortCard title='Insertion'/>}/>
                <Route path='bubble' element={<SortCard title='Bubble'/>}/>
                <Route path='merge' element={<SortCard title='Merge'/>}/>
                <Route path='quick' element={<SortCard title='Quick'/>}/>
                <Route path='heap' element={<SortCard title='Heap'/>}/>
                <Route path='counting' element={<SortCard title='Counting'/>}/>
                <Route path='bucket' element={<SortCard title='Bucket'/>}/>
                <Route path='radix' element={<SortCard title='Radix'/>}/>
              </Route>
              <Route path='/algorithm' element={ <Algorithm />} />
              <Route path='*' element={ <Page404 /> }/>
            </Routes>
        </Suspense>
        <Footer />
      </Fragment>
    </BrowserRouter>
  );
}

export default App;
