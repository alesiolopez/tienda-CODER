//VARIABLES GLOBALES
let total = 0;
let stock_productos = [];
let carrito = [];

//Variables de elementos:
let mostrar_carrito = document.getElementById("contenedor-carrito");
let contenedor_div = document.getElementById('contenedor-productos');

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

//Productos que tenga mayores a 2 unidades incluidos, que se muestren en el template
/* function mostrar_stock(producto){
    return producto.stock <10
} */

//Carga de productos. Instanciando productos. El 4to producto tiene stock = 0 para probar condición if.
stock_productos.push(new Productos(0,"Samsung Galaxy S22 Ultra", 332000, "Celulares", "Celular Alta Gama",10,"img/articulos/samsung_s22_ultra.jpg"));
stock_productos.push(new Productos(1,"Samsung Galaxy S22+", 273000, "Celulares", "Celular Alta Gama",9,"img/articulos/samsung_s22_plus.jpg"));
stock_productos.push(new Productos(2,"Samsung Galaxy S21+", 332000, "Celulares", "Celular Alta Gama",7,"img/articulos/samsung_s21_plus.jpg"));
stock_productos.push(new Productos(3,"Samsung Galaxy S20", 273000, "Celulares", "Celular Alta Gama",0,"img/articulos/samsung_s20.jpg"));
stock_productos.push(new Productos(4,"Samsung Galaxy S10+", 332000, "Celulares", "Celular Alta Gama",10,"img/articulos/samsung_s10_plus.jpg"));
stock_productos.push(new Productos(5,"Samsung Galaxy S9+", 273000, "Celulares", "Celular Alta Gama",10,"img/articulos/samsung_s9_plus.jpg"));
stock_productos.push(new Productos(5,"Samsung Galaxy S9", 200000, "Celulares", "Celular Alta Gama",14,"img/articulos/samsung_s9.webp"));

//pruebas
for(let art of stock_productos){
    console.log("nombre:", art.nombre);
    console.log("cantidad:", art.stock);
    console.log("img:", art.img)
    console.log("---------------------------");
}
//------------------------

//Agregar producto a carrito
function agregar_producto_carrito(producto){
    let fila = document.createElement("tr");
    let tabla = document.getElementById('thead');
    //Se crea la fila para agregar al producto:
    fila.innerHTML = `<td><img src='${producto.img}' alt="img_articulo_carrito"></td>
                    <td>${producto.nombre}</td>
                    <td>${producto.cantidad}</td>
                    <td>${producto.precio}</td>
                    <td><button class="btn-danger borrar_elemento" id="borrar_elemento">X</button></td>`;
    //Se enlaza:
    tabla.append(fila);

    //funcion para borrar la fila:
    let btn_borrar_elemento = document.getElementById('borrar_elemento');
    btn_borrar_elemento.addEventListener("click", function(){
        tabla.removeChild(fila);
    })
} 




//CARGANDO PRODUCTOS EN LA PÁGINA AUTOMÁTICAMENTE. CON BOTON AGREGAR E IMÁGEN

for(let producto of stock_productos){
    let div = document.createElement('div');
    div.id = producto.codigo;
    div.className = "articulos";
    div.innerHTML = `
    <img src="${producto.img}"> <br>
    ${producto.nombre} <br>
    Precio: $ ${producto.precio} <br>
    `;
    contenedor_div.append(div);

    let btn_carrito = document.createElement('button');
    btn_carrito.innerText = "Agregar";
    btn_carrito.className = "btn-agregar btn btn-primary"
    div.append(btn_carrito);
    btn_carrito.addEventListener("click", agregar_producto_carrito);
}

/* let btn_agregar = document.querySelectorAll(".btn-agregar"); */



//tomamos el evento click del botón "CARRITO"
let boton_mostrar_carrito = document.querySelector("#boton-mostrar-carrito");

boton_mostrar_carrito.addEventListener("click", function(){
    let carrito = document.getElementById("contenedor-carrito");

    if(carrito.style.display != "none"){
        carrito.style.display = "none";
    }else{
        carrito.style.display = "block";
    }
})

//--------------------------------------------------