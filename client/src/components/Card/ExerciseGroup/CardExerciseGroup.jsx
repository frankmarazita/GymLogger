import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

import img_default_group from '../../../assets/img/default_group.png';

class CardExerciseGroup extends React.Component {

    render() {
        let exerciseGroup = this.props.exerciseGroup

        return (
            <div className="col-md-4">
                <div className="card mb-4 shadow-sm">
                    <a href={'/group/' + exerciseGroup.id}>
                        <img className="card-img-top" alt="Exercise Group" style={{ height: "245px", objectFit: "cover" }} src={ img_default_group } data-holder-rendered="true" title="" />
                    </a>
                    <div className="card-body">
                        <h4>{ exerciseGroup.name }</h4>
                        <p className="card-text" style={{ textAlign: "justify" }}>{ exerciseGroup.note }</p>
                        <div className="d-flex justify-content-between align-items-center">
                            <ButtonGroup>
                                <Button href={'/group/' + exerciseGroup.id} variant="outline-secondary">View</Button>
                                <Button href={'/edit/group/' + exerciseGroup.id} variant="outline-secondary">Edit</Button>
                            </ButtonGroup>
                            <small className="text-muted text-nowrap pl-1">{ exerciseGroup.exercises.length } Exercises</small>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CardExerciseGroup;