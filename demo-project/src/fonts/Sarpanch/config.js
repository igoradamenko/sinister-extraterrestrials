const CHARACTERS = [
  // space, !, ", #, $, %, &, ', (, ), *, +, comma, -, dot, /,
  // numbers, :, ;, <, =, >, ?, @, A-Z, [, \, ], ^, _, `, a-z,
  // {, |, }, ~
  '0020-007E',

  // non-breaking space
  '00A0',

  // soft hyphen
  '00AD',

  // en space
  '2002',

  // em space
  '2003',

  // thin space
  '2009',

  // hair space
  '200A',

  // hyphen (-)
  '2010',

  // non-breaking hyphen
  '2011',

  // en dash (–)
  '2013',

  // em dash (—)
  '2014',

  // ‘, ’, ‚ (single low-9 quotation mark), ‛, “, ”, „
  '2018-201E',

  // narrow non-breaking space
  '202F',

  // minus (−)
  '2212',
];

module.exports = {
  CHARACTERS,
};
