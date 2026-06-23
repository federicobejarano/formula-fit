# Diseño del Registro Principal: PEDIDO_STACK

## Estructura generada por Gemini Pro
```plaintext
AMBIENTE
PEDIDO_STACK = Registro
    // Clave Compleja: ID_Transaccion (Compuesto por Fecha + Email + Hash)
    ID_Transaccion: AN(50); 
    
    // Campo Continente 1: El input del usuario
    Perfil_Atleta = Registro
        Email_Usuario: AN(50); // Clave Secundaria/Foránea
        Objetivo: ("hipertrofia", "fuerza_potencia", "recuperacion");
        Nivel: ("principiante", "intermedio", "avanzado");
        Restriccion: ("ninguna", "vegano");
    Fin Registro;
    
    // Campo Continente 2: El output de la matriz de decisión
    Formula_Generada = Registro
        ID_Suplemento_A: Entero; // Clave Foránea a Inventario
        ID_Suplemento_B: Entero; // Clave Foránea a Inventario
        Total_Gramos: Entero;
    Fin Registro;
    
    Precio_Final: Real;
    Estado_Checkout: ("Pendiente", "Pagado");
Fin Registro;
```

## Estructura Corregida

Se detectaron inconsistencias en la sintáxis de pseudo-código planteada por Gemini en relación a la que propone la Cátedra, por lo que se modificaron algunas líneas, llegando al siguiente resultado.

```plaintext
PEDIDO_STACK = Registro
    // Clave Compleja: ID_Transaccion (Compuesto por Fecha + Email + Hash)
    ID_Transaccion = Registro 
    	Fecha = Registro
    		aa : N(4)
    		mm : N(2)
    		dd : N(2)
    	FinReg
    	Email_Usuario: AN(50);
    	Hash : AN(30)
    FinReg
    
    // Campo Continente 1: El input del usuario
    
    Perfil_Atleta = Registro
        Objetivo: ("hipertrofia", "fuerza_potencia", "recuperacion", "longevidad", "bienestar");
        Nivel: ("principiante", "intermedio", "avanzado");
        Restriccion: ("ninguna", "vegano");
        Hora_Entrenamiento: ("mañana", "tarde", "noche")
    Fin Registro;
    
    Precio_Final: Real;
    Estado_Checkout: ("Pendiente", "Pagado");
Fin Registro;
```