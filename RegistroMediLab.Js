let RegistroUsuario = [{
    id: uuid.v4(),
    DNI:42425610,
    nombreyApe:"Arce Facundo",
    Email:"ArceFacundoSebastian@hotmail.com",
    contraseña:"MediLab123",
    Categoria:"Administrador",
    Matricula:"NotMedic",
    CodigoA:"FSA-2022-AFS5055"
}]

let categoria = "";

function CateHidden(){
    if (document.getElementById('RP').checked == true){
        categoria = document.getElementById('RP').value
        document.getElementById('MatriLabel').hidden = true;
        document.getElementById('MatriDiv').hidden = true;
        document.getElementById('CodLabel').hidden = true;
        document.getElementById('CodDiv').hidden = true;
    }else{
        if (document.getElementById('RM').checked == true){
            categoria = document.getElementById('RM').value
            document.getElementById('MatriLabel').hidden = false;
            document.getElementById('MatriDiv').hidden = false;

            document.getElementById('CodLabel').hidden = true;
            document.getElementById('CodDiv').hidden = true;
        }else{
            if (document.getElementById('RA').checked == true){
                categoria = document.getElementById('RA').value
                document.getElementById('MatriLabel').hidden = true;
                document.getElementById('MatriDiv').hidden = true;
                document.getElementById('CodLabel').hidden = false;
                document.getElementById('CodDiv').hidden = false;
            }else{
                alert("No selecciono la categoria")
                return false
            }
        }
    }
}

function GuardarRegistro(){
    let DNI = document.getElementById('DNI').value 
    let NomYApe = document.getElementById('AYP').value 
    let Email = document.getElementById('E-mail').value 
    let Contra = document.getElementById('Contraseña').value
    let Contra2 = document.getElementById('Contraseña2').value

    let Matricula = document.getElementById('Matricula').value
    let CodigoA = document.getElementById('CodigoA').value

    alert("DNI :" + DNI + " NOM: " + NomYApe + " Email: " + Email + " Contra: " + Contra + " Contra2: " + Contra2 + " Cate: " + categoria + " Matricu: " + Matricula + " Codigo: " + CodigoA)
    if (Contra != Contra2){
        alert("Las contraseñas no son iguales")
        return false
    }
    if(validarFormulario(DNI, NomYApe, Email, Contra) == true && ValidarCate(categoria, Matricula, CodigoA) == true){
        if (existeInCuenta(DNI,Email) == true){
            switch (categoria){
                case "Paciente":
                    alert("Registro Exitoso")
                    RegistroUsuario.push({id:uuid.v4(), DNI:DNI, nombreyApe:NomYApe, Email:Email, contraseña:Contra, Categoria: categoria, Matricula:"NotMedic", CodigoA:"NotAdmin"})
                    return true
                    break
                case "Medico":
                    if(existeInCuenta(Matricula) == false){
                        alert("Esa matricula ya esta registrada")
                        return false
                    }else{
                        alert("Registro Exitoso")
                        RegistroUsuario.push({id:uuid.v4(), DNI:DNI, nombreyApe:NomYApe, Email:Email, contraseña:Contra, Categoria: categoria, Matricula:Matricula, CodigoA:"NotAdmin"})
                        return true
                    }
                    break
                case "Administrador":
                    if(existeInCuenta(CodigoA) == false){
                        alert("Ese Codigo ya esta registrado")
                        return false
                    }else{
                        alert("Registro Exitoso")
                        RegistroUsuario.push({id:uuid.v4(), DNI:DNI, nombreyApe:NomYApe, Email:Email, contraseña:Contra, Categoria: categoria, Matricula:"NotMedic", CodigoA:CodigoA})
                        return true
                    }
                    break
            }
        }else{
            alert("Su DNI o E-mail ya se encuentra registrado")
        }

    }else {
        alert("Los datos del formularios son invalidos")
        return false
    }
}

function validarFormulario(dni, AYP, Email, Contra){

    let PATRON =/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g;
    let regExp = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    if(AYP.trim() == 0 || Email.trim() == 0 || Contra.trim() == 0 || dni.trim() == 0){
        alert("Alguno de los campos esta vacio")
        return false;
    }

    if(!isNaN(AYP) || !AYP.match(PATRON)){
        alert("El nombre solo debe tener letras")
        return false;
    }

    if (!regExp.test(Email)){
        alert("El correo es incorrecto")
        return false;
    }
    
    if(dni.length > 9 || dni.length < 8){
        alert("El DNI es incorrecto")
        return false;
    }

    if(Contra.length < 6){
        alert("La contraseña es muy debil")
        return false
    }
    alert("true")
    return true;
}

function ValidarCate(Cate, Matri, Cod){
    if(Cate == "Paciente"){
        alert("true Paciente")
        return true
    }else{
        if(Cate == "Medico"){
            if(Matri.trim() == 0){
                alert("El campo de su matricula esta vacio")
                return false
            }
            if (isNaN(Matri)){
                alert("La matricula no puede tener letras")
                return false
            }
            if (Matri.length < 6 || Matri.length > 7){
                alert("La matricula es invalida")
                return false
            }
            alert("true Medico")
            return true
        }else {
            if(Cod.trim() == 0){
                alert("El campo de su codigo acceso esta vacio")
                return false
            }
            if (isNaN(Cod)){
                alert("El codigo de acceso no puede tener letras")
                return false
            }
            if (Cod.length < 6 || Cod.length > 7){
                alert("El codigo de acceso es invalid0")
                return false
            }
            alert("true Admin")
            return true
        }
    }
}

function existeInCuenta(dni,email){
    //ESTE FOR RECORRE CADA ELEMENTO DEL VECTOR Y EVALUA SI YA EXISTE TAL X EN EL VECTOR
    for (i=0; i<RegistroUsuario.length;i++){
        if(RegistroUsuario[i].DNI == dni){
            alert(" False")
            return false;
        }
        if(RegistroUsuario[i].Email.includes(email) == true){
            alert(" False")
            return false;
        }
    } 
    alert(" True")
    return true;
}
