import React, {useState} from 'react';
import {Table, TableBody, TableHead, TableCell, TableRow, IconButton, TableContainer,TablePagination} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import DeleteIcon from '@material-ui/icons/Delete';


const MyTable = ({books, handleDelete}) => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10)

    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(e.target.value);
        setPage(0);
    }

    if(books.length) {
        return (
            <TableContainer>
                <Table size= "small" >
                    <TableHead>
                        <TableRow style={{ textTransform: 'uppercase' }} >
                            <TableCell>Name</TableCell>
                            <TableCell>Page</TableCell>
                            <TableCell>Writer</TableCell>
                            <TableCell>Year</TableCell>
                            <TableCell>ID</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {books.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(book => (
                            <TableRow style={{ textTransform: 'capitalize' }} key={book._id} >
                                <TableCell component="th" scope="row" >{book.name}</TableCell>
                                <TableCell >{book.page}</TableCell>
                                <TableCell >{book.writer}</TableCell>
                                <TableCell >{book.year}</TableCell>
                                <TableCell>{book._id}</TableCell>
                                <TableCell><IconButton color= "secondary" onClick={ () => handleDelete(book._id)} ><DeleteIcon /></IconButton></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    count={books.length}
                    rowsPerPageOptions={[10, 15, 20]}
                    page={page}
                    onChangePage={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </TableContainer>
        )
    }else {
        return(
            <Alert variant="filled" severity="error">No Result</Alert>
        )
    }
    
}

export default MyTable;