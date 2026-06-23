# Catálogo de Suplementos y Reglas de Recomendación

### 1. Proteins & Amino Acids (Proteínas y Aminoácidos)

Esta categoría es fundamental para la construcción y reparación muscular.

* **Whey Protein Concentrate / Isolate**
* `objetivo_principal`: 'hipertrofia', 'recuperacion'
* `nivel_experiencia`: 'principiante', 'intermedio', 'avanzado'
* `restriccion_dietetica`: 'ninguna' *(Excluir si es vegano)*
* `horario_entrenamiento`: 'manana', 'noche'
* imagen: `wpc.png`


* **Plant-Based Protein (Pea, Rice, Soy)**
* `objetivo_principal`: 'hipertrofia', 'recuperacion'
* `nivel_experiencia`: 'principiante', 'intermedio', 'avanzado'
* `restriccion_dietetica`: 'vegano', 'ninguna' *(Sustituto directo del Whey para veganos)*
* `horario_entrenamiento`: 'manana', 'noche'
* imagen: `pbp.png`


* **Essential Amino Acids (EAAs) / Branched-Chain Amino Acids (BCAAs)**
* `objetivo_principal`: 'recuperacion', 'hipertrofia'
* `nivel_experiencia`: 'intermedio', 'avanzado'
* `restriccion_dietetica`: 'vegano', 'ninguna'
* `horario_entrenamiento`: 'manana', 'noche'
* imagen: `eaa.png`



### 2. Performance & Strength (Rendimiento y Fuerza)

Aquí se ubican los suplementos diseñados para mejorar el rendimiento intra-entrenamiento y la fuerza explosiva. El horario es una variable crítica en este grupo.

* **Creatine Monohydrate**
* `objetivo_principal`: 'fuerza_potencia', 'hipertrofia'
* `nivel_experiencia`: 'principiante', 'intermedio', 'avanzado'
* `restriccion_dietetica`: 'vegano', 'ninguna'
* `horario_entrenamiento`: 'manana', 'noche' *(No depende del horario)*
* imagen: `cmh.png`


* **Caffeine / Stimulant Pre-Workout**
* `objetivo_principal`: 'fuerza_potencia', 'hipertrofia'
* `nivel_experiencia`: 'intermedio', 'avanzado' *(Suele evitarse recomendar pre-entrenos fuertes a principiantes)*
* `restriccion_dietetica`: 'vegano', 'ninguna'
* `horario_entrenamiento`: 'manana' *(Excluir estrictamente si es 'noche' para evitar problemas de sueño)*
* imagen: `cpw.png`


* **Nitric Oxide Boosters / Stim-Free Pre-Workout (L-Citrulline, L-Arginine)**
* `objetivo_principal`: 'fuerza_potencia', 'hipertrofia'
* `nivel_experiencia`: 'intermedio', 'avanzado'
* `restriccion_dietetica`: 'vegano', 'ninguna'
* `horario_entrenamiento`: 'noche', 'manana' *(Excelente recomendación para quienes entrenan de noche y necesitan pump/rendimiento sin cafeína)*
* imagen: `nob.png`



### 3. Recovery & Sleep (Recuperación y Sueño)

Suplementos enfocados en el descanso del sistema nervioso central y la relajación muscular.

* **ZMA (Zinc, Magnesium, Vitamin B6)**
* `objetivo_principal`: 'recuperacion', 'bienestar'
* `nivel_experiencia`: 'intermedio', 'avanzado'
* `restriccion_dietetica`: 'vegano', 'ninguna'
* `horario_entrenamiento`: 'noche', 'manana' *(Se toma siempre antes de dormir, por lo que beneficia enormemente a quienes seleccionan 'noche' para ayudar a bajar revoluciones post-entreno)*
* imagen: `zma.png`


* **L-Glutamine**
* `objetivo_principal`: 'recuperacion'
* `nivel_experiencia`: 'intermedio', 'avanzado'
* `restriccion_dietetica`: 'vegano', 'ninguna'
* `horario_entrenamiento`: 'manana', 'noche'
* imagen: `lgm.png`


* **Ashwagandha (Root Extract)**
* `objetivo_principal`: 'bienestar', 'recuperacion'
* `nivel_experiencia`: 'intermedio', 'avanzado'
* `restriccion_dietetica`: 'vegano', 'ninguna'
* `horario_entrenamiento`: 'manana', 'noche' *(Modulador del cortisol, muy útil para el estrés físico)*
* imagen: `ash.png`



### 4. Health, Longevity & Wellness (Salud, Longevidad y Bienestar)

Suplementos de base para la salud general, ideales para cualquier nivel de experiencia.

* **Omega-3 Fish Oil**
* `objetivo_principal`: 'longevidad', 'bienestar', 'recuperacion'
* `nivel_experiencia`: 'principiante', 'intermedio', 'avanzado'
* `restriccion_dietetica`: 'ninguna' *(Excluir estrictamente si es vegano)*
* `horario_entrenamiento`: 'manana', 'noche'
* imagen: `om3.png`


* **Algal Oil Omega-3**
* `objetivo_principal`: 'longevidad', 'bienestar', 'recuperacion'
* `nivel_experiencia`: 'principiante', 'intermedio', 'avanzado'
* `restriccion_dietetica`: 'vegano', 'ninguna' *(Alternativa directa al aceite de pescado)*
* `horario_entrenamiento`: 'manana', 'noche'
* imagen: `ao3.png`


* **Multivitamin Complex**
* `objetivo_principal`: 'bienestar', 'longevidad'
* `nivel_experiencia`: 'principiante', 'intermedio', 'avanzado'
* `restriccion_dietetica`: 'vegano', 'ninguna' *(Asumiendo formulaciones aptas)*
* `horario_entrenamiento`: 'manana', 'noche'
* imagen: `mvc.png`


* **Vitamin D3 + K2**
* `objetivo_principal`: 'longevidad', 'bienestar'
* `nivel_experiencia`: 'principiante', 'intermedio', 'avanzado'
* `restriccion_dietetica`: 'vegano', 'ninguna' *(Existen versiones veganas de liquen)*
* `horario_entrenamiento`: 'manana', 'noche'
* imagen: `v3k2.png`



---

### Notas para la lógica del E-commerce

Al momento de programar el algoritmo de recomendación:

1. **Reglas de Exclusión (Filtros Duros):** Aplicar primero la restricción dietética. Si `restriccion_dietetica === 'vegano'`, elimina inmediatamente el *Whey Protein* y el *Fish Oil* del array de opciones antes de seguir procesando.
2. **Reglas de Horario (Filtros de Seguridad):** Si `horario_entrenamiento === 'noche'`, filtra cualquier producto clasificado como estimulante (*Caffeine Pre-Workout*) y dale un "boost" de puntuación a suplementos de relajación como el *ZMA* y el *Nitric Oxide Booster*.
3. **Sistema de Puntos (Scoring):** Por cada coincidencia entre el `objetivo_principal` del usuario y el suplemento, suma puntos. Los suplementos con mayor puntaje al final del proceso serán los que se muestren en el "carrito recomendado" de tu frontend.