'use client'
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { useRouter } from 'next/navigation';

// Images
import logoImg from '@/assets/mia-img/89dc2cab-e4c2-4769-a878-99a94dbc896f_1.png';
import { loginUser } from '@/app/api/api';  // Importa la funzione centrale

const Login = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { error } = await loginUser(userName, password);

        if (error) {
            setError(error);
        } else {
            router.push('/');
        }
    }

    return (
        <div className="hk-pg-wrapper py-0">
            <div className="hk-pg-body py-0">
                <Container fluid>
                    <Row className="auth-split">
                        <Col xl={6} lg={6} md={7} className="position-relative mx-auto">
                            <div className="auth-content flex-column pt-8 pb-md-8 pb-13">
                               {/* <div className="text-center mb-7">
                                    <Link href="/" className="navbar-brand me-0">
                                        <Image className="brand-img d-inline-block" src={logo} alt="brand" />
                                    </Link>
                                </div>*/}
                                <Form className="w-100" onSubmit={handleSubmit}>
                                    <Row>
                                        <Col xl={7} sm={10} className="mx-auto">
                                            <div className="text-center mb-4">
                                                <h4>Accedi al tuo account</h4>
                                                <p>Inserisci mail e password per accedere all'account</p>
                                            </div>
                                            <Row className="gx-3">
                                                <Col as={Form.Group} lg={12} className="mb-3">
                                                    <div className="form-label-group">
                                                        <Form.Label>Email</Form.Label>
                                                    </div>
                                                    <Form.Control
                                                        placeholder="Enter username or email ID"
                                                        type="text"
                                                        value={userName}
                                                        onChange={(e) => setUserName(e.target.value)}
                                                    />
                                                </Col>
                                                <Col as={Form.Group} lg={12} className="mb-3">
                                                    <div className="form-label-group">
                                                        <Form.Label>Password</Form.Label>
                                                        <Link href="#" className="fs-7 fw-medium">Password dimenticata?</Link>
                                                    </div>
                                                    <InputGroup className="password-check">
                                                        <span className="input-affix-wrapper affix-wth-text">
                                                            <Form.Control
                                                                placeholder="Enter your password"
                                                                value={password}
                                                                onChange={(e) => setPassword(e.target.value)}
                                                                type={showPassword ? "text" : "password"}
                                                            />
                                                            <Link href="#"
                                                                  className="input-suffix text-primary text-uppercase fs-8 fw-medium"
                                                                  onClick={() => setShowPassword(!showPassword)}>
                                                                {showPassword ? <span>Nascondi</span> : <span>Mostra</span>}
                                                            </Link>
                                                        </span>
                                                    </InputGroup>
                                                </Col>
                                            </Row>
                                            {error && <div className="text-danger text-center mb-3">{error}</div>}
                                            <div className="d-flex justify-content-center">
                                                <Form.Check id="logged_in" className="form-check-sm mb-3">
                                                    <Form.Check.Input type="checkbox" defaultChecked />
                                                    <Form.Check.Label className="text-muted fs-7">Rimani connesso</Form.Check.Label>
                                                </Form.Check>
                                            </div>
                                            <Button variant="primary" type="submit" className="btn-uppercase btn-block">Login</Button>
                                            {/*<p className="p-xs mt-2 text-center">New to Jampack? <Link href="#"><u>Create new account</u></Link></p>*/}
                                            {/*<Link href="#" className="d-block extr-link text-center mt-4">
                                                <span className="feather-icon">
                                                    <ExternalLink />
                                                </span>
                                                <u className="text-muted">Send feedback to our help forum</u>
                                            </Link>*/}
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                            {/* Page Footer */}
                            <div className="hk-footer border-0">
                                <Container fluid as="footer" className="footer">
                                    <Row>
                                        <div className="col-xl-8 text-center">
                                            <p className="footer-text pb-0">
                                                <span className="copy-text"><a href={"https://www.enigma-tech.it/"}>Enigma Tech SRL</a> © {new Date().getFullYear()} Tutti i diritti riservati.</span>
                                                <a href="#some" target="_blank">Privacy Policy</a><span className="footer-link-sep">|</span>
                                                <a href="#some" target="_blank">T&amp;C</a><span className="footer-link-sep">|</span>
                                                <a href="#some" target="_blank">System Status</a>
                                            </p>
                                        </div>
                                    </Row>
                                </Container>
                            </div>
                        </Col> 
                        
                        <Col xl={6} lg={6} md={5} sm={10} className="d-md-block d-none position-relative" style={{ backgroundColor: '#f5dde7' }}>
                            <div className="auth-content flex-column text-center py-8">
                                <Row>
                                    <Col xxl={7} xl={8} lg={11} className="mx-auto">
                                        <h2 className="mb-4">MIA Avatar</h2>
                                        <p>L'unico avatar pensato per assistere il cliente negli E-Commerce di abbigliamento come un vero commesso.</p>{/*<Button variant="flush-primary" className="btn-uppercase mt-2">Take Tour</Button>*/}
                                    </Col>
                                </Row>
                                <Image src={logoImg} className="img-fluid w-sm-40 mt-7" alt="login" />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default Login;
