import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';


class OrderList extends Component {

    constructor(props) {
        super(props);
        this.state = {orders: [], isLoading: true};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});
        fetch('http://fastfoodrestapi-env.eba-mz87ac4w.us-east-2.elasticbeanstalk.com/api/orders')
            .then(response => response.json())
            .then(data => this.setState(
                {orders: data, isLoading: false})
            );
    }

    async remove(id) {
        await fetch(`http://fastfoodrestapi-env.eba-mz87ac4w.us-east-2.elasticbeanstalk.com/api/orders/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedOrders = [...this.state.orders].filter(i => i.id !== id);
            this.setState({orders: updatedOrders});
        });
    }

    render() {
        const {orders, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }
        console.log(orders);
        const orderList = orders.map(order => {

            return <tr key={order.id}>
                <td style={{whiteSpace: 'nowrap'}}>{order.id}</td>
                <td>{order.customerName}</td>
                <td>{order.createdAt}</td>
                <td>{order.status}</td>
                <td>{order.description}</td>
                <td>{order.note}</td>
                <td>{order.lastUpdated}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/orders/" + order.id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(order.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/orders/new">Add Order</Button>
                    </div>
                    <h3>Order Request Table</h3>
                    <a target="_blank" href="http://fastfoodrestapi-env.eba-mz87ac4w.us-east-2.elasticbeanstalk.com/api/orders">Link to cloud hosted, server side, Spring Boot REST endpoint with CORS allowed</a>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="10%">Id</th>
                            <th width="15%">Customer Name</th>
                            <th width="15%">Created Date</th>
                            <th width="10%">Status</th>
                            <th>Note</th>
                            <th width="10%">Description</th>
                            <th width="10%">Updated Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orderList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default OrderList;