window.onload = function () {

    let form = document.querySelector(".formDate")

    form.addEventListener("submit", (e) => {
        const inDate = document.querySelector("#inDate");
        const outDate = document.querySelector("#outDate");


        let errors = [];
        let errorElement = document.querySelector(".errores");

        errorElement.innerHTML = ""



        if (inDate.value >= outDate.value) {
            errors.push("La fecha de salida debe ser mayor a la de entrada");
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