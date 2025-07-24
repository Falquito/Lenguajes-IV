export const validateOrden = (method,formData)=>{
    if(method==="DELETE"){
        return true;
    }
    let newErrors = {};

    if (!formData["cliente email"] || formData["cliente email"].trim() === "") {
        newErrors["cliente email"] = "El cliente email es obligatorio";
    }
    // Validar fecha en formato YYYY-MM-DD
    const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!formData["fecha"] || !fechaRegex.test(formData["fecha"])) {
        newErrors["fecha"] = "Formato de fecha incorrecto (YYYY-MM-DD)";
    } else {
        const fecha = new Date(formData["fecha"]);
        const [year, month, day] = formData["fecha"].split("-").map(Number);
        if (
            fecha.getFullYear() !== year ||
            fecha.getMonth() + 1 !== month || // getMonth() devuelve 0-indexado
            fecha.getDate() !== day
        ) {
            newErrors["fecha"] = "Fecha inválida";
        }
    }
    // Validar que al menos un producto esté seleccionado
    if (!formData["productos"] || formData["productos"].length === 0) {
        newErrors["productos"] = "Debes seleccionar al menos un producto";
    }
    if (!formData["total"] || isNaN(formData["total"]) || Number(formData["total"]) <= 0) {
        newErrors["total"] = "El total debe ser un numero positivo";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
}