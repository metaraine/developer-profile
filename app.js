var express = require('express')

var app = express()
app.use(express.static(__dirname + '/public'))

app.listen(process.env.PORT || 6222, function() {
  console.log('Express server listening on port ' + this.address().port)
})
