import React, {Component} from 'react';
import * as Database from '../../Database';
import './hero-list.css';

// Use React-Table, see https://react-table.js.org/#/story/readme
import ReactTable from "react-table";
// Use Default-Style from React-Table
import "react-table/react-table.css";

class HeroList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            heroes: []
        };
        this.subs = [];
        this.updateHero = this.updateHero.bind(this);
        this.renderEditable = this.renderEditable.bind(this);
    }
    async componentDidMount() {
        const db = await Database.get();
        const sub = db.heroes.find().sort({name: 1}).$.subscribe(heroes => {
            if (!heroes)
                return;
            console.log('reload heroes-list ');
            console.dir(heroes);
            this.setState({heroes: heroes});
        });
        this.subs.push(sub);
    }
    componentWillUnmount() {
        this.subs.forEach(sub => sub.unsubscribe());
    }

    async updateHero(hero) {
        const db = await Database.get();
        const name = hero.name.trim("<br>", "");
        const color = hero.color.trim().replace("<br>", "");
        db.heroes.upsert({name, color});
    }

    renderEditable(cellInfo) {
        const { heroes } = this.state;
        return (
          <div
            style={{ backgroundColor: "#FAFAFA" }}
            contentEditable
            suppressContentEditableWarning
            onBlur={e => {
              heroes[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
              this.setState({ heroes });
              this.updateHero( heroes[cellInfo.index]._data );
            }}
            dangerouslySetInnerHTML={{
              __html: heroes[cellInfo.index][cellInfo.column.id]
            }}
          />
        );
      }

    render() {
        const { heroes } = this.state;
        return (
            <div className="box">
              <div className="form-group field field-object">
                <fieldset><legend id="root_title">List</legend>
                  {heroes.length === 0 && <span>Loading..</span>}
                  <ReactTable
                    data={heroes}
                    columns={[
                      {
                        Header: "Color (View)",
                        accessor: "color",
                        Cell: row => (
                            <div
                              className="color-box"
                              style={{
                                background: row.value
                              }}
                            />
                        )
                      },
                      {
                        Header: "Color (Edit)",
                        accessor: "color",
                        Cell: this.renderEditable
                      },
                      {
                        // Editing is NOT allowed with Name as Primary Key
                        Header: "Name",
                        accessor: "name"
                      }
                    ]}
                    defaultPageSize={10}
                    className="-striped -highlight"
                  />
              </fieldset>
            </div>
          </div>
        );
    }
}

export default HeroList;
