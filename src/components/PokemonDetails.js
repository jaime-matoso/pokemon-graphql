import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import client from '../services/apollo';
import './PokemonList.css';

const PokemonQuery = gql`
query login($name: String!) {
     pokemon(name: $name) {
     id
     number
     name
     image
     types
     evolutions{
       id
       number
       name
       image
       types
     }
     attacks{
         fast{
             name
             type
             damage
         }
     }
     }
}
`

class PokemonDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: "Loading...",
            PokemonName: null,
            PokemonImage: null,
            PokemonTypes: [],
            PokemonNumber: null,
            PokemonEvolutions: [],
            PokemonAttacks: []
        };

        this.goBack = this.goBack.bind(this);
    };

    goBack() {
        this.props.history.goBack();
    }

    handlePokemon(name) {

        client.query({
            query: PokemonQuery,
            variables: {
                name
            }
        }).then(result => {

            console.log(result.data.pokemon.attacks.fast)

            result.data.pokemon == null ?
                this.setState({ msg: "No Pokemon to display" })
                : this.setState(
                    {
                        PokemonName: result.data.pokemon.name,
                        PokemonImage: result.data.pokemon.image,
                        PokemonTypes: result.data.pokemon.types,
                        PokemonNumber: result.data.pokemon.number,
                        PokemonEvolutions: result.data.pokemon.evolutions,
                        PokemonAttacks: result.data.pokemon.attacks.fast,

                    }
                );
            this.goBack.bind(this);
        }).catch(err => {
            console.log(err);
        })
    }

    componentWillMount() {
        this.handlePokemon(this.props.match.params.name);
    };

    render() {
        return (
            < Fragment >
                {
                    this.state.PokemonName != null ?

                        <Card className="Card" >
                            <h4>Pokemon</h4>
                            <img src={this.state.PokemonImage} alt='pokemon-img' className="Card-image"></img>
                            <CardActionArea>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        #{this.state.PokemonNumber}
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {this.state.PokemonName}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {this.state.PokemonTypes.map(type => " | " + type)}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>

                            <CardActionArea>
                                <h4>Attacks</h4>
                                <ul className="List">
                                    {this.state.PokemonAttacks.map(item =>
                                        <li> Name: {item.name}<br /> Damage: {item.damage} <br /> Type: {item.type} <br /></li>
                                    )}
                                </ul>
                            </CardActionArea>
                            <div >
                                <Button className="Card-button" size="small" color="primary">
                                    Edit
                            </Button>
                                <Button size="small" color="primary" onClick={this.goBack}>
                                    Back
                                 </Button>
                            </div>
                        </Card>
                        : <p>{this.state.msg}</p>
                }
                {

                    this.state.PokemonEvolutions != null ?

                        this.state.PokemonEvolutions.map(item =>
                            <Card className="Card" >
                                <h4>Evolution</h4>
                                <img src={item.image} alt='pokemon-img' className="Card-image"></img>
                                <CardActionArea>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            #{item.number}
                                        </Typography>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {item.name}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {item.types.map(type => " | " + type)}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <div >
                                    <Link to={item.name}>
                                        <Button onClick={() => this.handlePokemon(item.name)} className="Card-button" size="small" color="primary">
                                            View
                                    </Button>
                                    </Link>
                                </div>
                            </Card>
                        )
                        :
                        <p>* This pokemon doesn't have evolutions"</p>
                }


            </Fragment >
        );
    }
}

export default PokemonDetails;