// Importa el módulo 'readline' para manejar la entrada y salida de la consola
const readline = require("readline");

// Crea una interfaz de lectura para la entrada estándar (teclado) y salida estándar (pantalla)
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

// Clase que representa una pila
class Pila {
  constructor() {
    // Se inicializa un arreglo vacío para almacenar los elementos de la pila
    this.items = [];
  }

  // Método para crear una nueva pila (reiniciar)
  crear() {
    this.items = [];
  }

  // Método para obtener los elementos de la pila
  obtener_pila() {
    return this.items;
  }

  // Método para apilar un nuevo elemento o un arreglo de elementos
  apilar(valor) {
    if (esArreglo(valor)) {
      // Convierte el valor en un arreglo
      const arregloElems = JSON.parse(valor);

      // Agrega los elementos al final del arreglo
      arregloElems.forEach((item) => {
        this.items.push(esNumero(item));
      });
    } else {
      // Agrega el elemento al final del arreglo
      this.items.push(esNumero(valor));
    }
  }

  // Método para desapilar un elemento
  desapilar() {
    // Verifica si la pila está vacía
    if (this.esta_vacia()) {
      return false; // Retorna falso si está vacía
    }
    // Retorna el último elemento de la pila
    return this.items.pop();
  }

  // Método para verificar si la pila está vacía
  esta_vacia() {
    // Retorna verdadero si no hay elementos
    return this.items.length === 0;
  }

  // Método para imprimir los elementos de la pila
  imprimir() {
    console.log("\n Los datos de la pila son: ", JSON.stringify(this.items));
  }
}

// Clase que representa una cola
class Cola {
  constructor() {
    // Se inicializa un arreglo vacío para almacenar los elementos de la cola
    this.items = [];
  }

  // Método para crear una nueva cola (reiniciar)
  crear() {
    this.items = [];
  }

  // Método para obtener los elementos de la cola
  obtener_cola() {
    return this.items;
  }

  // Método para encolar un nuevo elemento o un arreglo de elementos
  encolar(valor) {
    if (esArreglo(valor)) {
      // Convierte el valor en un arreglo
      const arregloElems = JSON.parse(valor);

      // Agrega los elementos al inicio del arreglo
      arregloElems.forEach((item) => {
        this.items.push(esNumero(item));
      });
    } else {
      // Agrega el elemento al inicio del arreglo
      this.items.push(esNumero(valor));
    }
  }

  // Método para desencolar un elemento
  desencolar() {
    // Verifica si la cola está vacía
    if (this.esta_vacia()) {
      return false; // Retorna falso si está vacía
    }
    // Retorna el último elemento de la cola
    return this.items.shift();
  }

  // Método para verificar si la cola está vacía
  esta_vacia() {
    // Retorna verdadero si no hay elementos
    return this.items.length === 0;
  }

  // Método para imprimir los elementos de la cola
  imprimir() {
    console.log("\n Los datos de la cola son: ", JSON.stringify(this.items));
  }
}

function esNumero(elemento) {
  // Valida si el elemento es de tipo numerico y retorna el valor nuevamente
  return isNaN(elemento) ? elemento : Number(elemento);
}

function esArreglo(valor) {
  // Valida si el valor es de tipo arreglo, si lo es retorna verdadero, sino retorna falso
  try {
    const parsed = JSON.parse(valor);
    return Array.isArray(parsed);
  } catch {
    return false;
  }
}

// Función para modificar la estructura (pila o cola)
function modificar_estructura(estructura, x) {
  console.time("Tiempo de ejecución");
  // Valida si el elemento es de tipo numerico para convertirlo a numero
  const valor = esNumero(x);
  // Verifica si la estructura es una cola
  const esCola = estructura instanceof Cola ? true : false;
  // Obtiene los elementos de la estructura correspondiente
  let elementos = estructura[esCola ? "obtener_cola" : "obtener_pila"]();

  // Verifica si el elemento x está en la estructura
  if (!elementos.includes(valor)) {
    console.log(`\n El elemento '${valor}' no se encontró en la estructura.`);
    return; // Sale si no se encuentra el elemento
  }

  // Encuentra la posición del elemento x en la pila/cola
  const posElem = elementos.findIndex((elem) => valor === elem);
  // Dependiendo de la estructura coloca la cantidad de elementos a eliminar
  const cantidadElems = esCola ? posElem : elementos.length - posElem - 1;

  // Desapila o desencola los elementos hasta llegar a x
  for (let index = 0; index < cantidadElems; index++) {
    estructura[esCola ? "desencolar" : "desapilar"]();
  }

  // Imprime la estructura después de la modificación
  estructura.imprimir();
  console.timeEnd("Tiempo de ejecución");
}

