window.onload = function () {

    let form = document.querySelector(".form")
    form.firstName.focus();

    form.addEventListener("submit", (e) => {
        const firstName = document.querySelector("#firstName");
        const lastName = document.querySelector("#lastName");
        const email = document.querySelector("#email");
        const password = document.querySelector("#password");
        const repassword = document.querySelector("#repassword");
        const image = document.querySelector("#image");


        let errors = [];
        let errorElement = document.querySelector(".errores");

        errorElement.innerHTML = ""

        if (firstName.value == '') {
            errors.push("Debes completar el campo Nombre");
            firstName.classList.add('is-invalid')
        } else if (firstName.value.length < 2) {
            errors.push("El campo nombre debe contener al menos dos caracteres");
            firstName.classList.add('is-invalid')
        } else {
            firstName.classList.remove('is-invalid')
            lastName.focus()
        }

        if (lastName.value == '') {
            errors.push("Debes completar el campo Apellido");
            lastName.classList.add('is-invalid')
        } else if (lastName.value.length < 2) {
            errors.push("El campo apellido debe contener al menos dos caracteres");
            lastName.classList.add('is-invalid')
        } else {
            lastName.classList.remove('is-invalid')
            email.focus()
        }

        function validateEmail(email) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }

        if (email.value == '') {
            errors.push("Debes completar el campo E-mail");
            email.classList.add('is-invalid')
        } else if (!validateEmail(email.value)) {
            errors.push("Debes completar un E-mail válido");
            email.classList.add('is-invalid')
        } else {
            email.classList.remove('is-invalid')
            password.focus()
        }

        if (password.value == '') {
            errors.push("Debes completar el campo Password");
            password.classList.add('is-invalid')
        } else if (password.value.length < 8) {
            errors.push("La contraseña debe tener al menos 8 caracteres");
            password.classList.add('is-invalid')
        } else {
            password.classList.remove('is-invalid')
            repassword.focus()
        }

        if (repassword.value == '') {
            errors.push("Debes completar el campo de confirmación de Password");
            repassword.classList.add('is-invalid')
        } else if (password.value != repassword.value) {
            errors.push("Las contraseñas no coinciden");
            password.classList.add('is-invalid')
        } else {
            password.classList.remove('is-invalid')
            repassword.focus()
        }

        if (image.value == '') {
            errors.push("Debes subir una imagen");
            image.classList.add('is-invalid')
        } else if (/\.(jpe?g|png|gif)$/i.test(image.files[0].name) === false) {
            errors.push("Formato de imagen inválido");
        } else {
            image.classList.remove('is-invalid')
        }


        if (errors.length > 0) {
            e.preventDefault();
            errorElement.classList.add('alert-warning');
            for (error of errors) {
                errorElement.innerHTML += `<li>${error}</li>`
            }

        }

    })

}