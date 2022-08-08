import React, { Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import PageHeader from './components/pageStructure/PageHeader';
import Search from './components/search/Search';
import TransactionsTable from './components/transactions/TransactionsTable';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NewTransaction from './components/NewTransaction';
import HomePage from './components/HomePage';
import { Provider } from 'react-redux';
import store from './store/store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
      <BrowserRouter> 
        <PageHeader />
          <Routes>
            <Route path="/find" element={
              <Fragment>
                <Search />
                <TransactionsTable />
              </Fragment>
            } />

            <Route path="/find/:orderId" element={
              <Fragment>
                <Search />
                <TransactionsTable />
              </Fragment>
            } />

            <Route path="/new" element = {<NewTransaction />} />
            
            <Route path="/" element= {<HomePage />} />
            <Route path="*" element={<h1>Sorry that page doesn't exist </h1>} />
        </Routes>
      </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
