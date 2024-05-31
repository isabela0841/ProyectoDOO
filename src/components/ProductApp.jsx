import { useEffect, useState } from "react";
import { create, findAll, remove, update } from "../services/ProductService";
import { ProductGrid } from "./ProductGrid";
import { PropTypes } from 'prop-types';
import { ProductForm } from "./ProductForm";
import { useAlert } from './alert/AlertContext';

export const ProductApp = ({ title }) => {

    const [products, setProducts] = useState([]);

    const [productSelected, setProductSelected] = useState({
        id: 0,
        name: '',
        price: 0,
        mark: '',
        category: ''
    })

    const { addAlert } = useAlert();

    const getProducts = async () => {
        const result = await findAll();
        setProducts(result.data._embedded.products);
    }

    useEffect(() => {
        getProducts();
    }, []);

    const handlerAddProduct = async (product) => {
        console.log(products);
        try {
            if (product.id > 0) {
                const response = await update(product);

                setProducts(products.map(prod => {
                    if (prod.id == response.data.id) {
                        return { ...response.data }
                    }
                    addAlert('success',  'Se ha actualizado el producto con éxito');
                    return prod;

                }));
            } else {
                product.id = products.length + 1;
                const response = await create(product);
                setProducts([...products, { ...response.data }]);
                addAlert('success', 'Se ha creado el producto con éxito');
            }
        } catch (error) {
            addAlert('error', 'Error al agregar/modificar el producto:');
        }

    }
    const handlerRemoveProduct = async (id) => {
        try {
            await remove(id);
            setProducts(products.filter(product => product.id != id));
            addAlert('success', 'Se ha eliminado el producto con éxito');
        } catch (error) {
            addAlert('error', 'Error al eliminar el producto:');
        }

    }

    const handlerProductSelected = (product) => {
        setProductSelected({ ...product });
    }
    return (
        <div className="container my-4">
            <h2>{title}</h2>
            <div className="row">
                <div className="col">
                    <ProductForm handlerAdd={handlerAddProduct} productSelected={productSelected} alert={alert}/>
                </div>
                <div className="col">
                    {
                        products.length > 0 ? <ProductGrid products={products} handlerRemove={handlerRemoveProduct} handlerProductSelected={handlerProductSelected} />
                            : <div className="alert alert-warning">No hay productos registrados!</div>
                    }

                </div>
            </div>
        </div>
    )
}
ProductApp.propTypes = {
    title: PropTypes.string.isRequired
}