inyección gastos comunes

http://localhost:4000/api/gastos

 {
  "concepto": "Reparación Ascensor Torre B",
  "monto": 350000,
  "tipo": "Mantenimiento",
  "estado": "Pendiente",
  "fecha": "2025-11-15"
}


inyección faqs

http://localhost:4000/api/faqs
{
  "question": "¿Cómo pago mis gastos comunes?",
  "answer": "En la sección 'Gastos Comunes' de la app."
}


inyección consultas

http://localhost:4000/api/consultas 

{
  "email": "residente@condominio.com",
  "note": "La luz del pasillo 3 está quemada."
}

inyección reservas 


http://localhost:4000/api/reservas

{
  "unidad": "B-202",
  "residente": "Residente de Prueba",
  "espacio": "Salón de Eventos",
  "fecha": "2025-12-31",
  "horaInicio": "20:00",
  "horaFin": "02:00",
  "estado": "Pendiente"
}

inyección multas

http://localhost:4000/api/reservas

{
  "unidad": "C-301",
  "residente": "Bruno luchini",
  "motivo": "Ruidos molestos fuera de horario permitido",
  "monto": 50000,
  "estado": "Pendiente",
  "fecha": "2025-11-10"
}

inyección usuarios

http://localhost:4000/api/registro

{
  "nombre": "Nuevo Residente Ejemplo",
  "email": "residente.nuevo@condominio.com",
  "password": "password123",
  "rol": "residente",
  "unidad": "E-505"
}

 


