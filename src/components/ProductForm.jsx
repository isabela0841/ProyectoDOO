import { TextField, MenuItem } from "@mui/material";
import { useEffect, useState } from "react"
import { findAll } from "../services/CategoryService";

const initialDataForm = {
    id: 0,
    name: '',
    price: 0,
    mark: '',
    category: ''
}


// eslint-disable-next-line react/prop-types
export const ProductForm = ({ productSelected, handlerAdd }) => {

    const [categories, setCategories] = useState([]);

    const [form, setForm] = useState(initialDataForm);

    const { id, name, price, mark, category } = form;

    const getCategories = async () => {
        const result = await findAll();
        setCategories(result.data._embedded.categories);
    }

    useEffect(() => {
        setForm(productSelected);
        getCategories();
    }, [productSelected]);

    const handleSelectChange = (event) => {
        const selectedCategory = event.target.value;
        setForm({
            ...form,
            category: selectedCategory
        })
      };

    return (
        <form onSubmit={(event) => {
            event.preventDefault();
            console.log(name, price, mark, category);
            if (!name || !price || !mark || !category) {
                alert('Debe de completar los datos del formulario!')
                return;
            }
            // console.log(form);
            handlerAdd(form);
            setForm(initialDataForm);
        }}>
            <div>
                <input
                    placeholder="Nombre del producto"
                    className="form-control my-3 w-75"
                    name="name"
                    value={name}
                    onChange={(event) => setForm({
                        ...form,
                        name: event.target.value
                    })}
                />
            </div>
            <div>
                <input
                    placeholder="Precio $$$"
                    className="form-control my-3 w-75"
                    name="price"
                    value={price}
                    onChange={(event) => setForm({
                        ...form,
                        price: event.target.value
                    })}
                />
            </div>
            <div>
                <input
                    placeholder="Marca"
                    className="form-control my-3 w-75"
                    name="mark"
                    value={mark}
                    onChange={(event) => setForm({
                        ...form,
                        mark: event.target.value
                    })}
                />
            </div>
            <div>
                {/* <input
                    placeholder="Categoria"
                    className="form-control my-3 w-75"
                    name="category"
                    value={category}
                    onChange={(event) => setForm({
                        ...form,
                        category: event.target.value
                    })}
                /> */}
                <TextField
                    id="filled-select-currency"
                    select
                    label='Seleccionar categoria'
                    helperText='Seleccione la categoria del producto'
                    variant="filled"
                    defaultValue=''
                    value={category}
                    onChange={handleSelectChange}
                >
                    {categories.map((option) => (
                        <MenuItem key={option.id} value={option.name}>
                            {option.name}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
            <div>
                <button type="submit" className="btn btn-primary">
                    {id > 0 ? 'Modificar' : 'Crear'}
                </button>
            </div>
        </form>
    )
}