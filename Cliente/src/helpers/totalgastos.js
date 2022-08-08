export const totalGasto = (gastos) => {

  let total = 0;

  gastos && gastos.map((gasto) => 
        total = total + parseInt (gasto.precio)
  );

  return total;
  
};
