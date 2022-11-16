function validateForm() {
    var name =  document.getElementById('name').value;
    if (name == "") {
        document.querySelector('.status').innerHTML = "Nombre no puede estar vacio";
        return;
    }
    var email =  document.getElementById('email').value;
    if (email == "") {
        document.querySelector('.status').innerHTML = "Email no puede estar vacio";
        return;
        
    } else {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(email)){
            document.querySelector('.status').innerHTML = "Email con formato incorrecto";
            return;
        }
       
        
    }
    var subject =  document.getElementById('subject').value;
    if (subject == "") {
        document.querySelector('.status').innerHTML = "Asunto no puede estar vacio";
        return;
    }
    var message =  document.getElementById('message').value;
    if (message == "") {
        document.querySelector('.status').innerHTML = "Mensaje no puede estar vacio";
        return;
    }
    document.querySelector('.status').innerHTML = "Enviando...";
  }

  function getAge(birthDateString) {
    var today = new Date();
    var birthDate = new Date(birthDateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

  function validateFormRegistro() {
    var email =  document.getElementById('email').value;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(email)){
        document.querySelector('.status').innerHTML = "Email con formato incorrecto";
        return false;
    }
    var dni =  document.getElementById('dni').value;
    if(dni.length<7){
        document.querySelector('.status').innerHTML = "Dni incorrecto";
        return false;
    }
    var contra =  document.getElementById('contra').value;
    if(contra.length<8 || contra.length>8){
        document.querySelector('.status').innerHTML = "Contraseña debe tener 8 digitos";
        return false;
    }
    let re1 = /[a-z]{1,6}/
    let re2 = /[0-9]{2,7}/ //tiene que contener 2 numeros y al menos una letra
    if(!re1.test(contra) || !re2.test(contra)){
        document.querySelector('.status').innerHTML = "Contraseña debe contener al menos dos numeros y una letra";
        return false;
    }
    let fecha = document.getElementById('fecha').value;
    if(getAge(fecha)<18){
        document.querySelector('.status').innerHTML = "Debe ser mayor de 18 años para registrar una cuenta";
        return false;
    }
    return true;
  }