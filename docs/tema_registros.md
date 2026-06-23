Aquí tienes una explicación completa, estructurada y detallada sobre las Estructuras de Tipo Registro y sus Claves, basada en la información proporcionada en las fuentes:

### 1. Concepto Teórico de los Registros

Desde un punto de vista teórico, los **registros** son tipos de datos estructurados estáticos y complejos que se almacenan en la memoria interna.

La característica principal que define a un registro es la **Heterogeneidad de los datos**. Esto significa que es una estructura de datos cuyos elementos constituyentes pueden ser de **diferentes tipos** (por ejemplo, combinar letras, números y otros símbolos en un solo bloque de información).

#### Componentes de un Registro: Los Campos

Un registro está compuesto por diferentes elementos a los que se denomina **campos**.

- Un campo es la unidad mínima de información o la entidad lógica más pequeña que conforma al registro.
- Pueden contener datos elementales (como enteros, reales o caracteres) o, a su vez, alojar otras estructuras de datos.

Todo campo debe tener tres elementos fundamentales definidos:

1. **Nombre:** Un identificador único del campo (ej. `dni`).
2. **Tipo:** El tipo de dato que puede contener (ej. Numérico `N`, Alfanumérico `AN`).
3. **Tamaño:** El espacio que ocupará el campo dentro del registro (ej. `8` posiciones).

#### Clasificación de los Campos

Los campos se pueden clasificar según su estructura interna en:

- **Campos Contenidos (Simples):** Son aquellos que almacenan un único dato indivisible. Por ejemplo, la edad de un paciente o el nombre de usuario de una cuenta.
- **Campos Continentes:** Son campos que se encuentran formados internamente por otros campos más simples. Un ejemplo clásico es una "Fecha de fabricación", la cual a su vez contiene internamente los campos simples de _Día_, _Mes_ y _Año_.

---

### 2. Implementación Práctica: Sintaxis en Pseudocódigo

El registro se define porque agrupa un conjunto de campos bajo una misma entidad. Aunque tenga muchos elementos, **debe ser tratado como una sola unidad** o entidad en el algoritmo, en lugar de definir una variable separada para cada campo.

#### Definición del Registro en el AMBIENTE

Para declarar un registro, se define su estructura listando cada uno de sus campos y sus tipos:

```
AMBIENTE
PERSONA = Registro
    DNI: Entero;
    Nombre: AN(50);
    Domicilio: AN(70);
Fin Registro;
```

Si un registro posee un "Campo Continente" (un registro dentro de otro), se declara de forma anidada:

```
AUTO = Registro
    Dominio: AN(7);
    Modelo: Entero;
    Tipo: ("Sedan", "SUV", "Utilitario", "Pick Up");
    Marca: AN(50);
    FechaFabricacion = Registro
        Dia: Entero;
        Mes: Entero;
        Año: Entero;
    Fin Registro;
Fin Registro;
```

#### Uso del Registro en el ALGORITMO (Selector de Campo)

Para determinar a qué campo específico dentro del registro se está accediendo (ya sea para leer, escribir o asignar un valor), se utiliza el **Selector de Campo**, que comúnmente se representa con un punto (`.`) que une la variable del registro y el nombre del campo.

**Ejemplos de acciones básicas:**

```
// Asignación directa
Reg.DNI := 23456789;

// Lectura desde un ingreso de usuario y posterior asignación
Leer(NroDNI);
Reg.DNI := NroDNI;

// Mostrar por pantalla un campo específico
Escribir(Reg.Nombre);
```

**Acceso a campos continentes (anidados):** Si se necesita acceder a un campo que está dentro de un campo continente, se encadenan los selectores:

```
Escribir("Fecha de fabricación: ");
Escribir(Reg.FechaFabricacion.Dia, Reg.FechaFabricacion.Mes, Reg.FechaFabricacion.Año);
```

---

### 3. Subtema: Campos Claves

Un **campo clave** es un tipo de campo especial dentro del registro cuya función es **identificar al registro de manera única** y diferenciarlo del resto de los registros existentes. La regla de oro de un campo clave es que **debe ser ÚNICO**, es decir, el valor no puede repetirse entre distintos registros.

#### A. Clasificación de los campos claves por su FORMATO:

- **Simples:** Es aquel campo clave que está formado por un campo "contenido" (indivisible). Por ejemplo, el número de documento (DNI) en un registro de personas.
- **Complejos:** Es aquel campo clave que está formado por un campo "continente" (varios datos combinados). Por ejemplo, la fecha exacta de vacunación en una libreta sanitaria.

#### B. Clasificación de los campos claves por su FUNCIÓN:

- **Primarias:** Es la clave estricta que identifica de forma completamente única a un registro. Un ejemplo es el nombre de usuario único en una red social.
- **Secundarias:** Es una clave que _no sirve para identificar de forma única_ a un registro, pero es sumamente útil para procesar o buscar la información en un orden adecuado. Un ejemplo típico es agrupar o buscar por la "Fecha de Nacimiento".
- **Foráneas:** Es un tipo de clave secundaria que sirve específicamente para indicar una **relación con otro archivo** o tabla de registros. Por ejemplo, tener un campo de identificación de carrera (`ID CARRERA`) dentro del archivo "ESTUDIANTE" permite relacionar los datos de ese estudiante con los datos existentes en un archivo independiente de "CARRERAS".