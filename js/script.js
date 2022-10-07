//VARIABLES GLOBALES
const total = 0;
const stock_productos = [];
const carrito = [];

//Variables de elementos:
const mostrar_carrito = document.getElementById("contenedor-carrito");
const contenedor_div = document.getElementById('contenedor-productos');
let tabla = document.getElementById('tbody');

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
stock_productos.push(new Productos(6,"Samsung Galaxy S9", 200000, "Celulares", "Celular Alta Gama",14,"img/articulos/samsung_s9.webp"));

//resolver para poder eliminar de carrito los elementos con sus índices.
let map_prod = stock_productos.map(producto => producto.nombre).indexOf("Samsung Galaxy S9+");
console.log("Con map encuentro el index:", map_prod)
//------------------------


//CARGANDO PRODUCTOS EN LA PÁGINA AUTOMÁTICAMENTE. CON BOTON AGREGAR E IMÁGEN
document.addEventListener("DOMContentLoaded",()=>{
    cargar_productos();
})

function cargar_productos(){
    stock_productos.forEach(function(producto){
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
        btn_carrito.id = producto.codigo;
        btn_carrito.className = "btn-agregar btn btn-primary"
        div.append(btn_carrito);
        btn_carrito.addEventListener("click", agregar_producto_carrito);
    })
}


//Agregar producto a carrito


function agregar_producto_carrito(e){
    let prod = e.target.id;
    console.log("ID prod:", prod)
    carrito.push(stock_productos[prod]);
    //Notificacion de AGREGADO AL CARRITO. AGREGAR
    Toastify({text: "Se agregó al carrito",duration: 2000,position: "center"}).showToast();
    console.log("nombre prod: ", carrito[prod].nombre)
    let fila = document.createElement("tr");
    let btn_borrar = document.createElement('button');

    //Se crea la fila para agregar al producto:
    fila.innerHTML = `<td><img src="${carrito[prod].img}" alt="img_artículo"></td>
                    <td>${carrito[prod].nombre}</td>
                    <td>${carrito[prod].stock}</td>
                    <td>${carrito[prod].precio}</td>`;
    //Se enlaza:
    tabla.append(fila);

    //boton para borrar la fila y del array carrito:
    btn_borrar.innerText = "X";
    btn_borrar.onclick = ()=>{
        //busco el indoce del producto en el array carrito.
        let index_prod = carrito.map(producto => producto.nombre).indexOf(carrito[prod].nombre);

        console.log("indice de prod eliminado:", index_prod);
        //Elimino el elemento en el array.
        carrito.splice(index_prod,1);

        //Notificacion de eliminado. AGREGAR
        Toastify({text: "Se eliminó del carrito.",duration: 2000,position: "center", style:{background:"red"}}).showToast()
        console.log(carrito);
        tabla.removeChild(fila);
    };
    btn_borrar.className ="btn-danger";
    //Se enlaza:
    fila.append(btn_borrar);

    console.log(carrito)

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

//PRUEBAS:
/* console.log(stock_productos[0].stock)

for(let art of stock_productos){
    console.log("nombre:", art.nombre);
    console.log("cantidad:", art.stock);
    console.log("img:", art.img)
    console.log("---------------------------");
} */