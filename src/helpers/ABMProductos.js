import firestore from '@react-native-firebase/firestore';


// delete form usuarios where id='xxx'
export const eliminarProducto = id =>{
  
  firestore().collection("Productos")
        .doc(id)
        .delete()
        .then(() => {
           console.log("Document successfully deleted!");
        }).catch((error) => {
          console.error("Error removing document: ", error);
        });

}

// insert into usuarios
export const agregarProducto = (producto) =>{
    
    const productosRef = firestore().collection("Productos");

    productosRef.doc(producto.nombreProducto).set({
        precio: producto.precioProducto, codigo: producto.codigoBarrasProducto, cantidad: 1})

}

export const agregarCompra = (producto) =>{
    
     // Create a reference to the SF doc.
        var sfDocRef = firestore().collection("ListaCompras").doc(producto.id);

        firestore().runTransaction(async (transaction) => 
        {

                const sfDoc = await transaction.get(sfDocRef);
                if (!sfDoc.exists) {
                        sfDocRef.set({
                                precio: producto.precio, codigo: producto.codigo, cantidad: producto.cantidad 
                        })
                                .then(() => {
                                        console.log("Document successfully written!");
                                })
                                .catch((error) => {
                                        console.error("Error writing document: ", error);
                                });
                }
                else {
                        var newPopulation = sfDoc.data().cantidad + 1;
                        console.log(newPopulation);

                        transaction.update(sfDocRef, { cantidad: newPopulation });
                }
        })
} 


// update usuarios set precio=....
export const editarPrecio = (id, nuevoPrecio) =>{
        console.log(id, nuevoPrecio)
        firestore().collection('Productos')
        .doc(id)
        .update({
            precio: nuevoPrecio
        })

}



