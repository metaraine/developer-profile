var $ = require('jquery')
var template20 = require('template20')

var repos = [
  'binpath',
  'cint',
  'creatable',
  'dotfiles',
  'freebusy',
  'generator-yoga',
  'get-stdin-promise',
  'gulp-striate',
  'nativity',
  'prefixnote',
  'promise-guard',
  'shackles',
  'spacedoutcss',
  'spawn-please',
  'striate',
  'swatch',
  'sweet-compose',
  'syllaparse',
  'template20',
  'whipdb',
  'wordsoap',
  'x-to-y'
]

// create a function that returns the value of the pre-supplied key of the object given at runtime
function prop(key) {
  return function (obj) {
    return obj[key]
  }
}

$(function () {

  repos.forEach(function (reponame) {

    // clone and populate a new table row
    var row = template20('repo-row', {
      name: reponame,
      url: 'https://github.com/metaraine/' + reponame,
      description: $.get('https://api.github.com/repos/metaraine/' + reponame)
        .then(prop('description'))
    })

    // add the new row to the table
    $('.repos').append(row)
  })

})
