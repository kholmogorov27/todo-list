import React from 'react';
import ReactDOM from 'react-dom/client';
import { v4 as uuid } from 'uuid'
import './index.css';
import './theme.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//--- Data example
const dataExapmle = {
  Groceries: [{title: 'Purchase Milk & Corn Flakes', category: 'Groceries', id: uuid(), checked: false}],
  College: [{title: 'Complete Assignments', category: 'College', id: uuid(), checked: false}],
  Payments: [{title: 'Pay mortgage', category: 'Payments', id: uuid(), checked: false}],
  Uncategorized: [{title: 'Get a new helmet', category: 'Uncategorized', id: uuid(), checked: false}, {title: 'Replace laptop’s screen', category: 'Uncategorized', id: uuid(), checked: false}]
}
//---

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App storage={dataExapmle}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
