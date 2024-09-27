const readline = require("readline");

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

class Pila {
  constructor() {
    this.items = [];
  }

  crear() {
    this.items = [];
  }

  obtener_pila() {
    return this.items;
  }

  apilar(elemento) {
    this.items.push(elemento);
  }

  desapilar() {
    if (this.esta_vacia()) {
      return false;
    }
    return this.items.pop();
  }

  esta_vacia() {
    return this.items.length === 0;
  }

  imprimir() {
    console.log("\n Los datos de la pila son: ", JSON.stringify(this.items));
  }
}

class Cola {
  constructor() {
    this.items = [];
  }

  crear() {
    this.items = [];
  }

  obtener_cola() {
    return this.items;
  }

  encolar(elemento) {
    this.items.push(elemento);
  }

  desencolar() {
    if (this.esta_vacia()) {
      return false;
    }
    return this.items.shift();
  }

  esta_vacia() {
    return this.items.length === 0;
  }

  imprimir() {
    console.log("\n Los datos de la cola son: ", JSON.stringify(this.items));
  }
}

function modificar_estructura(estructura, x) {
  const esCola = estructura instanceof Cola ? true : false;
  let elementos = estructura[esCola ? "obtener_cola" : "obtener_pila"]();

  if (!elementos.includes(x)) {
    console.log(`\n El elemento '${x}' no se encontró en la estructura.`);
    return;
  }

  const posElem = elementos.findIndex((elem) => x === elem);
  const cantidadElems = esCola ? posElem : elementos.length - posElem - 1;

  for (let index = 0; index < cantidadElems; index++) {
    estructura[esCola ? "desencolar" : "desapilar"]();
  }

  estructura.imprimir();
}

function mostrar_menu() {
  let pila = new Pila();
  let cola = new Cola();

  const menu = `
Elige una opción:
1. Crear Pila
2. Apilar en Pila
3. Desapilar de Pila
4. Imprimir Pila
5. Crear Cola
6. Encolar en Cola
7. Desencolar de Cola
8. Imprimir Cola
9. Modificar Estructura
0. Salir \n
Opción: `;

  function preguntar() {
    rl.question(menu, (opcion) => {
      switch (opcion) {
        case "1":
          pila.crear();
          console.log(`\n Pila creada con exito!`);
          break;
        case "2":
          rl.question("\n Ingresa el elemento a apilar: ", (elementoPila) => {
            pila.apilar(elementoPila);
            console.log(`\n Elemento '${elementoPila}' apilado con exito!`);
            preguntar();
          });
          return;
        case "3":
          const elemPila = pila.desapilar();
          console.log(`\n ${!elemPila ? "La pila está vacía" : `Elemento '${elemPila}' desapilado con exito!`}`);
          break;
        case "4":
          pila.imprimir();
          break;
        case "5":
          cola.crear();
          console.log(`\n Cola creada con exito!`);
          break;
        case "6":
          rl.question("\n Ingresa el elemento a encolar: ", (elementoCola) => {
            cola.encolar(elementoCola);
            console.log(`\n Elemento '${elementoCola}' encolado con exito!`);
            preguntar();
          });
          return;
        case "7":
          const elemCola = cola.desencolar();
          console.log(`\n ${!elemCola ? "La cola está vacía" : `Elemento '${elemCola}' desencolado con exito!`}`);
          break;
        case "8":
          cola.imprimir();
          break;
        case "9":
          function solicitarEstructura() {
            rl.question("\n Elige la estructura a modificar (pila/cola): ", (estructura) => {
              if (estructura === "pila" || estructura === "cola") {
                rl.question(" Ingresa el valor X: ", (x) => {
                  if (estructura === "pila") {
                    modificar_estructura(pila, x);
                  } else if (estructura === "cola") {
                    modificar_estructura(cola, x);
                  }
                  preguntar();
                });
              } else {
                console.log("\n Estructura no válida, vuelva a elegir el estructura.");
                solicitarEstructura();
              }
            });
          }
          solicitarEstructura();
          return;
        case "0":
          console.log("Saliendo del programa...");
          rl.close();
          return;
        default:
          console.log("Opción no válida, elige nuevamente.");
      }

      mensaje = "";
      preguntar();
    });
  }

  preguntar();
}

mostrar_menu();
