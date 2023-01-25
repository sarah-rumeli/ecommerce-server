

User
 - isAdmin: default false.

Product --> CRUD

Category --> CR

_______


User
 - isAdmin: default false.

Product --> CRUD
  - category: enum

Order --> CR

_______


MVP: 
- user can buy only one product at a time (can choose quantity but can not place an order with different products)
- any user can CRUD products

Bonus:
- only admin can CUD products
- responsive
- users can buy different products + shopping cart in React (not in the DB)
- payments (ex. Stripe)



