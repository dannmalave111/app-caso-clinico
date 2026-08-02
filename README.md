# APP CASO CLIMICO

Actúa como un diseñador UI/UX experto en accesibilidad para adultos mayores y un desarrollador Full-Stack. Crea una aplicación web responsiva (optimizada para verse como una app móvil nativa en celulares y una plataforma web en computadoras) con una estética moderna, limpia y minimalista, inspirada en apps de salud de alta gama: fondos claros (blanco/gris sutil), tarjetas flotantes con bordes muy redondeados, sombras suaves, y acentos en verde menta y blanco.

La interfaz debe ser extremadamente accesible para adultos mayores: fuentes grandes, claras, botones grandes y fáciles de pulsar, y cero elementos confusos.

La app debe contar con dos vistas o perfiles de usuario accesibles desde un selector inicial:

ROL 1: VISTA PACIENTE (Optimizado para adultos mayores - Mobile First)

Pantalla Principal ('Hoy'):

Encabezado: Saludo cálido y visualización clara de la fecha actual.

Plan de Alimentación Semanal/Diario: Muestra los bloques del menú asignados por el nutricionista (Desayuno, Almuerzo, Cena, Meriendas) con textos grandes. Cada bloque tiene un botón claro de 'Completado' o una opción de 'Ver Alternativa' (desplegable con opciones de intercambio de alimentos configuradas por el nutriólogo).

Contador de Hidratación: Un contador visual de vasos de agua grande y amigable con botones + y - conectados a una meta diaria (ej. 8 vasos).

Registro Diario Rápido (Escala de Bristol y Notas): Una sección sencilla al final del día con iconos grandes o números claros del 1 al 7 para registrar la digestión (Escala de Bristol) y un espacio para notas por dictamen de voz o texto fácil.

Pantalla Secundaria ('Estadísticas / Progreso'):

Gráficos de barras o líneas muy limpios y fáciles de leer que muestren su constancia en la semana (días cumplidos de dieta y agua).

ROL 2: PANEL DE NUTRICIONISTA (Dashboard Web para Escritorio)

Gestión y Control de Pacientes: Una tabla general con los perfiles de los pacientes activos.

Subida y Modificación del Menú: Un módulo administrativo donde yo (el nutricionista) pueda redactar, editar y asignar el menú semanal y las alternativas de alimentos para cada paciente, el cual debe sincronizarse en tiempo real con su vista.

Seguimiento Antropométrico: Un formulario para registrar peso y medidas, que calcule automáticamente la media de cambio o delta respecto a la última consulta.

Timeline de Avances: Una vista de historial que consolide el cumplimiento del plan, el consumo de agua, las notas y los registros de la escala de Bristol enviados por el paciente.

Acceso Directo a WhatsApp: Un botón flotante o enlace dinámico integrado con la API ([https://wa.me/](https://wa.me/)[teléfono_paciente]) que abra un chat directo con el paciente desde cualquier dispositivo con un solo clic.

Haz que la aplicación sea 100% interactiva, con datos simulados funcionales para que la prueba cerrada funcione de inmediato."*

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/24de62ca-4a40-4aa4-a38b-4969dd73f32c).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
