import React, { Component, Fragment } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './PokemonList.css';
import { Link } from 'react-router-dom';

class PokemonList extends Component {

    handlePokemonList = () => (
        this.props.AllPokemons.pokemons.map(pokemon =>


            <Card className="Card" >
                <img src={pokemon.image} alt='teste' className="Card-image"></img>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {pokemon.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {pokemon.types.map(type => " | " + type)}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <div className="Card-button">
                    <Link className="Link" to={`PokemonDetails/${pokemon.name}`}>
                        <Button size="small" color="primary">
                            Details
                         </Button>
                    </Link>
                    <Button className="Card-button" size="small" color="primary">
                        Edit
                        </Button>
                    <Link className="Link" to='/'>
                        <Button size="small" color="primary" >
                            Back
                        </Button>
                    </Link>
                </div>
            </Card>
        )
    )

    render() {

        const { AllPokemons } = this.props;
        return (
            <Fragment>
                {AllPokemons.loading ? <p>Loading...</p> : this.handlePokemonList()}
            </Fragment>
        );
    }
}

const PokemonQuery = gql`

query {
  pokemons(first: 152) {
    id
    number
    name
    image
    types
    
    }
  }
`
export default
    graphql(PokemonQuery, { name: 'AllPokemons' })(PokemonList);