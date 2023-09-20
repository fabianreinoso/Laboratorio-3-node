const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Configuración de EJS como motor de plantillas
app.set('view engine', 'ejs');

// Middleware para procesar datos del cuerpo de las solicitudes HTTP
app.use(bodyParser.urlencoded({ extended: true }));

// Directorio de archivos estáticos
app.use(express.static(__dirname + '/public'));

// Ruta de inicio de sesión
app.get('/', (req, res) => {
    res.render('login');
});

// Ruta de matriculas
app.post('/matriculas', (req, res) => {
    const usuario = req.body.usuario;
    const contrasena = req.body.contrasena;

    // Lógica para verificar el inicio de sesión y redireccionar a la vista de matriculas
    // Aquí puedes implementar la lógica de autenticación con la base de datos o cualquier otro método
    // Si la autenticación es exitosa, redirecciona a la vista de matriculas
    if (usuario === 'usuario' && contrasena === 'contrasena') {
        res.render('matriculas');
    } else {
        // Si la autenticación falla, puedes renderizar una vista de error o redireccionar a otra página
        res.render('login', { error: 'Usuario o contraseña incorrectos' });
    }
});

// Ruta de confirmacion de matriculas
app.post('/confirmacion', (req, res) => {
    const cursoSeleccionado = req.body.curso; // Obtén el nombre del curso seleccionado desde el formulario
    const medioPago = req.body.medioPago;
    let modulosSeleccionados = req.body.modulos || []; // Obtén los módulos seleccionados del formulario

    // Si solo se permite seleccionar un módulo, puedes convertir modulosSeleccionados en una cadena
    if (Array.isArray(modulosSeleccionados)) {
        modulosSeleccionados = modulosSeleccionados[0];
    }

    // Lógica para obtener el nombre completo del curso (Java, PHP, .NET) basado en el valor seleccionado
    let nombreCurso = '';
    let precioCurso = 0; // Declarar precioCurso aquí y asignarle un valor predeterminado
    switch (cursoSeleccionado) {
        case 'Java':
            nombreCurso = 'Java - S/ 1200';
            precioCurso = 1200; // Asignar el precio correspondiente
            break;
        case 'PHP':
            nombreCurso = 'PHP - S/ 800';
            precioCurso = 800; // Asignar el precio correspondiente
            break;
        case '.NET':
            nombreCurso = '.NET - S/ 1500';
            precioCurso = 1500; // Asignar el precio correspondiente
            break;
        default:
            // Manejo de caso por defecto si es necesario
            break;
    }

    // Lógica para calcular el descuento
    let descuento = 0;
    if (medioPago === 'Pago en efectivo') {
        descuento = precioCurso * 0.1; // Aplicar un 10% de descuento si el pago es en efectivo
    }

    // Calcular el precio total con descuento
    const precioTotalConDescuento = precioCurso - descuento;

    // Renderiza la vista confirmacion.ejs y pasa los datos, incluido el precio con descuento
    console.log("Precio total con descuento:", precioTotalConDescuento);
    res.render('confirmacion', { curso: { name: nombreCurso }, medioPago, modulos: modulosSeleccionados, descuento, precioTotalConDescuento });
});

// Puerto en el que el servidor escucha las solicitudes
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
