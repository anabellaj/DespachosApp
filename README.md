# DespachosApp

Aplicación web desarrollada en **Angular** para la **gestión de despachos**.  
Permite crear, editar y visualizar planes de despacho, asignando camiones y choferes, además de controlar el estado del proceso (Planificado → Cargando → En Ruta → Completado).

El sitio se encuentra en vivo aquí: https://anabellaj.github.io/DespachosApp/ 

---

## 🚀 Requisitos previos

- [Node.js](https://nodejs.org/) (v18 o superior recomendado)  
- [Angular CLI](https://angular.dev/cli)  

---

## 🔧 Instalación

Clona el repositorio y entra en el directorio:

```bash
git clone https://github.com/anabellaj/DespachosApp.git
cd DespachosApp
````

Instala las dependencias:

```bash
npm install
```

---

## 🧪 Ejecución en desarrollo

Inicia el servidor local con:

```bash
ng serve
```

La aplicación estará disponible en:

```
http://localhost:4200
```

---

## 🏗 Compilación para producción

Genera la versión optimizada con:

```bash
ng build --configuration=production
```

Los archivos generados estarán en:

```
dist/DespachosApp/
```

---

## 🛣 Rutas principales

* `/` → **Dashboard**: Lista general de despachos.
* `/crear-despacho` → Crear un nuevo despacho.
* `/crear-despacho/:id` → Editar un despacho existente.
* `/detalle-despacho/:id` → Ver detalles y actualizar estado del despacho.

---

## 📌 Notas

* Los datos de camiones y choferes provienen de un .json dentro del repositorio, que puede ser editado con facilicad y sus cambios serán reflejados en el sistema.

---

```
```

