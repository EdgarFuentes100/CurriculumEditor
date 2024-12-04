///GNERA LA DESCRGA DEL PDF
document.getElementById('generate-pdf').addEventListener('click', function () {
    const element = document.getElementById('preview-content');

    // Usar html2pdf.js para generar el PDF manteniendo los estilos
    html2pdf()
        .from(element)  // El contenido que se tomará como fuente para el PDF
        .save('curriculum.pdf');  // El nombre del archivo PDF generado
});

document.addEventListener("DOMContentLoaded", function () {
    const plantillasLista = document.getElementById("plantillas-lista");

    // Selecciona todas las plantillas usando la clase 'plantilla'
    const plantillas = document.querySelectorAll('.plantilla');

    plantillas.forEach(plantilla => {
        // Crear una copia de la plantilla original
        const copiaPlantilla = plantilla.cloneNode(true);

        // Establecer dimensiones reducidas solo para la miniatura
        copiaPlantilla.style.display = 'block'; // Asegurarse de que la copia sea visible
        copiaPlantilla.style.cursor = "pointer";
        copiaPlantilla.style.height = "auto";  // Ajusta la altura según sea necesario
        copiaPlantilla.style.border = "2px solid #e5e7eb"; // Border similar a border-gray-200
        copiaPlantilla.style.maxWidth = "400px";  // Establece un ancho máximo de 300px (puedes ajustarlo)
        copiaPlantilla.style.width = "100%";      // Asegura que la plantilla ocupe todo el ancho disponible hasta el máximo
        copiaPlantilla.style.backgroundColor = "#ffffff"; // bg-white (fondo blanco)
        copiaPlantilla.style.borderRadius = "0.5rem"; // rounded-lg (border-radius de 0.5rem)
        copiaPlantilla.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)"; // shadow-md (una sombra ligera)
        copiaPlantilla.style.marginTop = "0px";

        // Solo escalar el texto, no el resto de los elementos
        const textoElementos = copiaPlantilla.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, li'); // Todos los elementos de texto
        textoElementos.forEach((elemento) => {
            // Escalar solo los elementos de texto
            elemento.style.transform = "scale(0.6)";  // Escala el texto al 60% del tamaño original
            elemento.style.transformOrigin = "top left";  // Mantiene el origen del escalado en la esquina superior izquierda
        });

        // Añadir la plantilla miniatura al contenedor de plantillas
        plantillasLista.appendChild(copiaPlantilla);

        // Agregar el evento de clic para mostrar el ID de la plantilla
        copiaPlantilla.addEventListener("click", function () {
            mostrarVistaPrevia(plantilla);
            mostrarFormulario(plantilla);
        });
    });
});


// Cuando se haga clic en el botón de enviar
document.getElementById('submit-form').addEventListener('click', function () {
    // Primero, obtener el formulario activo
    const form = document.querySelector('.form-template'); // Buscamos el formulario activo que se está mostrando

    // Asegurarnos de que haya un formulario visible
    if (form) {
        // Obtener todos los campos de entrada (inputs, selects, etc.)
        const formElements = form.querySelectorAll('input, select, textarea');

        // Iterar sobre cada campo para obtener el valor ingresado y actualizar la plantilla
        formElements.forEach(function (element) {
            const fieldId = element.id; // El id del campo (ej. name1, profession1)
            const fieldValue = element.value; // El valor que el usuario ingresó en el campo

            // Buscar todos los elementos con el mismo id (aunque no es recomendable tener múltiples con el mismo id)
            const previewElements = document.querySelectorAll(`#${fieldId}`);

            // Iterar sobre todos los elementos encontrados y actualizar su contenido
            previewElements.forEach(function (previewElement) {
                if (previewElement) {
                    // Actualizar el contenido del elemento correspondiente
                    previewElement.textContent = fieldValue; // Aquí actualizamos el contenido de la plantilla
                }
            });
        });

        console.log("Formulario enviado y plantilla actualizada.");
    } else {
        console.log("No hay formulario visible.");
    }
});

