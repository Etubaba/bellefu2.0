import { Fragment } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import PropTypes from 'prop-types';


const NavLink = ({ to, icon, children, ...props }) => {
    const { pathname } = useRouter();
    const isActive = pathname === to ? true : false;

    if (isActive) {
        props.className += ' active';
    }

    const activeStyle = {
        background: props.className.includes('active') ? '#F9F9F9': '',
        color: props.className.includes('active') ? '#FFA500' : '#3F3F3F'
    };

    return (
        <div className="z-30">
            {/* <Link  href={to} passHref={true}> */}
            <p {...props} style={activeStyle}>
                { !children && 
                    <Fragment>
                        <span className="pt-1 px-3">
                        <icon.icon />
                        </span>
                        <span>{icon.text}</span>
                    </Fragment> 
                }
                
                { children && children}
            </p>
        {/* </Link> */}
        </div>
        
    );
};

NavLink.propTypes = {
    to: PropTypes.string.isRequired
};

export default NavLink;
