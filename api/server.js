const express = require('express');

const app = express();
const PORT = 5000;

app.use('/', require('./routes'));

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
