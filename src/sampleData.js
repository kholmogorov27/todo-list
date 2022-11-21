import { v4 as uuid } from 'uuid'

//--- Data example
const sampleData = {
  Groceries: [{title: 'Purchase Milk & Corn Flakes', category: 'Groceries', id: uuid(), checked: false}],
  College: [{title: 'Complete Assignments', category: 'College', id: uuid(), checked: false}],
  Payments: [{title: 'Pay mortgage', category: 'Payments', id: uuid(), checked: false}],
  Uncategorized: [{title: 'Get a new helmet', category: 'Uncategorized', id: uuid(), checked: false}, {title: 'Replace laptop’s screen', category: 'Uncategorized', id: uuid(), checked: false}]
}
//---

export default sampleData