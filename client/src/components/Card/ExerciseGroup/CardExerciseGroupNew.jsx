import React from 'react';
import { ButtonGroup, Button, Card } from 'react-bootstrap';

class CardExerciseGroupNew extends React.Component {

    render() {
        return (
            <>
                <div className="col-md-4">
                    <Card className="mb-4 shadow-sm">
                        <Card.Body>
                            <h4>Add New Group</h4>
                            <div className="d-flex justify-content-between align-items-center pt-2">
                                <ButtonGroup>
                                    <Button href='/add/group' variant="outline-primary">Add</Button>
                                </ButtonGroup>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </>
        )
    }
}

export default CardExerciseGroupNew;