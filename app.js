//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);


//Functions
function addTodo(event) {
    event.preventDefault(); // usamos o preventDefault para impedir que a pagina dê refresh quando clicamos no button

    // Todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // Create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo)

    // ADD TODO TO LOCALSTORAGE
    saveLocalTodos(todoInput.value);//este valor vai para o array todos no localstorage (ver linha 95)

    // Check Mark Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    // Check delete Button
    const deletedButton = document.createElement('button');
    deletedButton.innerHTML = '<i class="fas fa-trash"></i>';
    deletedButton.classList.add("delete-btn");
    todoDiv.appendChild(deletedButton);
    // Agora vamos dar append à tag ul com class de todo-list para ficar dentro linha 25 hml
    todoList.appendChild(todoDiv);

    // Clear todo input value
    todoInput.value = "";
}

function deleteCheck(e) {
   const item = e.target; //identifica o item que estamos a clicar

   //DELETE
   if(item.classList[0] === 'delete-btn') {
       const todo = item.parentElement; // em vez de remover o proprio item removemos o parent desse item porque se nao removia o proprio botao delete
    //    todo.remove();
       //animation (primeiro acontece a animation e so depois o remove)
       todo.classList.add("fall");
       removeLocalTodos(todo); // remove da localstorage
       todo.addEventListener("transitionend", function(){ // transitionend event permite que o .remove ocorra so depois da transision
           todo.remove();
       });
       
   }

   // Check complete
   if(item.classList[0] === 'complete-btn') {
       const todo = item.parentElement;
       todo.classList.toggle('completed'); // ao clicar no complete btn adicionamos uma class completed ao parent todo ou seja ao todoDiv
   }
}

//Filter
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function(todo){ // com o forEach temos acesso a cada um dos todo
    switch(e.target.value){ //e.target.value é o valor de cada option all,completed,uncompleted
      case "all":
          todo.style.display = 'flex'; //no css temos display flex e por isso mantemos
          break;
      case "completed":
          if(todo.classList.contains("completed")){
              todo.style.display = 'flex';
          }else{
              todo.style.display = "none";
          }
          break;
      case "uncompleted":
          if(!todo.classList.contains('completed')) {//not contains
              todo.style.display = 'flex'; 
          }else{
              todo.style.display ="none";
          } 
          break;
    }
  })
}

// LOCALSTORAGE
function saveLocalTodos(todo){
   // verificar se ja tenho dados guardados na localstorage
   let todos;
   if(localStorage.getItem('todos') === null){ //se for null cria um array vazio
       todos = [];
   }else{
       todos = JSON.parse(localStorage.getItem('todos'));//se sim vamos buscar o array que ja la esta
   }
   todos.push(todo); // puxamos para o array
   localStorage.setItem('todos', JSON.stringify(todos)); // e mandamos para o local storage (o array todos)
}

// funcao para obter os valores da localstorage
function getTodos(){ //temos de chamar a funcao nos eventlisteners
    let todos;
   if(localStorage.getItem('todos') === null){ 
       todos = [];
   }else{
       todos = JSON.parse(localStorage.getItem('todos'));
   }
   todos.forEach(function(todo){
        // Todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // Create li
    const newTodo = document.createElement('li');
    // newTodo.innerText = todoInput.value;// o que precisamos agora é do valor da local storage e nao do input
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo)

    // Check Mark Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    // Check delete Button
    const deletedButton = document.createElement('button');
    deletedButton.innerHTML = '<i class="fas fa-trash"></i>';
    deletedButton.classList.add("delete-btn");
    todoDiv.appendChild(deletedButton);
    // Agora vamos dar append à tag ul com class de todo-list para ficar dentro linha 25 hml
    todoList.appendChild(todoDiv);
   })
}


function removeLocalTodos(todo){
    let todos;
   if(localStorage.getItem('todos') === null){ 
       todos = [];
   }else{
       todos = JSON.parse(localStorage.getItem('todos'));
   }
   console.log(todo.children[0].innerText); //assim estamos a conseguir ir buscar o texto do sitio onde clicamos
   // todo é a div inteira, children[0] é o primeiro elemento do div que é li
   // .innerText vai buscar o valor que esta no li no mento

   const todoIndex = todo.children[0].innerText;
   todos.splice(todos.indexOf(todoIndex), 1); //todos.indexOf(todoIndex) dá-me a posicao do elemento que cliquei exemplo todos.indexOf(apple) dá me a posicao de onde esta a apple
   // exemplo: donut esta em terceiro (aparece: apple, chocolate, donut) vai me dar a posicao 2
   // ao usar o splice estou a dizer para remover esse terceiro elemento ou o elemento que clicamos
   // todos.indexOf(todoIndex) (de que posicao queremos remover o elemento)
   // e o segundo argumento (,1) é how many do you want to remove

   localStorage.setItem('todos', JSON.stringify(todos));
}

