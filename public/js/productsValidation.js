window.onload = function () {

    let form = document.querySelector(".form")

    form.addEventListener("submit", (e) => {
        const hotel_id = document.querySelector("#hotel_id");
        const roomType_id = document.querySelector("#roomType_id");
        const roomCategory_id = document.querySelector("#roomCategory_id");
        const price = document.querySelector("#price");
        const discountRate = document.querySelector("#discountRate");


        let errors = [];
        let errorElement = document.querySelector(".errores");

        errorElement.innerHTML = ""

        if (isNaN(hotel_id.value)) {
            errors.push("Debes seleccionar un hotel");
            hotel_id.classList.add('is-invalid')
        } else {
            hotel_id.classList.remove('is-invalid')
        }

        if (isNaN(roomType_id.value)) {
            errors.push("Debes seleccionar un tipo de habitación");
            roomType_id.classList.add('is-invalid')
        } else {
            roomType_id.classList.remove('is-invalid')
        }

        if (isNaN(roomCategory_id.value)) {
            errors.push("Debes seleccionar una categoria de habitación");
            roomCategory_id.classList.add('is-invalid')
        } else {
            roomCategory_id.classList.remove('is-invalid')
        }

        if (price.value == '') {
            errors.push("Debes completar el campo precio");
            price.classList.add('is-invalid')
        } else if (price.value <= 0) {
            errors.push("El precio debe ser un número positivo");
            price.classList.add('is-invalid')
        } else {
            price.classList.remove('is-invalid')
        }

        if (discountRate.value == '') {
            errors.push("Debes completar el campo descuento");
            discountRate.classList.add('is-invalid')
        } else if (discountRate.value < 0) {
            errors.push("El descuento debe ser mayor o igual a cero");
            discountRate.classList.add('is-invalid')
        } else if (discountRate.value > 99) {
            errors.push("El descuento debe ser menor o igual a 99%");
            discountRate.classList.add('is-invalid')
        } else {
            discountRate.classList.remove('is-invalid')
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