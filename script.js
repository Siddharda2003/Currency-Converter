let options=document.querySelectorAll(".countries select");
let fromCur=document.querySelector(".op1 select");
let toCur=document.querySelector(".op2 select");
let convert=document.querySelector(".btn");
let amount=document.querySelector("#amount");
let answer=document.querySelector(".answer");
let baseurl = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
for(let select of options){
    for(let curr in countryList){
        let newoption=document.createElement("option");
        newoption.value=curr;
        newoption.innerText=curr;
        if(select.name==="from" && curr==="USD"){
            newoption.selected="selected";
        }
        if(select.name==="to" && curr==="INR"){
            newoption.selected="selected";
        }
        select.append(newoption);
    };
    select.addEventListener("change",evnt=>{
        updateFlag(evnt.target);
    });
};
const updateFlag = (evnt ) => {
    let code=evnt.value;
    let country=countryList[code];
    let img=evnt.parentElement.querySelector("img");
    img.src=`https://flagsapi.com/${country}/flat/64.png`;
};
convert.addEventListener("click",evnt=>{
   evnt.preventDefault();
   updateConversionrate();
});
const updateConversionrate = async () => {
    let value=amount.value;
    if(value<=0 || value===""){
        alert("Enter a proper input");
    }
    else{
        let URL=`${baseurl}/${fromCur.value.toLowerCase()}/${toCur.value.toLowerCase()}.json`;
        let response = await fetch(URL);
        let data = await response.json();
        let rate=data[toCur.value.toLowerCase()];
        let finalanswer=(rate*value).toFixed(3);
        answer.innerText=`${value} ${fromCur.value.toLowerCase()} = ${finalanswer} ${toCur.value.toLowerCase()}`;
    }
 }