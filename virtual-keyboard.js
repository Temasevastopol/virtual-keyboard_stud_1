
const getData = async () => await(await fetch('./keys.json')).json();
const keyboard_key = await getData();

// отрисовка клавиатуры
const BODY = document.body;
const MAIN_CONTEINER = document.createElement('section');
    MAIN_CONTEINER.classList.add('centralizer');
    BODY.prepend(MAIN_CONTEINER);

const TITLE = document.createElement('p');
    TITLE.classList.add('title');
    TITLE.innerText = 'RSS Виртуальная клавиатура'
    MAIN_CONTEINER.append(TITLE);

const TEXTAREA = document.createElement('textarea');
    TEXTAREA.classList.add('textarea');
    TEXTAREA.setAttribute('row', 5);
    TEXTAREA.setAttribute('cols', 50);
    MAIN_CONTEINER.append(TEXTAREA);

const KEYBOARD = document.createElement('div');
    KEYBOARD.classList.add('keyboard');
    MAIN_CONTEINER.append(KEYBOARD);

const DISCRIPTION = document.createElement('p');
    DISCRIPTION.classList.add('disription');
    DISCRIPTION.innerText = 'Клавиатура создана в операционной системе Windows';
    MAIN_CONTEINER.append(DISCRIPTION);

const LANGUAGE = document.createElement('p');
    LANGUAGE.classList.add('language');
    LANGUAGE.innerText = 'Для переключения языка комбинация: левыe ctrl + alt';
    MAIN_CONTEINER.append(LANGUAGE);

function addSpan(nameClass, lang, value){
    const spanInLang = document.createElement('span');
    spanInLang.classList.add(nameClass);
    spanInLang.classList.add('hidden');
    spanInLang.innerHTML = value;
    lang.append(spanInLang);
}

for(let i=0; i<keyboard_key.length; i++){ 
    const l = keyboard_key[i].length;
    const KEYBOARD_ROW = document.createElement('div');
        KEYBOARD_ROW.classList.add('keyboard-row');

        for(let j=0; j<l; j++){
            const KEYBOARD_KEY = document.createElement('div');
            KEYBOARD_KEY.classList.add('keyboard-key');

            KEYBOARD_KEY.classList.add(`${keyboard_key[i][j].event_code}`);
                const rus_lang = document.createElement('span');
                rus_lang.classList.add('rus');
                rus_lang.classList.add('hidden');
                    addSpan('caseDown', rus_lang, `${keyboard_key[i][j].rus.caseDown}`);
                    addSpan('caseUp', rus_lang, `${keyboard_key[i][j].rus.caseUp}`);
                    addSpan('caps', rus_lang, `${keyboard_key[i][j].rus.caps}`);
                    addSpan('capsShift', rus_lang, `${keyboard_key[i][j].rus.capsShift}`);
                KEYBOARD_KEY.append(rus_lang);

                const eng_lang = document.createElement('span');
                eng_lang.classList.add('eng');
                    addSpan('caseDown', eng_lang, `${keyboard_key[i][j].eng.caseDown}`);
                    addSpan('caseUp', eng_lang, `${keyboard_key[i][j].eng.caseUp}`);
                    addSpan('caps', eng_lang, `${keyboard_key[i][j].eng.caps}`);
                    addSpan('capsShift', eng_lang, `${keyboard_key[i][j].eng.capsShift}`);
                KEYBOARD_KEY.append(eng_lang);
            KEYBOARD_ROW.append(KEYBOARD_KEY);
        }

        KEYBOARD.append(KEYBOARD_ROW);
}

const caseDownEng = document.querySelectorAll('.eng .caseDown');
caseDownEng.forEach(item => {
    item.classList.remove('hidden');
})

const capsLockBtn = document.querySelector('.CapsLock');

const KEYBOARD_KEYS = document.querySelectorAll('.keyboard-key');
const CASE_DOWN = document.querySelectorAll('.caseDown');
const CASE_UP = document.querySelectorAll('.caseUp');
const CAPS = document.querySelectorAll('.caps');
const CAPS_SHIFT = document.querySelectorAll('.capsShift');

// нажатие на клавиши мышкой
let str = '';
const array = [];
let posFocus = 0;
TEXTAREA.setSelectionRange(posFocus, posFocus);  
TEXTAREA.focus();

TEXTAREA.onclick = function (){
    posFocus = TEXTAREA.selectionStart;
    console.log('pos after click = ', posFocus);
}
console.log(posFocus);

