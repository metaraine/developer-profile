var $ = require('jquery')
var template20 = require('template20')
var prop = require('lodash.property')
var flow = require('lodash.flow')
var addCommas = require('add-commas')
var emoji = require('emojilib')

var githubUsername = 'raineorshine'

var ethRepos = [
  'solgraph',
  'solidity-repl',
  'generate-contract-factory',
  'generate-contract-interface',
  'eth-new-contract',
  'wait-transaction',
  'solidity-sha3'
]

var otherRepos = [
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

// convert all emoji codes in the given string into emoji characters
function convertEmoji(str) {
  return str.replace(/:(\S*):/g, function(text, key) {
    return emoji.lib[key].char
  })
}

function renderRow(reponame) {
  return template20('repo-row', {
    name: reponame,
    url: 'https://github.com/' + githubUsername + '/' + reponame,
    description: $.get('https://api.github.com/repos/' + githubUsername + '/' + reponame)
      .then(flow(prop('description'), convertEmoji, endSentence))
  })
}

$(function () {

  var starsEl = $('#ncu-stars')
  var setStars = starsEl.text.bind(starsEl)

  var appendEthRepo = function(el) { $('.eth-repos').append(el) }
  var appendOtherRepo = function(el) { $('.other-repos').append(el) }

  // get number of stars of npm-check-updates
  $.get('https://api.github.com/repos/tjunnone/npm-check-updates')
    .then(flow(
      prop('stargazers_count'),
      addCommas,
      setStars
    ))

  // populate repos
  ethRepos.forEach(flow(renderRow, appendEthRepo))
  otherRepos.forEach(flow(renderRow, appendOtherRepo))
})
