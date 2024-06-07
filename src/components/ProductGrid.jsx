import { PropTypes } from "prop-types"
import { ProductDetail } from "./ProductDetail"
import { TableBody, TableContainer, TableHead, TableCell, TableRow, Table } from "@mui/material"
import Paper from '@mui/material/Paper';

export const ProductGrid = ({ handlerProductSelected, handlerRemove, products = [] }) => {

    return (

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="products table">
                <TableHead>
                    <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell align="right">Precio</TableCell>
                        <TableCell align="right">Marca</TableCell>
                        <TableCell align="right">Categoria</TableCell>
                        <TableCell align="center">Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map(product => {
                        return <ProductDetail handlerProductSelected={handlerProductSelected} handlerRemove={handlerRemove} product={product} key={product.name} />
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

ProductGrid.propTypes = {
    products: PropTypes.array.isRequired,
    handlerRemove: PropTypes.func.isRequired,
    handlerProductSelected: PropTypes.func.isRequired
}