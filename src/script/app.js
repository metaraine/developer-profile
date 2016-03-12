var $ = require('jquery')
var template20 = require('template20')
var prop = require('lodash.property')

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

$(function () {

  // populate
  $.get('https://api.github.com/repos/tjunnone/npm-check-updates')
    .then(prop('stargazers_count'))
    .then(console.log.bind(console))

  // populate other repos
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
