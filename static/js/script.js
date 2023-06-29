const btnStart=document.querySelector('.start');
const btnStop=document.querySelector('.stop');
const btnReset=document.querySelector('.reset');
const btnLock=document.querySelector('.lock');

let hrs=min=sec=ms=0,startTimer;

btnStart.addEventListener('click',()=>{

  btnStart.classList.add('start-active');
  btnStop.classList.remove('stop-active');

  startTimer=setInterval(()=>{
    ms++;//ms=ms+1;
    if(ms==100){
      sec++;
      ms=0;
    }
    if(sec==60){
      min++;
      sec=0;
    }
    if(min==60){
      hrs++;
      min=0;
    }
    updateDisplay();
  },10);
});

btnStop.addEventListener('click',()=>{
  clearInterval(startTimer);
  btnStart.classList.remove('start-active');
  btnStop.classList.add('stop-active');
});

btnReset.addEventListener('click',()=>{
  hrs=min=sec=ms=0;
  clearInterval(startTimer);
  updateDisplay();
  btnStart.classList.remove('start-active');
  btnStop.classList.remove('stop-active');
});

btnLock.addEventListener('click', () => {
  const delay = ((min*60+sec)*100)+ms
  console.log(delay)
  fetch("/api/delay", {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "ms": delay })
  })
 .then(response => response.json())
 .then(response => console.log("response:", JSON.stringify(response)))
 .catch(err => { console.log("err:", err)})
})

function updateDisplay(){
  //Formated Display
  pmin=min<10?'0'+min:min;
  psec=sec<10?'0'+sec:sec;
  pms=ms<10?'0'+ms:ms;
  //Output
  document.querySelector('.min').innerText=pmin;
  document.querySelector('.sec').innerText=psec;
  document.querySelector('.ms').innerText=pms;
}
