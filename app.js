const express = require('express');
const app = express();

app.get('/add', (req, res) => {
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);
  if (isNaN(a) || isNaN(b)) {
    return res.status(400).json({ error: 'Invalid numbers' });
  }
  res.json({ result: a + b });
});

module.exports = app;

if (require.main === module) {
  app.listen(3000, () => console.log('Calculator API running on port 3000'));
}
