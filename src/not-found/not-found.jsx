import React from 'react';
import "./not-found.scss";
import { Container, Row, Col, Button } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';

function NotFound () {
    return (
        <Container>
            <Row>
                <Col>
                    <h1 className="title">404 - Not Found</h1>
                    <h2>Are you lost?</h2>
                    <br />
                    <p>Hi Lost!. Why are you here?</p>
                    <br />
                    <LinkContainer to="/">
                        <Button variant="primary">Take me home!</Button>
                    </LinkContainer>
                </Col>
            </Row>
        </Container>
    );
};

export default NotFound;