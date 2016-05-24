var $ = require('jquery')
var template20 = require('template20')
var prop = require('lodash.property')
var flow = require('lodash.flow')
var addCommas = require('add-commas')

var githubUsername = 'raineorshine'

var repos = [
  'binpath',
  'cint',
  'creatable',
  'dotfiles',
  'emitter20',
  'freebusy',
  'get-stdin-promise',
  'gulp-striate',
  'nativity',
  'plural-parens',
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
  'x-to-y',
  'zones'
]

// add a period to a sentence if it doesn't have one
function endSentence(str) {
  return str + (str[str.length-1] !== '.' ? '.' : '')
}

$(function () {

  var starsEl = $('#ncu-stars')
  var setStars = starsEl.text.bind(starsEl)

  // get number of stars of npm-check-updates
  $.get('https://api.github.com/repos/tjunnone/npm-check-updates')
    .then(flow(
      prop('stargazers_count'),
      addCommas,
      setStars
    ))

  // populate other repos
  repos.forEach(function (reponame) {

    // clone and populate a new table row
    var row = template20('repo-row', {
      name: reponame,
      url: 'https://github.com/' + githubUsername + '/' + reponame,
      description: $.get('https://api.github.com/repos/' + githubUsername + '/' + reponame)
        .then(flow(prop('description'), endSentence))
    })

    // add the new row to the table
    $('.repos').append(row)
  })

})
