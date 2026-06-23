# Prompt 01 — Solicitud del Documento de Definición Técnica

### **Contexto**

Debo crear una aplicación web de E-Commerce con lógica simulada (esto es, sin un backend ni base de datos reales) utilizando solamente HTML, CSS, JavaScript y JSON. La misma será el entregable de la consigna contenida en el documento @docs/consigna.md.

Como respuesta a la misma, definí un E-Commerce que sigue el paradigma innovador D2C, paradigma que se encuentra descrito en el documento @docs/d2c_paradigm.md. La aplicación concreta del mismo consistirá en un E-Commerce de venta de suplementación deportiva. El concepto de mi E-Commerce 2DC en concreto es el siguiente:

**Concepto: E-commerce hiper-personalizado de suplementos de rendimiento**

En lugar de vender "un bote de creatina", la tienda permite a los usuarios diseñar y comprar Stacks (combos) de suplementos enfocados en el rendimiento físico o cognitivo deseado.
Según el modelo es de Hyper-personalization, el cliente no navega, sino que introduce sus objetivos y el sistema le formula la mezcla.

**Definición de Registro principal**

Según la consigna, el sitio web debe proponer al menos una estructura de tipo registro, con campo clave de tipo compuesto, y definido en sintáxis de pseudocódigo. Esta estructura tiene, en el contexto del Trabajo solicitado en la consigna, un carácter conceptual: define la forma que tendría la estructura de datos principal del sitio web si contara con un backend real. Sin embargo, la UX/UI planteada por el sitio web resultante debe ser consistente con los campos definidos en este registro. Como respuesta a este aspecto de la consigna, he incluido el documento @docs/registro.md que contiene el registro definido para mi E-Commerce.

**Documentación Adicional**

Puesto que el funcionamiento será simulado, se incluye el documento @docs/logica_de_sugerencias.md para definir el modo en que deben mostrarse los productos según los valores introducidos por el usuario, así como otros aspectos puntuales de la UX.

Además, se incluye el documento @docs/uxui_best_practices.md, el cual describe las buenas prácticas de diseño UX/UI para E-Commerce. Estas no definen la UX/UI de la página resultante, sino que sirven como lineamientos generales. Consiste en una base de conocimientos que se utilizará para definir la UX/UI propiamente dicha, esto es, aplicando las restricciones propias de infraestructura y complejidad propias de la aplicación en tanto "trabajo práctico con lógica simulada". 

Por último, la carpeta @productos contiene una colección de imágenes de los suplementos que se mostrarán en la interfaz según las preferencias del usuario. En ella se incluye en el documento @productos/descripcion.md, que funciona de puente entre los tipos de productos, la lógica de sugerencia de los productos y los archivos de imagen.

### Tarea

Crea un documento completo de definición técnica, en español altamente preciso, que incluya:
- flujos UX (de login, ingreso de preferencias, ventanas de procesamiento simulado, visualización de resultados, carrito de compras y pago final)
- diseño UI 
- lógica de sugerencias
- textos e imágenes según preferencias de usuario y resultados obtenidos
- estructuras JSON para datos hardcodeados o estáticos
- restricciones técnicas y de complejidad
