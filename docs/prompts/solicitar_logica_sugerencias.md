## Prompt: Solicitar Lógica de Sugerencias Simuladas

He decidido crear una página E-Commerce de tipo D2C con lógica y datos simulados. Este presentará las siguientes características: 

**Descripción del sitio web**

La página simulará el funcionamiento real: introducir objetivos del cliente, proponer stack de suplementos, modificar stack y/o añadirlos al carrito sin contar con una base de dato. Los datos y estructuras necesarios para el funcionamiento simulado estarán hardcodeados o en archivos JSON en el propio repositorio, junto con las imágenes que utilizará la página. Sin embargo, para el caso de las imágenes, tengo entendido que pueden utilizarse links a imágenes de Unsplash u otros sitios web.

Además de estp, la página debe simular el login: al ingresar, el usuario introduce su email y contraseña, y la página lo loguea de forma ficticia: aparece un ícono de usuario con el email ingresado a un costado. Este logueo contará con una leyenda indicando que el logueo es simulado.

La aplicación completa debe hacerse con HTML, CSS y JavaScript.

**Cuestiones**

Según el funcionamiento de mi página, el usuario "ingresa sus métricas personales, objetivos (fuerza, hipertrofia, resistencia) y el sistema le formula un Stack o "combo" con proporciones exactas .

Lo que quiero saber es lo siguiente: una página real de estas características contaría con una base de datos compleja, que contenga los suplementos disponibles, una lógica de backend que procese esos datos para proporcionar las sugerencias apropiadas y tal vez inteligencia artificial para proporcionar al usuario información fundamentada que le brinde confiabilidad a la sugerencia. ¿Cómo se simularía esto en una página que no contará con una infraestructura de backend y datos real? Ten en cuenta que estoy trabajando contrarreloj, por lo que debo implementar una solución rápida, por ejemplo, mediante documentos JSON.

**Tarea**

Para empezar, proporcióname un documento de requerimientos, en español técnico, claro y completo así como fundamentado sólidamente, acerca de cómo mi sitio web resolverá la sugerencia del Stack según los datos ingresados por el usuario. Incluye un listado de los datos que ingresará (no deben ser demasiados datos, ya que el sitio web será sencillo, pero debe ser lo suficientemente completo como para asemejarse a un sitio real de estas características).

Este documento será incluido como documentación para Cursor. Por lo tanto, debe estar claramente estructurado para que la IA lo entienda. El enfoque debe ser conceptual (esto es, enfocado en el punto de vista del usuario, el funcionamiento del formulario de ingreso de datos y el manejo de estos para proporcionar las sugerencias). Además, debe incluir también la resolución del modo en que se implementará la lógica de sugerencias desde el punto de vista del código. Sin embargo, debe excluir el punto de vista de "algoritmos y estructuras de datos", esto es, resolver la estructura del registro y escoger el tipo de clave que se utilizará. En otras palabras, el documento se centrará en 
- el flujo UX/UI
- los datos que ingresará el usuario, desde el punto de vista del mismo
- la lógica de sugerencias (de suplementos individuales o stacks)

Este documento será nuestro punto de partida, ya que entender cómo resolvería la lógica de sugerencias es el único obstáculo que estoy viendo respecto de la idea en cuestión, teniendo en cuenta que se trata de una página web simulada.