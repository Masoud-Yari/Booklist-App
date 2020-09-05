import React, {useState, useEffect, useCallback} from 'react';
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import MyTable from './components/MyTable';
import theme from './theme';
import {MuiThemeProvider} from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import {makeStyles} from '@material-ui/core/styles';
import {Button, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, TextField, Fab, LinearProgress} from '@material-ui/core';
import axios from 'axios';

const useStyle = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(3),
    right: theme.spacing(3),
    backgroundColor: '#F76FAF',
    color: '#fff'
  }
}))

function App() {

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchTextCopy, setSearchTextCopy] = useState('');

  const [searchResult, setSearchResult] = useState('');

  const [feilds, setFeilds] = useState({
    name: '',
    page: '',
    writer: '',
    year: ''
  });

  const [open, setOpen] = useState(false);

  const [searchFilter, setSearchFilter] = useState('name');

  useEffect(() => {
    setLoading(true);

    axios.get('/api/items').then(res => {
      setBooks(res.data)
      console.log(res)
      setLoading(false);
    })

  }, [])

  const handleChangeFilter = filter => {
      setSearchFilter(filter);
  }

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
    setFeilds({
      name: '',
      page: '',
      writer: '',
      year: ''
    });
  }

  const handleChange = useCallback( e => {
    setFeilds({...feilds,
      [e.target.name]: e.target.value
    })
  }, [feilds])


  const handleSubmit = feilds => {
    setLoading(true);

    axios.post('/api/items', feilds).then(res => {

      setBooks(prevBooks => [...prevBooks, res.data ]);
      setLoading(false);
      console.log(res);
      setFeilds({
        name: '',
        page: '',
        writer: '',
        year: ''
      });
    })
  }

  const handleDelete = id => {
    setLoading(true);

    axios.delete(`/api/items/${id}`).then(res => {
      setBooks(books.filter(book => book._id !== id));
      setLoading(false)
      console.log(res)
    })
    
  }

  const handleSearch = searchText => {
    setSearchTextCopy(searchText);
    setSearchResult(() => books.filter(book => {
      if(searchFilter === 'name' && book.name.toLowerCase().indexOf(searchText) === -1) return null;
          
      else if(searchFilter === 'writer' && book.writer.toLowerCase().indexOf(searchText) === -1) return null;

      else return true;
      
    }));
  }

  const classes = useStyle();

  if(loading) {
    return (
      <div style={{width: '100%', height: '100vh', backgroundColor: 'rgb(28, 37, 64)'}} >
        <LinearProgress />
      </div>
    )
  }else {
    return (
      <MuiThemeProvider theme={theme} >
        <div className="App">
        <div className="container">
          <Header />
          <SearchBar handleChangeFilter={handleChangeFilter} handleSearch={handleSearch} />
          <MyTable books={searchTextCopy ? searchResult : books} handleDelete={handleDelete} />
          <Fab className={classes.fab} onClick={handleClickOpen} >
            <AddIcon />
          </Fab>
          <Dialog open={open} onClose={handleClose} >
            <DialogTitle>Add New Book</DialogTitle>
            <DialogContent>
              <DialogContentText>Please fill in the blank and press Add button.</DialogContentText>
              <TextField onChange={(e) => handleChange(e)} name="name" value={feilds.name} label="Name" type="text" fullWidth autoFocus/>
              <TextField onChange={(e) => handleChange(e)} name="page" value={feilds.page} label="Page" type="number" />
              <TextField onChange={(e) => handleChange(e)} name="writer" value={feilds.writer} label="Writer" type="text" fullWidth />
              <TextField onChange={(e) => handleChange(e)} name="year" value={feilds.year} label="Year" type="number" />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleSubmit(feilds)} >Add</Button>
              <Button onClick={handleClose} >Cancel</Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
