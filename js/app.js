var gradientFirstColor = "";

window.onload = function() {
  // decorate the text
  decorateBodyText(document.getElementById("bodyText"));
  // set the gradient background of the logo
  changeGradientColorLogo(document.getElementById("logo"));
  // set the card font color
  document.getElementById("theory").style.color = gradientFirstColor;
  document.getElementById("theory-number").style.borderBottom =
    "6px solid " + gradientFirstColor;
  // set the card footer color
  document.getElementById("footer").style.color = gradientFirstColor;
  // set the background of the body text
  var spanTag = document.getElementById("bodyText").children;
  for (var i = 0; i < spanTag.length; i++) {
    spanTag[i].style.background = gradientFirstColor;
  }
};

function changeGradientColorLogo(elem) {
  elem.style.background = "linear-gradient(to right," + generate(100) + ")";
}

function decorateBodyText(elem) {
  var str = elem.textContent.trim();
  //console.log(str);

  arrStr = str.split(" ");
  //console.log(arrStr);

  arrStrLen = arrStr.length;
  //console.log(arrStrLen);

  var bodyText = "";

  var textStyleClass = ["text-1", "text-2", "text-3", "text-4"];
  l = 0;
  while (1) {
    var randn = getRandomInt(2, 3);
    var end = randn + l;
    if (arrStrLen == 0 || l >= arrStrLen || end >= arrStrLen) {
      break;
    }
    var text = arrStr.slice(l, end).join(" ");

    var style = "";

    if (text.length > 23) {
      style = "text-3";
    } else {
      style = textStyleClass[getRandomInt(0, 3)];
    }

    bodyText += "<span class='" + style + "'>" + text + "</span>";

    //console.log(text);

    l = end;
  }

  if (l < arrStrLen) {
    bodyText +=
      "<span class='" +
      textStyleClass[1] +
      "'>" +
      arrStr.slice(l).join(" ") +
      "</span>";
  }

  elem.innerHTML = bodyText;
}

/* hex code generation */
function hex(c) {
  var s = "0123456789abcdef";
  var i = parseInt(c);
  if (i == 0 || isNaN(c)) return "00";
  i = Math.round(Math.min(Math.max(0, i), 255));
  return s.charAt((i - (i % 16)) / 16) + s.charAt(i % 16);
}

/* Convert an RGB triplet to a hex string */
function convertToHex(rgb) {
  return hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
}

/* Remove '#' in color hex string */
function trim(s) {
  return s.charAt(0) == "#" ? s.substring(1, 7) : s;
}

/* Convert a hex string to an RGB triplet */
function convertToRGB(hex) {
  var color = [];
  color[0] = parseInt(trim(hex).substring(0, 2), 16);
  color[1] = parseInt(trim(hex).substring(2, 4), 16);
  color[2] = parseInt(trim(hex).substring(4, 6), 16);
  return color;
}

function generateColor(colorStart, colorEnd, colorCount) {
  // The beginning of your gradient
  var start = convertToRGB(colorStart);

  // The end of your gradient
  var end = convertToRGB(colorEnd);

  // The number of colors to compute
  var len = colorCount;

  //Alpha blending amount
  var alpha = 0.0;

  var saida = [];

  for (i = 0; i < len; i++) {
    var c = [];
    alpha += 1.0 / len;

    c[0] = start[0] * alpha + (1 - alpha) * end[0];
    c[1] = start[1] * alpha + (1 - alpha) * end[1];
    c[2] = start[2] * alpha + (1 - alpha) * end[2];

    saida.push("#" + convertToHex(c));
  }

  return saida;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generate(numberOfColor) {
  var hexValStart = "#";
  var hexValEnd = "#";

  var s = "0123456789abcdef";
  for (var i = 0; i < 6; i++) {
    hexValStart = hexValStart + s[getRandomInt(0, 15)];
    hexValEnd = hexValEnd + s[getRandomInt(0, 15)];
  }

  //console.log(hexValStart);

  gradientFirstColor = hexValEnd;

  return generateColor(hexValStart, hexValEnd, numberOfColor);

  //var tmp = generateColor(hexValStart, hexValEnd, 10);
}
