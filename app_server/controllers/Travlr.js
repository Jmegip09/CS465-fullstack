const renderTravel = (req, res) => {
  res.render('travel', { title: 'Travlr Getaways | Travel' });
};

module.exports = { renderTravel };