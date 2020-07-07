import React, { Component } from 'react';
import logo from '../img/pokemon.png';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import './Index.css';

export default class Index extends Component {

    state = {
        repositoryInput: '',
        repository: [],
    }

    render() {
        return (
            <div className="App-conteiner">
                <img src={logo} className="App-logo" alt="logo" />
                <Paper component="form" >
                    <IconButton aria-label="menu">
                        <MenuIcon />
                    </IconButton>

                    <InputBase
                        placeholder="Search Pokemon by Name"
                        className="App-Input"
                        value={this.state.repositoryInput}
                        onChange={e => this.setState({ repositoryInput: e.target.value })}
                    />
                    <Link to={`PokemonDetails/${this.state.repositoryInput}`} className='Link'>
                        <IconButton type="submit" aria-label="search" >
                            <SearchIcon />
                        </IconButton>
                    </Link>

                </Paper>

                <div className='Button-Group'>
                    <Link to={`PokemonDetails/${this.state.repositoryInput}`} className='Link'>
                        <Button className='App-Button' variant="outlined" color='primary'>Search Pokemon</Button>
                    </Link>
                    <Link to='/PokemonList' className='Link'>
                        <Button className='App-Button' variant="outlined" color='secondary'>List All Pokemon's</Button>
                    </Link>
                </div>
            </div >
        );
    }
}

