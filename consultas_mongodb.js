use cultivoxmunicipio
// ===============================================
// TAREA 4 - BIG DATA UNAD 202016911
// Consultas MongoDB - Dataset Agrícola Colombia
// Autor: MICHAEL YESID MEDINA VILLAMIZAR, JUAN PABLO QUINTERO CASTELLANOS, RAFAEL JOSE JACOME MADARIAGA
// Fecha: Noviembre 2025
// ===============================================

// Consultas básicas (inserción, selección, actualización y eliminación de documentos).
//Insercion de nuevo objeto
db.cultivos.insertOne({
  "MUNICIPIO": "CHINÁCOTA",
  "CULTIVO": "ARRACACHA",
  "VARIEDAD": "AMARILLA",
  "AREA SEMBRADA    (HAS)": 40,
  "AREA COSECHADA\n   (HAS)": 38,
  "RENDIMIENTO (TON/HA)": 12,
  "PRODUCCIONOBTENIDA   (TON)": "456",
  "ESTADO DEL PRODUCTO": "FRESCA",
  "FINCAS  PRODUC TORAS": 25,
  "PRONOSTICO 2020 AREA": 45
})
// 2.	Consulta

db.cultivos.find({
  "MUNICIPIO": "CHINÁCOTA",
  "CULTIVO": "ARRACACHA"
}).pretty()

//3.	Actualización
db.agricultura.updateOne(
  { "MUNICIPIO": "HERRAN", "VARIEDAD": "BOGOTANA" },
  { $set: { "VARIEDAD": "BOGOTÁ" } }
) 
//4.	Eliminación 
db.agricultura.deleteOne({"MUNICIPIO": "SILOS"})

// ===============================================
//Consultas con filtros y operadores.
//1. Todos los cultivos de CHITAGA
db.cultivos.find({"MUNICIPIO": "CHITAGA"}).count()
// 2. Cultivos con producción mayor a 900 toneladas
db.cultivos.find({"PRODUCCIONOBTENIDA   (TON)": { $gt: 900 }}).pretty()
// 3. Cultivos con rendimiento mayor a 20 t/ha (alta productividad)
db.cultivos.find(
  { "RENDIMIENTO (TON/HA)": { $gt: 20 } }
).sort({ "RENDIMIENTO (TON/HA)": -1 }).limit(5)
// 4. Cultivos que contienen "MAIZ" en el nombre
db.cultivos.find(
  { "CULTIVO": { $regex: "MAIZ", $options: "i" } }
).count()
//5. Municipios que tengan "TIBU" o "SARDINATA" en su nombre
db.cultivos.find(
  { "MUNICIPIO": { $in: [/TIBU/i, /SARDINATA/i] } }
).limit(5).pretty()
//6. Cultivos con área Sembradas menores a 10 ha Que tiene poca siembra
db.cultivos.find(
  { "AREA SEMBRADA    (HAS)": { $lt: 10 } }
).sort({ "AREA SEMBRADA    (HAS)": -1 }).limit(3)
//7. Cultivos en estado "Fresca" o "CHOCLO" con producción mayor a 100
db.cultivos.find(
  {
    "ESTADO DEL PRODUCTO": { $in: ["FRESCA", "CHOCLO"] },
    "FINCAS  PRODUC TORAS": { $gt: 100 }
  }
).count()
//8. Cultivos con rendimiento entre 20 y 40 t/ha (rango medio-alto)
db.cultivos.find({"RENDIMIENTO (TON/HA)": { $gte: 20, $lte: 40 }}).limit(5).pretty()
// ===============================================
//•	Consultas de agregación para calcular estadísticas (contar, sumar, promediar, etc.)
/* CONSULTA 1: Contar documentos */

{
  "_id": null,
  "totalCultivos": { "$sum": 1 }
}


/* CONSULTA 2: Promedio de producción */
{
  "_id": null,
  "promedioProduccion": { "$avg": "$produccion" }
}


/* CONSULTA 3: Suma total de producción */
{
  "_id": null,
  "totalProduccion": { "$sum": "$produccion" }
}


/* CONSULTA 4: Conteo por departamento */
{
  "_id": "$departamento",
  "cantidad": { "$sum": 1 }
}
