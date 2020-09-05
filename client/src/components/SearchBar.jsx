import React from 'react';
import {TextField, FormControl, Select, MenuItem, InputLabel, InputAdornment} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const SearchBar = ({handleSearch, handleChangeFilter}) => {

    return (
        <div className="search-wrapper">
            <TextField color="primary" onChange={e => handleSearch(e.target.value)} defaultValue="" label="Search" variant="outlined" InputProps={{ 
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                )
             }} />
            <FormControl variant="outlined" style={{ minWidth: 150 }} >
                <InputLabel id="label" >Filter</InputLabel>
                <Select onChange={e => handleChangeFilter(e.target.value)} defaultValue="name" labelId="label" label="label" >
                    <MenuItem  value="name" >Name</MenuItem>
                    <MenuItem  value="writer" >Writer</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}

export default SearchBar;
