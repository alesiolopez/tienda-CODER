//VARIABLES GLOBALES
const total = 0;
const stock_productos = [];
const carrito = [];

//Variables de elementos:
const mostrar_carrito = document.getElementById("contenedor-carrito");
const contenedor_div = document.getElementById('contenedor-productos');
const table = document.getElementById('table')
const tabla = document.getElementById('tbody');
const btn_comprar_carrito = document.getElementById("btn_comprar");
const btn_eliminar_carrito = document.getElementById("");
const ver_suma_precio_total = document.querySelector('.suma_precio');

//Oculto carrito cada vez que inicia la página.
mostrar_carrito.style.display = "none";

class Productos{
    constructor(codigo, nombre, precio, categoria, especificaciones,stock,img){
        this.codigo = codigo;
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
        this.especificaciones = especificaciones;
        this.stock = stock;
        this.img = img;
    }

}

//Carga de productos. Instanciando productos.
stock_productos.push(new Productos(0,"Samsung Galaxy S22 Ultra", 332000, "Celulares", "Celular Alta Gama",10,"img/articulos/samsung_s22_ultra.jpg"));
stock_productos.push(new Productos(1,"Samsung Galaxy S22+", 273000, "Celulares", "Celular Alta Gama",9,"img/articulos/samsung_s22_plus.jpg"));
stock_productos.push(new Productos(2,"Samsung Galaxy S21+", 332000, "Celulares", "Celular Alta Gama",7,"img/articulos/samsung_s21_plus.jpg"));
stock_productos.push(new Productos(3,"Samsung Galaxy S20", 273000, "Celulares", "Celular Alta Gama",0,"img/articulos/samsung_s20.jpg"));
stock_productos.push(new Productos(4,"Samsung Galaxy S10+", 332000, "Celulares", "Celular Alta Gama",10,"img/articulos/samsung_s10_plus.jpg"));
stock_productos.push(new Productos(5,"Samsung Galaxy S9+", 273000, "Celulares", "Celular Alta Gama",10,"img/articulos/samsung_s9_plus.jpg"));
stock_productos.push(new Productos(6,"Samsung Galaxy S9", 200000, "Celulares", "Celular Alta Gama",14,"img/articulos/samsung_s9.webp"));


//------------------------


//CARGANDO PRODUCTOS EN LA PÁGINA AUTOMÁTICAMENTE. CON BOTON AGREGAR E IMÁGEN
document.addEventListener("DOMContentLoaded",()=>{
    bienvenida();
    cargar_productos();
})

function cargar_productos(){
    stock_productos.forEach(function(producto){
        let div = document.createElement('div');
        div.id = producto.codigo;
        div.className = "articulos";
        div.innerHTML = `
            <img src="${producto.img}" class="imagen"> <br>
            <span class="titulo">${producto.nombre}</span> <br>
            <label>Precio: <span class="precio">${producto.precio}</span></label><br>
        `;
        contenedor_div.append(div);
    
        let btn_carrito = document.createElement('button');
        btn_carrito.innerText = "Agregar";
        btn_carrito.id = producto.codigo;
        btn_carrito.className = "btn-agregar btn btn-primary"
        div.append(btn_carrito);
        btn_carrito.addEventListener("click", agregar_producto_carrito);
    })
}

//BIENVENIDA
function bienvenida(){
    Swal.fire({position: 'center',
    title: 'Hola! Bienvenido a la tienda! =D.', 
    showConfirmButton: true, 
    timer: 6000,
    timerProgressBar: true});
}

//Agregar/eliminar producto a carrito

function agregar_producto_carrito(e){
    const button = e.target;
    const item = button.closest('.articulos');
    const item_id = button.id;
    
    const item_nombre = item.querySelector('.titulo').textContent;
    const item_imagen = item.querySelector('.imagen').src;
    const item_precio = item.querySelector('.precio').textContent;

    agregar_ver_carrito(item_nombre,item_imagen, item_precio, item_id);
} 

