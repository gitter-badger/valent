var colors = [
  '#008EBA',
  '#99CC00',
  '#AA66CC',
  '#FD7400',
  '#723147',
  '#FF5F5F',
  '#AC59D6',
  '#6B5D99',
  '#FFBB33',
  '#FF4444',
  '#1F8A70',
  '#9BCF2E',
  '#004358',
  '#979C9C',
  '#962D3E',
  '#35478C',
  '#5F9C6D',
  '#FD7400',
  '#16193B',
  '#7FB2F0'
];

var counter = 0;

function getColor() {
  if (counter == colors.length) {
    counter = 0;
  }
  return colors[counter++];
}
var formats = [{
  regex: /\*([^\*]+)\*/,
  replacer: (m, p1) => "%c" + p1 + "%c",
  styles: () => ['font-style: italic', '']
}, {
  regex: /\_([^\_]+)\_/,
  replacer: (m, p1) => "%c" + p1 + "%c",
  styles: () => ['font-weight: bold', '']
}, {
  regex: /\`([^\`]+)\`/,
  replacer: (m, p1) => "%c" + p1 + "%c",
  styles: () => ['background: rgb(255, 255, 219); padding: 1px 5px; border: 1px solid rgba(0, 0, 0, 0.1)', '']
}, {
  regex: /\[c\=(?:\"|\')?((?:(?!(?:\"|\')\]).)*)(?:\"|\')?\]((?:(?!\[c\]).)*)\[c\]/,
  replacer: (m, p1, p2) => "%c" + p2 + "%c",
  styles: (match) =>  [match[1], '']
}];

function hasMatches(str) {
  var hasMatches = false;

  formats.forEach(function(format) {
    if (format.regex.test(str)) {
      return hasMatches = true;
    }
  });

  return hasMatches;
}

function getOrderedMatches(str) {
  var matches = [];

  formats.forEach(function(format) {
    var match;
    match = str.match(format.regex);
    if (match) {
      return matches.push({
        format: format,
        match: match
      });
    }
  });
  return matches.sort(function(a, b) {
    return a.match.index - b.match.index;
  });
}

function stringToArgs(str) {
  var firstMatch = null;
  var matches = null;
  var styles = [];

  while (hasMatches(str)) {
    matches = getOrderedMatches(str);
    firstMatch = matches[0];
    str = str.replace(firstMatch.format.regex, firstMatch.format.replacer);
    styles = styles.concat(firstMatch.format.styles(firstMatch.match));
  }

  return [str].concat(styles);
}

export default class Logger {
  static create(name) {
    var background = getColor();
    var color = '#fff;';

    return new Logger(name, color, background);
  }

  static resetColors() {
    counter = 0;
  }

  constructor(name, color, background) {
    this.color = color || '#000';
    this.background = background || '#fff';

    this.name = name;

    this.isEnabled = true;
  }

  enable() {
    this.isEnabled = true;
  }

  disable() {
    this.isEnabled = false;
  }

  error(message) {
    throw new Error(`${this.name}: ${message}`);
  }

  log(message, ...rest) {
    if (this.isEnabled) {

      var customized = stringToArgs(message);
      var completeMessage = customized[0];
      var styles = customized.slice(1);

      console.log(
        `%c${this.name}%c ${completeMessage}`,
        `background:${this.background}; color:${this.color}; font-weight:bold`,
        '',
        ...styles,
        ...rest);
    }
  }
}
