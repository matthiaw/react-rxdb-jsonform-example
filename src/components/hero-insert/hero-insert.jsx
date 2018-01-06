import React, {Component} from 'react';
import * as Database from '../../Database';
import Form from "react-jsonschema-form";
import formSchemaHero from "../../schemas/hero.schema.json";
import emptyDataHero from "../../schemas/empty.hero.json";
import './hero-insert.css';

/**
 * React-Component which handles the form based creating and adding of a new hero-data-element to the database
 * New syntax which replaces the React.createClass, see https://toddmotto.com/react-create-class-versus-component/
 * extends Component
 * see link https://reactjs.org/docs/react-component.html|Component
 */
class HeroInsert extends Component {

    /** The constructor for a React component is called before it is mounted. When implementing the constructor for a React.Component subclass, you should call super(props) before any other statement. Otherwise, this.props will be undefined in the constructor, which can lead to bugs. Also for binding the EventHandlers and initializing the component state.
     * param {object} props - Property
     * @hideconstructor
     */
    constructor(props) {
        // Mandatory call to avoid strange behavior
        super(props);

        // Mandatory initialisation of the state. Replaces the deprecated function 'getInitialState'
        this.state = emptyDataHero;

        // Autobind from 'createClass' is not possible anymore, so it is necessary to bind amnually Event-Handlers, see https://medium.freecodecamp.org/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56
        this.addHero = this.addHero.bind(this);
    }

    /**
     * Empty Method
     */
    componentDidMount() {}

    /**
     * Empty Method
     */
    componentWillUnmount() {}

   /** OnSubmit-EventHandler for Hero Form
    * param {object} form - Result object which contains a 'formData' attribute which holds valid form data
    */
    async addHero(form) {
        const {name, color} = form.formData;
        const db = await Database.get();
        db.heroes.insert({name, color});
        this.setState(emptyDataHero);
    }

    /**
     * Component which create hero data
     * returns {component} React-Component which creates the Form to create and add a Hero-Dataset
     */
    render() {
        return (
            <div className="box">
                <Form schema={formSchemaHero}
                  onSubmit={this.addHero}
                />
            </div>
        );
    }
}

export default HeroInsert;
