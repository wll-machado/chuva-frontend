// Side Menu Button ACtive Effect

let menu = document.querySelectorAll('.menu-item')

menu.forEach((item) => {

  item.addEventListener('click', function() {

    let botao = document.querySelectorAll('.menu .menu-item.active');

    botao.length != 0 ? botao[0].classList.remove("active") : botao.length;

    item.classList.add('active');

  });

});


// Resume Expanded Effect

const resume = document.querySelector(".resume");
const discussions = document.querySelector(".discussions")
const footer = document.querySelector(".footer");


resume.addEventListener("click", function(){
  resume.classList.toggle("expand");
  discussions.classList.toggle("expand");
  footer.classList.toggle("after");

})


// New Topic Event

const partition = document.querySelector(".partition");
const newTopic = document.querySelector(".new-topic")

newTopic.addEventListener("click", function(){
  partition.style.display = "none";
  form.style.display = "block";
})

// Form 

const form = document.querySelector(".form");

form.addEventListener("submit", function(e){
  e.preventDefault();
});

// Data Base

let banco = [
  { 
    'assunto': 'resumo do livro',
    'conteudo': 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum'
  },
  { 
    'assunto': 'autografo',
    'conteudo': 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum'
  },
  { 
    'assunto': 'premier',
    'conteudo': 'lançamento do novo livro best seller'
  }

];

const getBanco = ()=> JSON.parse(localStorage.getItem('comentarios')) ?? [];
const setBanco = (banco)=> localStorage.setItem('comentarios', JSON.stringify(banco)) ;

// topic 

const criarItem = (assunto , conteudo , index)=> {

    const item = document.createElement('div');
    item.classList.add('question');
    item.setAttribute("data-index", `${index}`);
    item.innerHTML = `
    <div class="question-title" data-index=${index}>${assunto}</div>
    <span class="autor">Autor</span>
    <h3 class="question-content">${conteudo}</h3>
    <div class="question-more-details" onclick="resposta(${index})" data-index=${index}></div>
    <div class="question-fav"></div>
    <div class="like">1 like</div>
    <div class="answer">1 resposta</div>
    <button type="button" class="delete" data-index=${index}>x</button>
    <div class="resposta" data-index=${index}>
      <div class="resposta1"></div>
      <div class="resposta2"></div>
      <div class="resposta3"></div>
      <div class="resposta4"></div>
    </div>
    `

    document.getElementById('container').appendChild(item)
}

// Get topic values

const enviar = document.getElementById('enviar');
const topicSend = document.querySelector('.topic-send');
const waiting = document.querySelector('.waiting');

enviar.addEventListener('click', function(){

  var input = document.querySelector("#question-title").value;
  var input2 = document.querySelector("#question-content").value;
  
  const banco = getBanco();
  banco.push({'assunto': input , 'conteudo': input2})
  setBanco(banco);
  atualizarTela();
  document.querySelector("#question-title").value = "";
  document.querySelector("#question-content").value = "";

  form.style.display = "none";
  topicSend.style.display = "block";
  waiting.style.display = "block";
 
  waiting.animate([
    // keyframes
    { opacity: 1 },
    { opacity: 0 }

  ], {
    // timing options
    duration: 4000,
    easing: "linear",
    iterations: 1
  });

  setTimeout(()=>{
    waiting.style.display = "none";

  },4000)
})

// create topic

const createTopic = document.querySelector('.create-topic');

createTopic.addEventListener('click', ()=>{
  const topicSend = document.querySelector('.topic-send');
  topicSend.style.display = "none";
  form.style.display = "block";

})

// remove item 

const removeItem = (index)=>{
  const banco = getBanco();
  banco.splice(index,1);
  setBanco(banco);
  atualizarTela();
}

const clickItem = (e)=>{
  const element = e.target;
  if(element.type === 'button'){
    const index = element.dataset.index;
    removeItem(index);
  }
}

document.getElementById('container').addEventListener('click', clickItem)

// Resposta 
function resposta(indice){
  const moreResponse = document.querySelectorAll(".resposta");
  moreResponse.forEach(more=>{
      
      if(more.dataset.index == indice){
        more.classList.toggle("show");
      }
    
  })
}


// Update Questions

const limparTela = ()=> {
  const container = document.getElementById('container')
  while(container.firstChild){
    container.removeChild(container.lastChild);
  }
}

const atualizarTela = ()=> {
  limparTela();
  const banco = getBanco();
  banco.forEach( (item, index) => criarItem(item.assunto, item.conteudo , index))
}

atualizarTela();
