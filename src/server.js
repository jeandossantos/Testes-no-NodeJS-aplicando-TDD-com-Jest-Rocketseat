const app = require('./app');

app.listen(process.env.PORT || 3001, () => console.log('Executando back-end na porta 3001...'))