var titulo = document.getElementById("titulo");
var comentario = document.getElementById("comentarios");
var tiempo = document.getElementById("tiempo");
var agregarDiv = document.getElementById("Agregar-div");
var aviso = document.getElementById("aviso");
var alto = document.getElementById("Alto");
var verLista = document.getElementById("ver-lista");
var lista = document.getElementById("lista");
var botonAgregar = document.getElementById("boton-agregar");
var itemsGlobal = new Array();

//Botones para mostrar tareas segun seleccion
var altoABajo = document.getElementById("alto-a-bajo");
var BajoAAlto = document.getElementById("bajo-a-alto");
var soloAlto = document.getElementById("solo-alto");
var soloMedio = document.getElementById("solo-medio");
var soloBajo = document.getElementById("solo-bajo");
var todas = document.getElementById("todas");

var coleccionTareas = {
  altos: [],
  medios: [],
  bajos: [],

}

var primero = document.getElementById("option");
var seccionLista = document.getElementById("seccion-lista");
verLista.addEventListener("click", function () {
  agregarDiv.classList.toggle("ocultar-agregar");
  lista.classList.toggle("ver-lista");
  seccionLista.classList.toggle("ver-contenedor-item")
})

botonAgregar.addEventListener("click", () => {
  validar();
  //FUNCION PARA ORDENAR
  Ordenar();

})
//Funcion para validar campos de formulario
function validar() {
  if (titulo.value === "" || comentario.value === "" || tiempo.value === "") {
    titulo.classList.toggle("campo-incorrecto");
    comentario.classList.toggle("campo-incorrecto");
    tiempo.classList.toggle("campo-incorrecto");
    aviso.classList.add("campos-incorrectos");
    titulo.classList.remove("campo-neutro");
    comentario.classList.remove("campo-neutro");
    tiempo.classList.remove("campo-neutro");
  } else if (titulo.value != "" && comentario.value != "" && tiempo.value != "") {
    aviso.classList.remove("campos-incorrectos");
    titulo.classList.remove("campo-incorrecto");
    comentario.classList.remove("campo-incorrecto");
    tiempo.classList.remove("campo-incorrecto");
    titulo.classList.add("campo-neutro");
    comentario.classList.add("campo-neutro");
    tiempo.classList.add("campo-neutro");
    //Elementos creados para ingresar a la lista
    var divCreado = document.createElement("div");
    var divhoraTipo = document.createElement("div");
    var divInfo = document.createElement("div");
    var phora = document.createElement("p");
    var tipo = document.createElement("p");
    var h1 = document.createElement("h1");
    var h3 = document.createElement("h3");
    var objetoTarea = {
      objet: "",
      hora: 0,
    }
    asignarvalores();
    crearElementos();

    //Limpiar campos despues de agregarlo
    titulo.value = "";
    comentario.value = "";
    tiempo.value = "";
  }

  verificarcampo(titulo);
  verificarcampo(comentario);
  verificarcampo(tiempo);

  function asignarvalores() {
    h1.innerText = titulo.value;
    h3.innerText = comentario.value;
    phora.innerText = tiempo.value;

    //Verificando cual de los RadioButton esta seleccionado
    for (var i = 0; i < document.f1.tipo.length; i++) {
      if (document.f1.tipo[i].checked) {
        if (document.f1.tipo[i].value == "Alto") {
          tipo.innerText = "Alto";
          t = "Alto";

          divhoraTipo.classList.add("Alto");
        } else if (document.f1.tipo[i].value == "Medio") {
          tipo.innerText = "Medio";
          t = "Medio";
          divhoraTipo.classList.add("Medio");
        } else if (document.f1.tipo[i].value == "Bajo") {
          tipo.innerText = "Bajo";
          t = "Bajo";
          divhoraTipo.classList.add("Bajo");
        }

      }

    }
  }

  //Funcion para crear elementos
  function crearElementos() {
    divCreado.classList.add("creado");
    divhoraTipo.classList.add("hora-y-tipo");
    divInfo.classList.add("info");
    divhoraTipo.appendChild(phora);
    divhoraTipo.appendChild(tipo);
    divInfo.appendChild(h1);
    divInfo.appendChild(h3);
    divCreado.appendChild(divhoraTipo);
    divCreado.appendChild(divInfo);
    //lista.appendChild(divCreado);
    itemsGlobal.push(divCreado);
    objetoTarea.objet = divCreado;
    objetoTarea.hora = parseFloat(tiempo.value);
    lista.appendChild(divCreado);

    if (t == "Alto") {
      coleccionTareas.altos.push(objetoTarea);

    } else if (t == "Medio") {
      coleccionTareas.medios.push(objetoTarea);

    } else if (t == "Bajo") {

      coleccionTareas.bajos.push(objetoTarea);
    }
  }

  //Funcion para ver si el campo no esta vacio.
  function verificarcampo(item) {
    if (item.value === "") {
      item.classList.add("campo-incorrecto");
      item.classList.remove("campo-correcto");
    } else {
      item.classList.add("campo-correcto");
      item.classList.remove("campo-incorrecto");
    }
  }
}