// Función para mostrar el menú de opciones
function mostrar_menu() {
  let pila = new Pila(); // Crea una nueva instancia de Pila
  let cola = new Cola(); // Crea una nueva instancia de Cola

  // Define el menú de opciones
  const menu = `
Elige una opción:
1. Crear Pila
2. Apilar en Pila (elemento o arreglo de elementos)
3. Desapilar de Pila
4. Imprimir Pila
5. Crear Cola
6. Encolar en Cola (elemento o arreglo de elementos)
7. Desencolar de Cola
8. Imprimir Cola
9. Modificar Estructura
0. Salir \n
Opción: `;

  // Función para preguntar al usuario por una opción
  function preguntar() {
    rl.question(menu, (opcion) => {
      switch (opcion) {
        case "1":
          pila.crear(); // Opcion 1: Crea una nueva pila
          console.log(`\n Pila creada con exito!`);
          break;
        case "2":
          // Opcion 2: Apilar un nuevo elemento
          rl.question("\n Ingresa el elemento a apilar: ", (elementoPila) => {
            pila.apilar(elementoPila); // Apila el elemento ingresado
            const esPlural = esArreglo(elementoPila) ? "s" : "";
            console.log(`\n Elemento${esPlural} '${elementoPila}' apilado${esPlural} con exito!`);
            preguntar(); // Vuelve a preguntar
          });
          return;
        case "3":
          const elemPila = pila.desapilar(); // Opcion 3: Desapila un elemento
          console.log(`\n ${!elemPila ? "La pila está vacía" : `Elemento '${elemPila}' desapilado con exito!`}`);
          break;
        case "4":
          pila.imprimir(); // Opcion 4: Imprime los elementos de la pila
          break;
        case "5":
          cola.crear(); // Opcion 5: Crea una nueva cola
          console.log(`\n Cola creada con exito!`);
          break;
        case "6":
          // Opcion 6: Encolar un nuevo elemento
          rl.question("\n Ingresa el elemento a encolar: ", (elementoCola) => {
            cola.encolar(elementoCola); // Encola el elemento ingresado
            const esPlural = esArreglo(elementoCola) ? "s" : "";
            console.log(`\n Elemento${esPlural} '${elementoCola}' encolado${esPlural} con exito!`);
            preguntar(); // Vuelve a preguntar
          });
          return;
        case "7":
          const elemCola = cola.desencolar(); // Opcion 7: Desencola un elemento
          console.log(`\n ${!elemCola ? "La cola está vacía" : `Elemento '${elemCola}' desencolado con exito!`}`);
          break;
        case "8":
          cola.imprimir(); // Opcion 8: Imprime los elementos de la cola
          break;
        case "9":
          // Funcion para solicitar el tipo de estructura recursivamente hasta que se ingrese correctamente
          function solicitarEstructura() {
            rl.question("\n Elige la estructura a modificar (pila/cola): ", (estructura) => {
              if (estructura === "pila" || estructura === "cola") {
                // Se solicita el valor X
                rl.question(" Ingresa el valor X: ", (x) => {
                  if (estructura === "pila") {
                    modificar_estructura(pila, x); // Modifica la pila
                  } else if (estructura === "cola") {
                    modificar_estructura(cola, x); // Modifica la cola
                  }
                  preguntar(); // Vuelve a preguntar
                });
              } else {
                console.log("\n Estructura no válida, vuelva a elegir el estructura.");
                solicitarEstructura(); // Vuelve a solicitar la estructura del tipo de estructura
              }
            });
          }
          solicitarEstructura(); // Llama a la función para solicitar la estructura
          return;
        case "0":
          console.log("Saliendo del programa..."); // Mensaje de salida
          rl.close(); // Cierra la interfaz de lectura
          return;
        default:
          console.log("Opción no válida, elige nuevamente."); // Mensaje de opción no válida
      }

      preguntar(); // Vuelve a preguntar
    });
  }

  preguntar(); // Inicia el proceso de preguntar
}

// Llama a la función para mostrar el menú
mostrar_menu();