const specialBtn = ['.Backspace', '.Delete', '.Tab', '.CapsLock', '.Enter', '.ShiftLeft', '.ShiftRight', '.ConstolLeft', '.MetaLeft', '.AltLeft', '.AltRight', '.ConstolRight']
const mouseDownKey = (event) => {
    if(event.target.closest('.keyboard-key')){
        KEYBOARD_KEYS.forEach(el => {
            if (el.classList.contains('active')){
                el.classList.remove('active');
            }
        })
        if (event.target.classList.contains('keyboard-key')){
            event.target.classList.add('active');
        }
        else event.target.parentNode.parentNode.classList.add('active');

        if (event.target.closest('.Backspace')){
                str = str.slice(0, posFocus-1) + str.slice(posFocus);
                posFocus = posFocus - 2;
        } else if (event.target.closest('.Tab')) {
                str = str.slice(0, posFocus) + '  ' + str.slice(posFocus);
                posFocus = posFocus + 1;
        } else if (event.target.closest('.Delete')){
                str = str.slice(0, posFocus) + str.slice(posFocus + 1);
                posFocus = posFocus - 1;
        } else if (event.target.closest('.Enter')) {
                str = str.slice(0, posFocus) + '\n' + str.slice(posFocus);
        } else if (event.target.closest('.CapsLock')){
            if (event.target.classList.contains('keyboard-key')){
                if (event.target.closest('.pressCaps')){
                    event.target.classList.remove('pressCaps');
                    CASE_DOWN.forEach(el=> {
                        el.classList.remove('hidden')
                    });
                    CAPS.forEach(el => {
                        el.classList.add('hidden');
                    });
                    CASE_UP.forEach(el => {
                        el.classList.add('hidden')
                    });
                    CAPS_SHIFT.forEach(el => {
                        el.classList.add('hidden')
                    })
                }
                else {
                    event.target.classList.add('pressCaps');
                    CASE_DOWN.forEach(el=> {
                        el.classList.add('hidden')
                    });
                    CAPS.forEach(el => {
                        el.classList.remove('hidden');
                    });
                    CASE_UP.forEach(el => {
                        el.classList.add('hidden')
                    });
                    CAPS_SHIFT.forEach(el => {
                        el.classList.add('hidden')
                    })
                }
            }
            else {
                if (event.target.parentNode.parentNode.classList.contains('pressCaps')){
                    event.target.parentNode.parentNode.classList.remove('pressCaps');
                    CASE_DOWN.forEach(el=> {
                        el.classList.remove('hidden')
                    });
                    CAPS.forEach(el => {
                        el.classList.add('hidden');
                    });
                    CASE_UP.forEach(el => {
                        el.classList.add('hidden')
                    });
                    CAPS_SHIFT.forEach(el => {
                        el.classList.add('hidden')
                    })
                }
                else {
                    event.target.parentNode.parentNode.classList.add('pressCaps');
                    CASE_DOWN.forEach(el=> {
                        el.classList.add('hidden')
                    });
                    CAPS.forEach(el => {
                        el.classList.remove('hidden');
                    })
                    CASE_UP.forEach(el => {
                        el.classList.add('hidden')
                    });
                    CAPS_SHIFT.forEach(el => {
                        el.classList.add('hidden')
                    })
                }
            } 
            posFocus--;
        } 
        else if (event.target.closest('.ShiftLeft') || event.target.closest('.ShiftRight')){
            console.log(event.target);
            if (event.target.classList.contains('keyboard-key') || event.target.parentNode.parentNode.classList.contains('keyboard-key')){
                if (event.target.parentNode.parentNode.classList.contains('keyboard-key')){
                    event.target.parentNode.parentNode.classList.add('pressShift')
                }
                else event.target.classList.add('pressShift');
                if (capsLockBtn.classList.contains('pressCaps')){
                    CASE_DOWN.forEach(el=> {
                        el.classList.add('hidden')
                    });
                    CASE_UP.forEach(el => {
                        el.classList.add('hidden');
                    });
                    CAPS.forEach(el => {
                        el.classList.add('hidden')
                    });
                    CAPS_SHIFT.forEach(el => {
                        el.classList.remove('hidden')
                    })
                } else {
                    CASE_DOWN.forEach(el=> {
                        el.classList.add('hidden')
                    });
                    CASE_UP.forEach(el => {
                        el.classList.remove('hidden');
                    });
                    CAPS.forEach(el => {
                        el.classList.add('hidden')
                    });
                    CAPS_SHIFT.forEach(el => {
                        el.classList.add('hidden')
                    })
                }
            }
        } else if (event.target.closest('.ControlLeft') || event.target.closest('.MetaLeft') || event.target.closest('.ControlRight') || event.target.closest('.AltLeft') || event.target.closest('.AltRight') ){
            str = str.slice(0, posFocus) + '' + str.slice(posFocus);
            posFocus--;
        }
        else if (event.target.closest('.Space')){
            str = str.slice(0, posFocus) + ' ' + str.slice(posFocus);
        }
        else {
            str =  str.slice(0, posFocus) + event.target.innerText + str.slice(posFocus);
        }
        TEXTAREA.innerHTML = str;
        if (posFocus < 0){
            posFocus = 0;
        }
        posFocus++;  
        console.log('posFocus ', posFocus);
    }
} 