//Mostrar solo tareas de alta prioridad
soloAlto.addEventListener("click", () => {
  if (coleccionTareas.altos.length == 0) {
    alert("No hay tareas de prioridad alta agregadas");
  }
  lista.innerText = "";

  for (var item1 in coleccionTareas.altos) {
    lista.appendChild(coleccionTareas.altos[item1].objet);

  }
})
//Mostrar solo tareas de media prioridad
soloMedio.addEventListener("click", () => {
  if (coleccionTareas.medios.length == 0) {
    alert("No hay tareas de prioridad media agregadas");
  }
  lista.innerText = "";

  for (var item1 in coleccionTareas.medios) {
    lista.appendChild(coleccionTareas.medios[item1].objet);

  }
})
//Mostrar solo tareas de baja prioridad
soloBajo.addEventListener("click", () => {
  if (coleccionTareas.bajos.length == 0) {
    alert("No hay tareas de prioridad baja agregadas");
  }
  lista.innerText = "";

  for (var item1 in coleccionTareas.bajos) {
    lista.appendChild(coleccionTareas.bajos[item1].objet);

  }
})
//Mostrar todas las tareas ingresadas
todas.addEventListener("click", () => {
  lista.innerText = "";
  for (var item in itemsGlobal) {
    lista.appendChild(itemsGlobal[item]);
  }
})
//Mostrar tareas de altas a bajas
altoABajo.addEventListener("click", () => {
  lista.innerText = "";

  for (var item1 in coleccionTareas.altos) {
    lista.appendChild(coleccionTareas.altos[item1].objet);
  }
  for (var item1 in coleccionTareas.medios) {
    lista.appendChild(coleccionTareas.medios[item1].objet);
  }
  for (var item1 in coleccionTareas.bajos) {
    lista.appendChild(coleccionTareas.bajos[item1].objet);
  }
})
//Mostrar tareas de bajas a altas
BajoAAlto.addEventListener("click", () => {
  lista.innerText = "";

  for (var item1 in coleccionTareas.bajos) {
    lista.appendChild(coleccionTareas.bajos[item1].objet);
  }
  for (var item1 in coleccionTareas.medios) {
    lista.appendChild(coleccionTareas.medios[item1].objet);
  }
  for (var item1 in coleccionTareas.altos) {
    lista.appendChild(coleccionTareas.altos[item1].objet);
  }
})

//FUNCION PARA ORDENAR LISTA
function Ordenar() {
  //ORDENAR TODAS LAS LISTAS
  coleccionTareas.altos.sort((a, b) => a.hora - b.hora);
  coleccionTareas.medios.sort((a, b) => a.hora - b.hora);
  coleccionTareas.bajos.sort((a, b) => a.hora - b.hora);

}