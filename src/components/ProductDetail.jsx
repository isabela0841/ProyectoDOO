import { PropTypes } from "prop-types";
import Button from '@mui/material/Button';
import { Grid, IconButton, Table, TableBody, TableCell, TableRow } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

export const ProductDetail = ({ handlerProductSelected, handlerRemove, product = {} }) => {
    return (
        <TableRow
            key={product.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row"> {product.name} </TableCell>
            <TableCell align="right">{product.price}</TableCell>
            <TableCell align="right">{product.mark}</TableCell>
            <TableCell align="right">{product.category}</TableCell>
            <TableCell align="right">
                <Grid container spacing={0}>
                    <Grid item xs={6}>
                        <IconButton aria-label="edit" size="large" color="warning" onClick={() => handlerProductSelected(product)}>
                            <ModeEditIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={6}>
                        <IconButton aria-label="delete" size="large" color="error" onClick={() => handlerRemove(product.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </TableCell>
        </TableRow>
    )
}
ProductDetail.propTypes = {
    product: PropTypes.object.isRequired,
    handlerRemove: PropTypes.func.isRequired,
    handlerProductSelected: PropTypes.func.isRequired
}