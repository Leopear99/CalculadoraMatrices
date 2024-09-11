import React, { useState } from 'react';
import './MatrizCalculadora.css'; // Importar el CSS
import {
  sumarMatrices,
  restarMatrices,
  multiplicarMatrices,
  dividirMatrices
} from '../utils/operacionesMatrices';
import {
  agregarFilaColumnaAmbas,
  reducirFilaColumnaAmbas
} from '../utils/manejoMatrices';

type Matriz = number[][];

const MatrizCalculadora: React.FC = () => {
  const [matriz1, setMatriz1] = useState<Matriz>([[0]]);
  const [matriz2, setMatriz2] = useState<Matriz>([[0]]);
  const [resultado, setResultado] = useState<Matriz>([]);
  const [operacion, setOperacion] = useState<"suma" | "resta" | "multiplicacion" | "division">("suma");

  const handleMatrizChange = (e: React.ChangeEvent<HTMLInputElement>, setMatriz: React.Dispatch<React.SetStateAction<Matriz>>, filaIdx: number, colIdx: number) => {
    const nuevaMatriz = [...(setMatriz === setMatriz1 ? matriz1 : matriz2)];
    nuevaMatriz[filaIdx][colIdx] = parseFloat(e.target.value);
    setMatriz(nuevaMatriz);
  };

  const realizarOperacion = () => {
    let res: Matriz;
    switch (operacion) {
      case "suma":
        res = sumarMatrices(matriz1, matriz2);
        break;
      case "resta":
        res = restarMatrices(matriz1, matriz2);
        break;
      case "multiplicacion":
        res = multiplicarMatrices(matriz1, matriz2);
        break;
      case "division":
        res = dividirMatrices(matriz1, matriz2);
        break;
      default:
        res = [];
    }
    setResultado(res);
  };

  return (
    <div className="matriz-calculadora">
      <h2>Calculadora de Matrices</h2>
      
      <select value={operacion} onChange={(e) => setOperacion(e.target.value as "suma" | "resta" | "multiplicacion" | "division")}>
        <option value="suma">Suma</option>
        <option value="resta">Resta</option>
        <option value="multiplicacion">Multiplicación</option>
        <option value="division">División</option>
      </select>

      <div>
        <h3>Matriz 1</h3>
        <div className="matriz">
          {matriz1.map((fila, filaIdx) => (
            <div key={filaIdx}>
              {fila.map((valor, colIdx) => (
                <input
                  key={colIdx}
                  type="number"
                  value={valor}
                  onChange={(e) => handleMatrizChange(e, setMatriz1, filaIdx, colIdx)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3>Matriz 2</h3>
        <div className="matriz">
          {matriz2.map((fila, filaIdx) => (
            <div key={filaIdx}>
              {fila.map((valor, colIdx) => (
                <input
                  key={colIdx}
                  type="number"
                  value={valor}
                  onChange={(e) => handleMatrizChange(e, setMatriz2, filaIdx, colIdx)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <button onClick={() => agregarFilaColumnaAmbas(matriz1, matriz2, setMatriz1, setMatriz2)}>
        Agregar Fila/Columna
      </button>
      <button onClick={() => reducirFilaColumnaAmbas(matriz1, matriz2, setMatriz1, setMatriz2)}>
        Reducir Fila/Columna
      </button>

      <button onClick={realizarOperacion}>Calcular</button>

      {resultado.length > 0 && (
        <div className="resultado">
          <h3>Resultado</h3>
          {resultado.map((fila, filaIdx) => (
            <div key={filaIdx}>
              {fila.map((valor, colIdx) => (
                <span key={colIdx}>{valor} </span>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MatrizCalculadora;
