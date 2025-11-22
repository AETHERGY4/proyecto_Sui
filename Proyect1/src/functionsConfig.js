export const FUNCTIONS = [
    {
        titulo: "Ver Nombre de la Institución",
        descripcion: "Ver el nombre de registro de la institución educativa",
        nombreFuncion: "ver_nombre",
        soloLectura: "1",
        inputs: []
    },

    {
        titulo: "Registrar Estudiante",
        descripcion: "Registra un nuevo estudiante en la institución con nivel inicial Básico.",
        nombreFuncion: "agregar_cliente",
        soloLectura: "0",
        inputs: [
            { name: "nombre_cliente", type: "string", label: "Nombre Completo del Estudiante" },
            { name: "direccion_facturacion", type: "string", label: "Dirección del Estudiante" },
            { name: "ano_de_registro", type: "u8", label: "Año de Ingreso (ej. 24)" },
            { name: "id_cliente", type: "u16", label: "ID Único del Estudiante" }
        ]
    },
    {
        titulo: "Agregar Certificado",
        descripcion: "Añade un certificado al historial académico de un estudiante.",
        nombreFuncion: "agregar_servicio",
        soloLectura: "0",
        inputs: [
            { name: "id_cliente", type: "u16", label: "ID del Estudiante" },
            { name: "servicio", type: "string", label: "Nombre del Certificado/Curso" }
        ]
    },
    {
        titulo: "Ascender a Nivel Avanzado",
        descripcion: "Actualiza el nivel del estudiante a Avanzado (mayores beneficios).",
        nombreFuncion: "cambiar_nivel_a_oro",
        soloLectura: "0",
        inputs: [
            { name: "id_cliente", type: "u16", label: "ID del Estudiante" }
        ]
    },
    {
        titulo: "Ver Beneficios Académicos",
        descripcion: "Consultar los beneficios según el nivel actual del estudiante",
        nombreFuncion: "aplicar_descuento",
        soloLectura: "1",
        inputs: [
            {name: "id_cliente", type:"u16", label: "ID del Estudiante"}
        ]
    },
    {
        titulo: "Perfil Académico",
        descripcion: "Ver el resumen y datos generales de un estudiante",
        nombreFuncion: "ver_estado_cliente",
        soloLectura: "1",
        inputs: [
            {name: "id_cliente", type:"u16", label: "ID del Estudiante"}
        ]
    },
    {
        titulo: "Historial Completo",
        descripcion: "Consultar toda la información académica del estudiante",
        nombreFuncion: "retornar_todo",
        soloLectura: "1",
        inputs: [
            {name: "id_cliente", type:"u16", label: "ID del Estudiante"}
        ]
    }
];