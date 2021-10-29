window.onload = function () {

    let form = document.querySelector(".form")
    form.email.focus();

    form.addEventListener("submit", (e) => {
        const email = document.querySelector("#email");
        const password = document.querySelector("#password");


        let errors = [];
        let errorElement = document.querySelector(".errores");

        errorElement.innerHTML = ""

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
        } else {
            password.classList.remove('is-invalid')
            repassword.focus()
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