const mouseUpKey = (event) => {
    if(event.target.closest('.keyboard-key')){
        if (event.target.classList.contains('keyboard-key')){
            event.target.classList.remove('active');
            console.log('remove active')
        }
        else event.target.parentNode.parentNode.classList.remove('active');
        if (event.target.closest('.ShiftLeft') || event.target.closest('.ShiftRight')){
            console.log(event.target);
            if (event.target.classList.contains('keyboard-key') || event.target.parentNode.parentNode.classList.contains('keyboard-key')){
                if (event.target.parentNode.parentNode.classList.contains('keyboard-key')){
                    event.target.parentNode.parentNode.classList.remove('pressShift')
                }
                else event.target.classList.remove('pressShift');
                if (capsLockBtn.classList.contains('pressCaps')){
                    CASE_DOWN.forEach(el=> {
                        el.classList.add('hidden')
                    });
                    CASE_UP.forEach(el => {
                        el.classList.add('hidden');
                    });
                    CAPS.forEach(el => {
                        el.classList.remove('hidden');
                    });
                    CAPS_SHIFT.forEach(el => {
                        el.classList.add('hidden');
                    })
                } else {
                    CASE_DOWN.forEach(el=> {
                        el.classList.remove('hidden')
                    });
                    CASE_UP.forEach(el => {
                        el.classList.add('hidden');
                    });
                    CAPS.forEach(el => {
                        el.classList.add('hidden')
                    });
                    CAPS_SHIFT.forEach(el => {
                        el.classList.add('hidden')
                    })
                }
            }
        }
        TEXTAREA.setSelectionRange(posFocus, posFocus);  
        TEXTAREA.focus();
    }
} 

KEYBOARD.addEventListener('mousedown', mouseDownKey);
KEYBOARD.addEventListener('mouseup', mouseUpKey);



window.addEventListener('mouseup', (event) => {
    KEYBOARD_KEYS.forEach((el)=> {
        el.classList.remove('active');
    });
  });
//нажатие на клавиши клавиатурой
window.addEventListener('keydown', (event) => {
    console.log(TEXTAREA.innerHTML)
    if (event.repeat === true) return;
     const letter = window.event.code;
     KEYBOARD_KEYS.forEach((el)=> {
         if (el.classList.contains(letter)){
             console.log('буква ', letter);
             if (el.classList.contains('active')){
                 el.classList.remove('active')
             }
             else el.classList.add('active');
             if (letter === 'CapsLock'){
                if (el.classList.contains('pressCaps')){
                    el.classList.remove('pressCaps');
                    CASE_DOWN.forEach(el=> {
                        el.classList.remove('hidden')
                    });
                    CAPS.forEach(el => {
                        el.classList.add('hidden');
                    });
                    CASE_UP.forEach(el => {
                        el.classList.add('hidden')
                    });
                    CAPS_SHIFT.forEach(el => {
                        el.classList.add('hidden')
                    })
                } else {
                    el.classList.add('pressCaps');
                    CASE_DOWN.forEach(el=> {
                        el.classList.add('hidden')
                    });
                    CAPS.forEach(el => {
                        el.classList.remove('hidden');
                    });
                    CASE_UP.forEach(el => {
                        el.classList.add('hidden')
                    });
                    CAPS_SHIFT.forEach(el => {
                        el.classList.add('hidden')
                    })
                }    
             }
             if (letter === 'ShiftLeft' || letter === 'ShiftRight'){
                if (capsLockBtn.classList.contains('pressCaps')){
                    CASE_DOWN.forEach(el=> {
                        el.classList.add('hidden')
                    });
                    CASE_UP.forEach(el => {
                        el.classList.add('hidden');
                    });
                    CAPS.forEach(el => {
                        el.classList.add('hidden')
                    });
                    CAPS_SHIFT.forEach(el => {
                        el.classList.remove('hidden')
                    })
                } else {
                    CASE_DOWN.forEach(el=> {
                        el.classList.add('hidden')
                    });
                    CASE_UP.forEach(el => {
                        el.classList.remove('hidden');
                    });
                    CAPS.forEach(el => {
                        el.classList.add('hidden')
                    });
                    CAPS_SHIFT.forEach(el => {
                        el.classList.add('hidden')
                    })
                }
             }
       }  
     });
     str = TEXTAREA.innerText;
     console.log(str);
   }, false);

window.addEventListener('keyup', (event) => {
    const letter = window.event.code;
     KEYBOARD_KEYS.forEach((el)=> {
         el.classList.remove('active');
     });
     if (letter === 'ShiftLeft' || letter === 'ShiftRight'){
        if (capsLockBtn.classList.contains('pressCaps')){
            CASE_DOWN.forEach(el=> {
                el.classList.add('hidden')
            });
            CASE_UP.forEach(el => {
                el.classList.add('hidden');
            });
            CAPS.forEach(el => {
                el.classList.remove('hidden');
            });
            CAPS_SHIFT.forEach(el => {
                el.classList.add('hidden');
            })
        } else {
            CASE_DOWN.forEach(el=> {
                el.classList.remove('hidden')
            });
            CASE_UP.forEach(el => {
                el.classList.add('hidden');
            });
            CAPS.forEach(el => {
                el.classList.add('hidden')
            });
            CAPS_SHIFT.forEach(el => {
                el.classList.add('hidden')
            })
        }
     }
});
/*
window.addEventListener('keydown', event => {
    console.log(window.event.code);
})
*/