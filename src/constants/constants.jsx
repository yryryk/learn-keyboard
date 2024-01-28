const letters = {
  ru: {},
  eng: {
    numbersLine: {
      positionCoefficient: 0,
      native: ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="],
      shifted: ["~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+"],
    },
    firstLettersLine: {
      positionCoefficient: 1,
      native: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\"],
      shifted: ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}", "|"],
    },
    secondLettersLine: {
      positionCoefficient: 2,
      native: ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'"],
      shifted: ["A", "S", "D", "F", "G", "H", "J", "K", "L", ":", '"'],
    },
    thirdLettersLine: {
      positionCoefficient: 3,
      native: ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"],
      shifted: ["Z", "X", "C", "V", "B", "N", "M", "<", ">", "?"],
    },
  },
  keyCodesMapping: {
    48: { line: "numbersLine", position: 10 },
    49: { line: "numbersLine", position: 1 },
    50: { line: "numbersLine", position: 2 },
    51: { line: "numbersLine", position: 3 },
    52: { line: "numbersLine", position: 4 },
    53: { line: "numbersLine", position: 5 },
    54: { line: "numbersLine", position: 6 },
    55: { line: "numbersLine", position: 7 },
    56: { line: "numbersLine", position: 8 },
    57: { line: "numbersLine", position: 9 },
    65: { line: "secondLettersLine", position: 0 },
    66: { line: "thirdLettersLine", position: 4 },
    67: { line: "thirdLettersLine", position: 2 },
    68: { line: "secondLettersLine", position: 2 },
    69: { line: "firstLettersLine", position: 2 },
    70: { line: "secondLettersLine", position: 3 },
    71: { line: "secondLettersLine", position: 4 },
    72: { line: "secondLettersLine", position: 5 },
    73: { line: "firstLettersLine", position: 7 },
    74: { line: "secondLettersLine", position: 6 },
    75: { line: "secondLettersLine", position: 7 },
    76: { line: "secondLettersLine", position: 8 },
    77: { line: "thirdLettersLine", position: 6 },
    78: { line: "thirdLettersLine", position: 5 },
    79: { line: "firstLettersLine", position: 8 },
    80: { line: "firstLettersLine", position: 9 },
    81: { line: "firstLettersLine", position: 0 },
    82: { line: "firstLettersLine", position: 3 },
    83: { line: "secondLettersLine", position: 1 },
    84: { line: "firstLettersLine", position: 4 },
    85: { line: "firstLettersLine", position: 6 },
    86: { line: "thirdLettersLine", position: 3 },
    87: { line: "firstLettersLine", position: 1 },
    88: { line: "thirdLettersLine", position: 1 },
    89: { line: "firstLettersLine", position: 5 },
    90: { line: "thirdLettersLine", position: 0 },
    186: { line: "secondLettersLine", position: 9 },
    187: { line: "numbersLine", position: 12 },
    188: { line: "thirdLettersLine", position: 7 },
    189: { line: "numbersLine", position: 11 },
    190: { line: "thirdLettersLine", position: 8 },
    191: { line: "thirdLettersLine", position: 9 },
    192: { line: "secondLettersLine", position: 10 },
    219: { line: "firstLettersLine", position: 10 },
    221: { line: "firstLettersLine", position: 11 },
    222: { line: "firstLettersLine", position: 12 },
    223: { line: "numbersLine", position: 0 },
  },
  lettersMapping : {},
  usedKeyCodes: [
    "48",
    "49",
    "50",
    "51",
    "52",
    "53",
    "54",
    "55",
    "56",
    "57",
    "65",
    "66",
    "67",
    "68",
    "69",
    "70",
    "71",
    "72",
    "73",
    "74",
    "75",
    "76",
    "77",
    "78",
    "79",
    "80",
    "81",
    "82",
    "83",
    "84",
    "85",
    "86",
    "87",
    "88",
    "89",
    "90",
    "186",
    "187",
    "188",
    "189",
    "190",
    "191",
    "192",
    "219",
    "221",
    "222",
    "223",
  ],
};

export { letters };
