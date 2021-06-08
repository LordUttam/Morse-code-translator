var btnTranslate = document.querySelector("#btn-translate");
var btnTranslateMobile = document.querySelector("#btn-translate-mobile");
var english = document.querySelector("#english");
var morse = document.querySelector("#morse");
var bulb = document.querySelector(".bulb");
var bulb_button = document.querySelector(".bulb-button");
let a = [];

apiURL = "https://api.funtranslations.com/translate/morse.json?text="


function translationURL(text) {
    text = encodeURI(text);
    return URLText = apiURL+text;
}

function errorHandler() {
    console.log("Some error occurred. Try again later.")
}

function translateHandler() {
    let text = english.value;
    console.log(text);
    fetch(translationURL(text)).then(response => response.json())
    .then(json => {var translatedText = json.contents.translated;
                    console.log(translatedText);
                    morse.innerText = translatedText;

    }).then(afterTranslation)
    .catch(errorHandler)
}

btnTranslate.addEventListener("click", translateHandler);
btnTranslateMobile.addEventListener("click", translateHandler);

english.addEventListener("keydown", (e) => {
    const keycode = e.which || e.keyCode;
    if (keycode===13 && !e.shiftKey) {
        e.preventDefault();
        translateHandler();
    }
}
);



// Bulb

//After gets translated, ready the array for transmission.
function afterTranslation(){
    bulb_button.removeAttribute('disabled'); // Can only be used after text has been translated.
    let x = 0;
    a=[];
    m=morse.value;
    m=m.replaceAll("     ","w"); // w denotes new word.

    for(let i=0; i<m.length; i++){
        if(m[i]===".") {
            x=200; // dot time = 1 unit time.
            word_change=0;
            a.push(x); 
            a.push(200); // Inter symbol time = 1 unit time.
        }
        else if(m[i]==="-") {
            x=600; // dash time = 3 units.
            word_change=0;
            a.push(x);
            a.push(200); // Inter symbol time = 1 unit time.
        }

        else if(m[i]===" ") {
            a[a.length-1]=600; // Replace last wait time with Inter letter time = 3 units.
        }

        else if(m[i]==="w") {
            a[a.length-1]=1400; // Replace the last wait time with 1400ms (= 7 units) in case of a new word.
        }

    }

    console.log(a);
    // console.log(bulb.classList);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let ind=0;
let sl=0;
function glow(ind) {

    // After transmit is clicked, disable the transmit button for the duration of transmission.
    if(ind===0) {
        bulb_button.disabled=true;
    }
    else if(ind+1===a.length) {
        bulb_button.removeAttribute('disabled');
    }

    if(bulb.classList.contains('glow'))  {
        bulb.classList.remove('glow');
    }
    else{
        bulb.classList.add('glow');
    }
    
    sl=a[ind];

    if(ind+1<=a.length){
        sleep(sl).then(() => {glow(ind+1)});
        // console.log(sl);
    }
    else {
        if(bulb.classList.contains('glow')) {
            bulb.classList.remove('glow');
        }
        console.log(a);
    }

}

