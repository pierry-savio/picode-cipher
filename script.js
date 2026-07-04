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
const encoder_input_file = document.getElementById("encoder_input_file");
const encoder_input = document.getElementById("encoder_input"); //input display

if (encoder_input_file !== null){
    encoder_input_file.addEventListener('change', (e) =>{
        
        const file = event.target.files[0];
  
        if (!file) return;

        const reader = new FileReader();

        reader.onload = function(e) {
            const content = e.target.result;
            encoder_input.value = content;
        };

        reader.onerror = function(e) {
            console.error('Erro ao ler o arquivo:', e);
        };

        reader.readAsText(file);
    });
}

// ========== D E C O D E ========== //
const decoder_input_file = document.getElementById("decoder_input_file");
const decoder_input = document.getElementById("decoder_input"); //input display

if (decoder_input_file !== null){
    decoder_input_file.addEventListener('change', (e) =>{
        
        const file = event.target.files[0];
  
        if (!file) return;

        const reader = new FileReader();

        reader.onload = function(e) {
            const content = e.target.result;
            decoder_input.value = content;
        };

        reader.onerror = function(e) {
            console.error('Erro ao ler o arquivo:', e);
        };

        reader.readAsText(file);
    });
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
        let formatedPID = formatPID(generatePID());
        pid_input.value = formatedPID;
        savePID(formatedPID);
    });
}

//Save PID on localStorage
function savePID(PID){
    localStorage.setItem("pid", PID);
}

//Format PID
function formatPID(PID){
    let formatedPID = "";

    for (let i = 0; i < PID.length; i++){
        formatedPID += PID[i];
    }
    return formatedPID;
}

//Generate PID
function generatePID(){

    const PID = [];
    const min = 1;
    const max = letters.length;

    /*
        Gerando números de 001 à 122 (inclui 122)
        Verificando e pulando repetições
        Adicionando no vetor PID
    */
    for (let i = 0; i < letters.length; i++){

        let number = Math.floor(Math.random() * (max - min + 1)) + min;
        while (PID.includes(number)){
            number = Math.floor(Math.random() * (max - min + 1)) + min
        }
        PID.push(number);
    }

    for (let i = 0; i < PID.length; i++){
        if (PID[i] < 10){
            PID[i] = "00" + PID[i];
        }
        else if (PID[i] >= 10 && PID[i] < 100){
            PID[i] = "0" + PID[i];
        }
        else{
            PID[i] = String(PID[i]);
        }
    }
    return PID;
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