import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

class CardExerciseGroupNew extends React.Component {

    render() {
        return (
            <div className="col-md-4">
                <div className="card mb-4 shadow-sm">
                    <div className="card-body">
                        <h4>Add New Group</h4>
                        <p className="card-text" style={{ textAlign: "justify" }}></p>
                        <div className="d-flex justify-content-between align-items-center">
                            <ButtonGroup>
                                <Button href='/add/group' variant="outline-primary">Add</Button>
                            </ButtonGroup>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CardExerciseGroupNew;