// Función para mostrar la vista previa de la plantilla seleccionada
function mostrarVistaPrevia(plantilla) {
    const previewContent = document.getElementById("preview-content");
    previewContent.innerHTML = ''; // Limpiar vista previa actual

    // Copiar el contenido de la plantilla seleccionada en el área de vista previa
    const contenidoCopia = plantilla.cloneNode(true);

    // Asegurarse de que la copia sea visible
    contenidoCopia.style.display = 'block';

    // Eliminar bordes y sombras
    contenidoCopia.style.border = 'none';
    contenidoCopia.style.boxShadow = 'none';

    // Eliminar borde y sombra de los elementos internos
    const children = contenidoCopia.querySelectorAll('*');
    children.forEach(child => {
        child.style.border = 'none';
        child.style.boxShadow = 'none';
    });

    // Añadir la plantilla copiada al contenedor
    previewContent.appendChild(contenidoCopia);

    // Alineación usando Flexbox
    previewContent.style.display = 'flex';
    previewContent.style.justifyContent = 'flex-start'; // Alinear a la izquierda
    previewContent.style.alignItems = 'flex-start';    // Alinear arriba
    previewContent.style.border = 'none';  // Eliminar borde de la vista previa
    previewContent.style.boxShadow = 'none';  // Eliminar sombra de la vista previ
}


// Función para mostrar el formulario correspondiente en la vista previa
function mostrarFormulario(plantilla) {
    // Obtener el ID del formulario asociado a la plantilla
    const formId = plantilla.id.replace('plantilla', 'form-template');
    const formTemplate = document.getElementById(formId);
    const previewForm = document.getElementById("preview-form");

    // Limpiar la vista previa antes de añadir la copia
    previewForm.innerHTML = '';

    // Crear una copia del formulario
    const formClone = formTemplate.cloneNode(true);

    // Mostrar la copia del formulario (aseguramos que la copia esté visible)
    formClone.style.display = 'block';  // Hacer que la copia sea visible

    // Añadir la copia a la vista previa
    previewForm.appendChild(formClone);

    // Si necesitas agregar un comportamiento adicional al formulario (eventos, etc.)
    const form = formClone.querySelector('form');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();  // Prevenir el comportamiento predeterminado del formulario
            console.log("Formulario enviado ID: " + form.id);
        });
    }
}

// Obtener los controles del formulario
const fontSelector = document.getElementById("font-selector");
const fontSizeSelector = document.getElementById("font-size-selector");
const lineHeightSelector = document.getElementById("line-height-selector");
const letterSpacingSelector = document.getElementById("letter-spacing-selector");

// Función para actualizar la vista previa
function actualizarVistaPrevia() {
    const previewContent = document.getElementById("preview-content");

    // Obtener los valores seleccionados
    const selectedFont = fontSelector.value;
    const selectedFontSize = fontSizeSelector.value + "px";
    const lineHeight = lineHeightSelector.value;
    const letterSpacing = letterSpacingSelector.value + "px";

    // Aplicar los estilos a todos los elementos de texto en la vista previa
    const textoElementos = previewContent.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, li');
    textoElementos.forEach((elemento) => {
        elemento.style.fontFamily = selectedFont;  // Cambia la fuente
        elemento.style.fontSize = selectedFontSize;  // Cambia el tamaño de la fuente
        elemento.style.lineHeight = lineHeight;  // Cambia el interlineado
        elemento.style.letterSpacing = letterSpacing;  // Cambia el espaciado entre letras
    });
}

// Añadir event listeners para actualizar la vista previa en tiempo real
fontSelector.addEventListener("change", actualizarVistaPrevia);
fontSizeSelector.addEventListener("input", actualizarVistaPrevia);
lineHeightSelector.addEventListener("change", actualizarVistaPrevia);
letterSpacingSelector.addEventListener("input", actualizarVistaPrevia);