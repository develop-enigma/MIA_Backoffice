"use client"
import { Col, Container, Form, InputGroup, Nav, Row, Tab } from 'react-bootstrap';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment';
import { Calendar } from 'react-feather';
import ActiveUserCard from './ActiveUserCard';
import AudienceReviewCard from './AudienceReviewCard';
import ReturningCustomersCard from './ReturningCustomersCard';
import CustomerTable from './CustomerTable';

const Dashboard = () => {

    return (
        <>
            <Container fluid="xxl" >
                <Tab.Container activeKey="overview">
                    {/* Page Header */}
                    <div className="hk-pg-header pg-header-wth-tab pt-7">
                        <div className="d-flex">
                            <div className="d-flex flex-wrap justify-content-between flex-1">
                                <div className="mb-lg-0 mb-2 me-8">
                                    <h1 className="pg-title">Welcome in MIA</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /Page Header */}
                    {/* Page Body */}
                    <div className="hk-pg-body">
                        <Tab.Content>
                            <Tab.Pane eventKey="overview" >
                                <Row>
                                    <Col xxl={9} lg={8} md={7} className="mb-md-4 mb-3">
                                        <AudienceReviewCard />
                                    </Col>
                                    <Col xxl={3} lg={4} md={5} className="mb-md-4 mb-3">
                                        <ReturningCustomersCard />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12} className="mb-md-4 mb-3">
                                        <ActiveUserCard />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12} className="mb-md-4 mb-3">
                                        <CustomerTable />
                                    </Col>
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey="demo_nav_1" />
                            <Tab.Pane eventKey="demo_nav_2" />
                        </Tab.Content>
                    </div>
                    {/* /Page Body */}
                </Tab.Container>
            </Container>
        </>
    )
}

export default Dashboard
