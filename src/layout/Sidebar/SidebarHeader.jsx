import { ArrowBarToLeft } from 'tabler-icons-react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';
import { useGlobalStateContext } from '@/context/GolobalStateProvider';
//Images
import logo from '@/assets/mia-img/89dc2cab-e4c2-4769-a878-99a94dbc896f_1.png';


const SidebarHeader = () => {
    const { states, dispatch } = useGlobalStateContext();

    const toggleSidebar = () => {
        dispatch({ type: 'sidebar_toggle' });
    }

    return (
        <div className="menu-header">
            <span>
                <Link className="navbar-brand d-flex align-items-center" href="/">
                    <Image className="brand-img img-fluid" src={logo} alt="brand" style={{ width: "50px", marginLeft: "-5px" }} />
                    <h5 className="ms-2" style={{ marginTop: "10px" }}><b>Virtual MIA</b></h5>
                </Link>

                <Button variant="flush-dark" onClick={toggleSidebar} className="btn-icon btn-rounded flush-soft-hover navbar-toggle">
                    <span className="icon">
                        <span className="svg-icon fs-5">
                            <ArrowBarToLeft />
                        </span>
                    </span>
                </Button>
            </span>
        </div>
    )
}


export default SidebarHeader
