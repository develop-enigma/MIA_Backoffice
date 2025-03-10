import { Col, Container, Row } from 'react-bootstrap';

const CommonFooter1 = () => {
    return (
        <div className="hk-footer border-0">
            <Container as="footer" className="footer">
                <Row>
                    <div className="col-xl-8 text-center">
                        <p className="footer-text pb-0">
                            <span className="copy-text"><a href={"https://www.enigma-tech.it/"}>Enigma Tech SRL</a> © {new Date().getFullYear()} Tutti i diritti riservati.</span>
                            <a href="#some" target="_blank">Privacy Policy</a><span className="footer-link-sep">|</span>
                            <a href="#some" target="_blank">Termni&amp;Condizioni</a><span className="footer-link-sep"></span>
                        </p>
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default CommonFooter1
