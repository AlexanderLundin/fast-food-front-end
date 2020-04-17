import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class OrderEdit extends Component {

    emptyItem = {
        id: '',
        customerName: '',
        createdAt: '',
        status: '',
        description: '',
        note: '',
        lastUpdated: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentDidMount() {
        this.setState({isLoading: true});
        fetch(`http://fastfoodrestapi-env.eba-mz87ac4w.us-east-2.elasticbeanstalk.com/api/orders/${this.props.match.params.id}`)
            .then(response => response.json())
            .then(data => this.setState(
                {item: data, isLoading: false})
            );
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const newFlag = this.props.match.params.id;
        newFlag === "new" ? this.postOrder() : this.patchOrder();

    }

    async postOrder(){
        const {item} = this.state;
        await fetch(`http://fastfoodrestapi-env.eba-mz87ac4w.us-east-2.elasticbeanstalk.com/api/orders`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/orders');
    }

    async patchOrder(){
        const {item} = this.state;
        await fetch(`http://fastfoodrestapi-env.eba-mz87ac4w.us-east-2.elasticbeanstalk.com/api/orders/${this.props.match.params.id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/orders');
    }

    render() {


        const {item} = this.state;
        const title = <h2>{this.props.match.params.id !== "" ? 'Edit Order' : 'Add Order'}</h2>;
        return <div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="customerName">customerName</Label>
                        <Input type="text" name="customerName" id="customerName" value={item.customerName || ''}
                               onChange={this.handleChange} autoComplete="name"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="createdAt">createdAt</Label>
                        <Input type="text" name="createdAt" id="createdAt" value={item.createdAt || ''}
                               onChange={this.handleChange} autoComplete=""/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="status">status</Label>
                        <Input type="text" name="status" id="status" value={item.status || ''}
                               onChange={this.handleChange} autoComplete=""/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">description</Label>
                        <Input type="text" name="description" id="description" value={item.description || ''}
                               onChange={this.handleChange} autoComplete=""/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="note">note</Label>
                        <Input type="text" name="note" id="note" value={item.note || ''}
                               onChange={this.handleChange} autoComplete=""/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="lastUpdated">lastUpdated</Label>
                        <Input type="text" name="lastUpdated" id="lastUpdated" value={item.lastUpdated || ''}
                               onChange={this.handleChange} autoComplete=""/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/orders">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(OrderEdit);