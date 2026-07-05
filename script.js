// ========== H E A D E R ========== //

//Menu mobile button
const mobile_button_menu = document.getElementById("mobile_button_menu");
const mobile_menu = document.getElementById("mobile_menu");

mobile_button_menu.addEventListener("click", () =>{
    mobile_button_menu.classList.toggle("closed");
    mobile_menu.classList.toggle("closed");
});

//Close menu if main clicked
const main = document.getElementById("main");
main.addEventListener("click", () =>{
    mobile_button_menu.classList.add("closed");
    mobile_menu.classList.add("closed");
});

// ========== L E T T E R S ========== //
const letters = [
  // Letras minúsculas sem acento (26)
  'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
  // Letras maiúsculas sem acento (26)
  'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
  // Letras minúsculas acentuadas (13)
  'á','à','â','ã','é','ê','í','ó','ô','õ','ú','ü','ç',
  // Letras maiúsculas acentuadas (13)
  'Á','À','Â','Ã','É','Ê','Í','Ó','Ô','Õ','Ú','Ü','Ç',
  // Dígitos (10)
  '0','1','2','3','4','5','6','7','8','9',
  // Espaço (1)
  ' ',
  // Pontuação (20)
  '.',',',';',':','!','?','(',')','[',']','{','}','"',"'",'-','–','—','_','/','\\',
  // Símbolos comuns (13)
  '@','#','$','%','&','*','+','=','<','>','°','ª','º'
];


// ========== E N C O D E ========== //

//Upload file
const encoder_input_file = document.getElementById("encoder_input_file");
const encoder_input = document.getElementById("encoder_input");

if (encoder_input_file !== null) {
    encoder_input_file.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        file.text().then(text => {
            encoder_input.value = text;
            e.target.value = "";
        });
    });
}

//Generete code using the PID
const encode_button = document.getElementById("encode_button");
const encoder_output = document.getElementById("encoder_output");

if (encode_button != null){
    encode_button.addEventListener("click", () =>{
        encoder_output.value = encodeText(encoder_input.value);
    });
}

//Generate code: Text --> Surface code --> Deep code
function encodeText(text){
    let surfaceCode = generateSurfaceCode(text);
    let deepCode = generateDeepCode(surfaceCode);
    return deepCode;
}

//Generating Surface code
function generateSurfaceCode(text){
    let surfaceCode = "";

    for (let i = 0; i < text.length; i++){
        let letter = text.substring(i, i+1);
        let letterIndex = letters.indexOf(letter);
        let code = localStorage.getItem("pid").substring(letterIndex*3, letterIndex*3 + 3);
        surfaceCode += code;
    }
    return surfaceCode;
}

//Generating Deep code
function generateDeepCode(surfaceCode){
    let deepCode = "";

    for (let i = 0; i < surfaceCode.length/3; i++){
        let code = parseInt(surfaceCode.substring(i*3, i*3 + 3));
        let adder = Math.floor(Math.random() * (999 - (code + 100) + 1)) + (code + 100);
        let filler = adder - code;
        deepCode += adder + "" + filler;
    }
    return deepCode;
}

// ========== D E C O D E ========== //

//Upload file
const decoder_input_file = document.getElementById("decoder_input_file");
const decoder_input = document.getElementById("decoder_input"); //input display

if (decoder_input_file !== null){ 
    decoder_input_file.addEventListener('change', (e) =>{
        
        const file = event.target.files[0];
        if (!file) return;

        file.text().then(text => {
            decoder_input.value = text;
            e.target.value = "";
        });
    });
}

//Decode code
const decode_button = document.getElementById("decode_button");
const decoder_output = document.getElementById("decoder_output");

if (decode_button !== null) {
    decode_button.addEventListener("click", () =>{
        decoder_output.value = decodeCode(decoder_input.value);
    });
}

//Decoding code
function decodeCode(code){
    let decode = code;
    return decode;
}

// ========== P I D ========== //
const pid_button = document.getElementById("pid_button");
const pid_input = document.getElementById("pid_input");

//Load PID saved on local storage
loadSavedPid();
function loadSavedPid(){
    if (pid_input != null){
        pid_input.value = localStorage.getItem("pid");
    }
}

//Generate new PID button
if (pid_button !== null){
    pid_button.addEventListener("click", () =>{
        let pid = generatePID();
        pid_input.value = pid;
        savePID(pid);
    });
}

//Save PID on localStorage
function savePID(PID){
    localStorage.setItem("pid", PID);
}

//Generate PID
function generatePID(){

    let pid = [];
    const min = 100;
    const max = 899;

    /*
        Gerando números de 100 à 999 (inclui 999)
        Verificando e pulando repetições
        Adicionando no vetor PID
    */
    for (let i = 0; i < letters.length; i++){
        let number = Math.floor(Math.random() * (max - min + 1)) + min;
        while (pid.includes(number)){
            number = Math.floor(Math.random() * (max - min + 1)) + min
        }
        pid.push(number);
    }

    //Putting pid in a String
    pidString = "";

    for (let i = 0; i < pid.length; i++){
        pidString += pid[i];
    }

    return pidString;
}

//Copy PID button
const copy_pid_button = document.getElementById("copy_pid_button");

if (copy_pid_button !== null) {
    copy_pid_button.addEventListener("click", async () =>{
        await navigator.clipboard.writeText(pid_input.value);
        copy_pid_button.textContent = "Copiado!";
    });
}

//Download PID button
const download_pid_button = document.getElementById("download_pid_button");

if (download_pid_button !== null){

    download_pid_button.addEventListener("click", () =>{
        
        const blob = new Blob([pid_input.value], { type: 'text/plain' });

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'pid.txt';
        link.click();

        URL.revokeObjectURL(link.href);
        download_pid_button.textContent = "Baixado!";
    });
}