##### Requirements
- `docker-compose` CLI
##### Instructions
1. `docker-compose up` spins up the node, react and mongodb containers
    1. The frontend will be available on `localhost:3000` and the backend will be available on `localhost:8080
    `. Mongodb is not exposed outside the container internal network.
    2. The backend has one route `/api/transactions` that lists transactions (`GET`) and allows transaction creation
     (`POST`, with a body like: `{"value": 100"}`)
    3. Seeding the database can be done via `/api/seedTransactions`
2. `yarn test` inside the `/backend` folder executes tests