function agregar_ver_carrito(item_nombre,item_imagen, item_precio, item_id){
    const ver_carrito_fila = document.createElement('tr');
    ver_carrito_fila.className = "ver_carrito_fila";
    ver_carrito_fila.innerHTML = `
            <td><img src=${item_imagen} alt="imagen_producto"></td>
            <td><span class="nombre_producto_item">${item_nombre}</span></td>
            <td>Cantidad</td>
            <td><span>${item_precio}</span></td>
            <td><button class="btn_borrar">X</button></td>
    `;
    tabla.append(ver_carrito_fila)
     
    //Se configura el boton borrar item:
    let botones_borrar = document.querySelectorAll(".btn_borrar");
    //todos estos botones se toman con un for of:
    for(let boton of botones_borrar){
        boton.addEventListener("click", borrar_producto);
    }

    //AGREGAMOS AL ARRAY CARRITO llevando el parámetro "item_id" a la funcion agregar_producto_al _array_carrito. Así agrega el producto seleccionado al array carrito.
    agregar_producto_al_array_carrito(item_id);

    //configuramos la suma de los precios de productos
    let sum = 0;
    for(item of carrito){
            sum += item.precio;
    }
    //se muestra, feedback
    ver_suma_precio_total.textContent ="$" + sum;

    //notificacion
    Toastify({text: "Se agregó al carrito",duration: 1000,position: "center"}).showToast()
}

//declaro variable indice para la funcion borrar_producto
let indice;
function borrar_producto(e){
    //borra de a un elemento del DOM
    let nombre_producto_item = document.querySelector('.nombre_producto_item').textContent;
    let item_a_borrar = e.target.parentNode.parentNode; //busco el elemento que quiero eliminar
    item_a_borrar.remove();

    //resolver para poder eliminar de carrito los elementos con sus índices.
    setInterval(indice = indiceFuncion(nombre_producto_item), 500);
    carrito.splice(indice,1);
    //configuramos la resta de los precios de productos
    let sum = 0;
    for(item of carrito){
            sum += item.precio;
    }
    //se muestra, feedback la suma actualizada despues de eliminar producto/s
    ver_suma_precio_total.textContent = sum;

    //Notificacion de eliminado
    Toastify({text: "Se eliminó del carrito.",duration: 1500,position: "center", style:{background:"lightblue"}}).showToast()
}

//Funcion para buscar indice en array carrito:
function indiceFuncion(nombre_producto_item){
    let map_prod = carrito.map(producto => producto.nombre).indexOf(nombre_producto_item);
    return map_prod;
}

//Funcion para agregar producto al array carrito:
function agregar_producto_al_array_carrito(item_id){
carrito.push(stock_productos[item_id]); //se agrega el elemento seleccionado según el id definido en cada button previamente.
}

//Configuramos el boton comprar:
btn_comprar_carrito.addEventListener("click",comprar_carrito);
function comprar_carrito(e){
    let cantidad_elementos = carrito.length;
    if(cantidad_elementos == 0){
        Toastify({text: "Agregar productos al carrito para comprar.",duration: 1500,position: "center", style:{color: "black",background:"lightblue",margin:"200px"}}).showToast()
    }else{
        carrito.splice(0,cantidad_elementos); //eliminamos todos los elementos del array despues de comprar. OK
        let ver_carrito_fila = document.querySelector('.ver_carrito_fila')
        tabla.remove(); //Eliminamos el feedback del carrito. REVISAR por qué no borra todos los elementos del DOM
        
        ver_suma_precio_total.textContent = "$0"; // feedback del precio total
        Swal.fire({position: 'center',icon: 'success', title: 'Compraste todo el carrito exitosamente! =D Gracias por su compra.', showConfirmButton: true, timer: 5000,timerProgressBar: true});
    }
}

//Boton "Eliminar productos"
let btn_eliminar_prod = document.getElementById('btn_eliminar_total_carrito');
btn_eliminar_prod.addEventListener('click',()=>{
    if(carrito.length != 0){
        Swal.fire({
            title: '¿Estás seguro de eliminar todos los artículos del carrito? =|',
            text: "No puedes revertir esta acción! =O",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, limpiar carrito!'
          }).then((result) => {
            if (result.isConfirmed) {
                carrito.splice(0,carrito.length); //eliminamos todos los elementos del array despues de comprar. OK
                tabla.remove(); //Eliminamos el feedback del carrito. REVISAR por qué no borra todos los elementos del DOM
                ver_suma_precio_total.textContent = "$0"; // feedback del precio total
              Swal.fire(
                'Carrito limpio! =D',
                'Todos los artículos fueron eliminados del carrito correctamente.',
                'success'
              )
            }
          })
    }else{
        Toastify({text: "Agregar productos al carrito para comprar.",duration: 1500,position: "center", style:{color: "black",background:"lightblue",margin:"200px"}}).showToast();
    }
});

//tomamos el evento click del botón "VER CARRITO"
let boton_mostrar_carrito = document.querySelector("#boton-mostrar-carrito");

boton_mostrar_carrito.addEventListener("click", function(){
    let carrito = document.getElementById("contenedor-carrito");

    if(carrito.style.display != "none"){
        carrito.style.display = "none";
    }else{
        carrito.style.display = "block";
    }
})