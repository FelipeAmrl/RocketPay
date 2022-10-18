import "./css/index.css"

const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path");
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path");
const ccLogoImg = document.querySelector(".cc-logo span:nth-child(2) img");
const creditCard = document.querySelector(".cc");

function setCardType(type) 
{
  const colors = {
    visa: ["#436D99", "#2D57F2"],
    mastercard: ["#DF6F29", "#C69347"],
    elo: ["#FFCB05", "#00A4E0"],
    hipercard: ["#D90D32", "#8C1822"],
    amex: ["#0077A6", "#FFFFFF"],
    diners: ["#BFAA69", "#FFE9A6"],
    default: ["black", "gray"]
  }

  ccBgColor01.setAttribute("fill", colors[type][0]);
  ccBgColor02.setAttribute("fill", colors[type][1]);
  ccLogoImg.setAttribute("src", `./cc-${type}.svg`);
  
}

globalThis.setCardType = setCardType;

