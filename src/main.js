import "./css/index.css"
import IMask from "imask"

const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path");
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path");
const ccLogoImg = document.querySelector(".cc-logo span:nth-child(2) img");
const securityCode = document.querySelector("#security-code");
const expirationDate = document.querySelector("#expiration-date");
const cardNumber = document.querySelector("#card-number");

function setCardType(type) {
  const colors = {
    visa: ["#436D99", "#2D57F2"],
    mastercard: ["#DF6F29", "#C69347"],
    elo: ["#FFCB05", "#00A4E0"],
    hipercard: ["#D90D32", "#8C1822"],
    amex: ["#0077A6", "#FFFFFF"],
    diners: ["#BFAA69", "#FFE9A6"],
    default: ["black", "gray"],
  }

  ccBgColor01.setAttribute("fill", colors[type][0]);
  ccBgColor02.setAttribute("fill", colors[type][1]);
  ccLogoImg.setAttribute("src", `./cc-${type}.svg`);
}

const securityCodePattern = {
  mask: "0000",
}
const securityCodeMasked = IMask(securityCode, securityCodePattern);

let currentYear = String(new Date().getFullYear()).slice(2);
let tenYearsFromNow = String(new Date().getFullYear() + 10).slice(2);

const expirationDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
    YY: {
      mask: IMask.MaskedRange,
      from: currentYear,
      to: tenYearsFromNow,
    },
  },
}
const expirationDateMasked = IMask(expirationDate, expirationDatePattern);

const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4[0-9]\d{0,15}/,
      cardtype: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
      cardtype: "mastercard",
    },
    {
      mask: "0000 0000 0000 0000",
      regex:
        /^4011(78|79)|^43(1274|8935)|^45(1416|7393|763(1|2))|^50(4175|6699|67[0-6][0-9]|677[0-8]|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-9])|^627780|^63(6297|6368|6369)|^65(0(0(3([1-3]|[5-9])|4([0-9])|5[0-1])|4(0[5-9]|[1-3][0-9]|8[5-9]|9[0-9])|5([0-2][0-9]|3[0-8]|4[1-9]|[5-8][0-9]|9[0-8])|7(0[0-9]|1[0-8]|2[0-7])|9(0[1-9]|[1-6][0-9]|7[0-8]))|16(5[2-9]|[6-7][0-9])|50(0[0-9]|1[0-9]|2[1-9]|[3-4][0-9]|5[0-8]))/,
      cardtype: "elo",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^606282|^3841(?:[0|4|6]{1})0/,
      cardtype: "hipercard",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^3[47][0-9]{13}/,
      cardtype: "amex",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(36[0-8][0-9]{3}|369[0-8][0-9]{2}|3699[0-8][0-9]|36999[0-9])/,
      cardtype: "diners",
    },
    {
      mask: "0000 0000 0000 0000",
      cardtype: "default",
    },
  ],
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "")
    const foundMask = dynamicMasked.compiledMasks.find((item) => number.match(item.regex))
    console.log(foundMask)
    return foundMask;
  },
}
const carNumberMasked = IMask(cardNumber, cardNumberPattern);




globalThis.setCardType = setCardType
