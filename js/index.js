// IDs de formulario REGISTRO //
let formulario_registro = document.getElementById("signup");
let input_user_nombre = document.getElementById("user_nombre");
let input_user_password = document.getElementById("user_password");

// IDs de formulario INGRESO //
let formulario_ingreso = document.getElementById("login");
let input_nombre = document.getElementById("user");
let input_password = document.getElementById("password");

//Id de boton comprobar usuario:
let btn_comprobar_usuario = document.getElementById("comprobar_usuario");
let check = document.getElementById("check_usuario");

//Guardo en variable el div NOTIFICACION:
let notificacion = document.getElementById("notificacion");

//Creo un array donde vamos a guardar todos los usuarios registrados:
let usuarios = [];

// NOTA: COMO VAMOS A TRABAJAR CON EL FORMULARIO NO TRAEMOS LOS BOTONES YA QUE UTILIZAREMOS EL SUBMIT

//Se crea las propiedades de los usuarios
class Usuarios {
    constructor(usuario,password){
        this.usuario = usuario;
        this.password = password;
    }
}

//RECUPERO usuarios en LOCALSTORAGE en caso de que hayan usuarios guardados.
//usuarios = JSON.parse(localStorage.getItem("usuarios"));
if(JSON.parse(localStorage.getItem("usuarios")) == null){
    console.log("no hay usuarios")
} else{
    usuarios = JSON.parse(localStorage.getItem("usuarios"));
}


//UTILIZO OPERADORES TERNARIOS PARA: boton comprobar usuario registrado. Funciona pero no como se esperaba, al agregar varios usuarios, se comprueba solo el ultimo que se agrega, luego si se agrega algun otro que esté registrado y no sea el último, dice que está disponible el usuario. REVISAR.
btn_comprobar_usuario.addEventListener("click",(e)=>{
    let nombre_comprobar = input_user_nombre.value;
    let buscar = usuarios.some(function(nombre){return nombre.usuario == nombre_comprobar})
    buscar == true ? Toastify({text: "Usuario ya existente, utilice otro.",duration: 2000,position: "center", style:{background:"red"}}).showToast() : Toastify({text: "Usuario disponible",duration: 2000,position: "center", style:{background:"lightgreen"}}).showToast();
});

//FORMULARIO REGISTRARSE + GUARDAR EN LOCALSTORAGE ------------------------------------
//cuando se envíe el formulario se ejecuta la siguiente función anónima:
formulario_registro.addEventListener("submit", (e) => {
    e.preventDefault(); //hacemos que no se actualice la página al hacer clic en submit.

    let nombre_comprobar = input_user_nombre.value;
    let buscar = usuarios.some(function(e){return e.usuario == nombre_comprobar})
    buscar == true ? Toastify({text: "Usuario ya existente, utilice otro.",duration: 2000,position: "center", style:{background:"red"}}).showToast() : Toastify({text: "Usuario disponible",duration: 1000,position: "center",style:{background:"lightgreen"}}).showToast();

    if(input_user_nombre.value != "" && input_user_password.value != "" && buscar != true){
        let nuevo_usuario = new Usuarios(input_user_nombre.value,input_user_password.value);

        //guardo usuario en array
        usuarios.push(nuevo_usuario);

        //SIMULO BD: guardando usuarios registrados.
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        
        //feedback usuario registrado
        Swal.fire({position: 'center',icon: 'success', title: 'Usuario registrado correctamente.', showConfirmButton: false, timer: 1500});
        console.log("usuario agregado:",usuarios)
    }else{
        //feedback completar campos
        Toastify({text: "Completar los campos, por favor.",duration: 1500,position: "center"}).showToast();
    }
});

//FORMULARIO INICIAR SESIÓN------------------------------------
//cuando se envíe el formulario se ejecura la siguiente función anónima:

formulario_ingreso.addEventListener("submit", (e)=>{
    e.preventDefault();
    check.innerHTML = "";
    //guardo los valores de los input en una variable para solo llamar las variables.
    let usuario = input_nombre.value;
    let pass = input_password.value;

    Toastify({text: "Cargando...", duration: 1000}).showToast();

    for(let user of usuarios){
        let respuesta;
        usuario == user.usuario && pass == user.password ? respuesta = true : respuesta = false;
        respuesta == true ? window.location.href = "tienda.html" : Toastify({text: "Acceso incorrecto",duration: 1000}).showToast();
    }

});


console.log("Usuarios registrados: ", usuarios)