import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AlignLeft } from 'react-feather';
import { Button, Container, Dropdown, Nav, Navbar } from 'react-bootstrap';
import { useAuth } from '@/app/AuthContext';
import avatar12 from '@/assets/img/avatar12.jpg';

const TopNav = () => {
    const { user, logout } = useAuth();

    return (
        <Navbar expand="xl" className="hk-navbar navbar-light fixed-top">
            <Container fluid>
                {/* Start Nav */}
                <div className="nav-start-wrap">
                    <Button variant="flush-dark" onClick={() => dispatch({ type: 'sidebar_toggle', sidebarCollapse: !states.sidebarCollapse })} className="btn-icon btn-rounded flush-soft-hover navbar-toggle d-xl-none">
                        <span className="icon">
                            <span className="feather-icon"><AlignLeft /></span>
                        </span>
                    </Button>
                </div>
                {/* End Nav */}

                {/* Nav end */}
                <div className="nav-end-wrap">
                    <Nav className="navbar-nav flex-row">
                        <Nav.Item>
                            <Dropdown className="ps-2">
                                <Dropdown.Toggle as={Link} href="#" className="no-caret">
                                    <div className="avatar avatar-rounded avatar-xs">
                                        <Image src={avatar12} alt="user" className="avatar-img" />
                                    </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu align="end">
                                    <div className="p-2">
                                        <div className="media">
                                            <div className="media-head me-2">
                                                <div className="avatar avatar-primary avatar-sm avatar-rounded">
                                                    <span className="initial-wrap"></span>
                                                </div>
                                            </div>
                                            <div className="media-body">
                                                <div className="d-block fw-medium text-dark">{user?.company?.email || "email non disponibile"}</div>
                                                <Link href="#" className="d-block fs-8 link-secondary" onClick={logout}>
                                                    <u>Logout</u>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <Dropdown.Divider as="div" />
                                    <Dropdown.Item as={Link} href="/profile">Profile</Dropdown.Item>
                                    <Dropdown.Item>Terms &amp; Conditions</Dropdown.Item>
                                    <Dropdown.Item>Help &amp; Support</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav.Item>
                    </Nav>
                </div>
                {/* /End Nav */}
            </Container>
        </Navbar>
    );
}

export default TopNav;
