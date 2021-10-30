import React from 'react';
import { ButtonGroup, Button, Card } from 'react-bootstrap';

import img_default_group from '../../../assets/img/default_group.png';

class CardExerciseGroup extends React.Component {

    render() {
        let exerciseGroup = this.props.exerciseGroup

        return (
            <>
                <div className="col-md-4">
                    <Card className="mb-4 shadow-sm">
                        <a href={'/group/' + exerciseGroup.id}>
                            <Card.Img variant="top" alt="Exercise Group" style={{ height: "245px", objectFit: "cover" }} src={ img_default_group } data-holder-rendered="true" title="" />
                        </a>
                        <Card.Body>
                            <h4>{exerciseGroup.name}</h4>
                            <Card.Text style={{ textAlign: "justify" }}>{exerciseGroup.note}</Card.Text>
                            <div className="d-flex justify-content-between align-items-center">
                                <ButtonGroup>
                                    <Button href={'/group/' + exerciseGroup.id} variant="outline-secondary">View</Button>
                                    <Button href={'/edit/group/' + exerciseGroup.id} variant="outline-secondary">Edit</Button>
                                </ButtonGroup>
                                <small className="text-muted text-nowrap pl-1">{exerciseGroup.exercises.length} Exercises</small>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </>
        );
    }
}

export default CardExerciseGroup;