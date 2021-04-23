import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const CheckedIcon = () => <>&deg;C</>;
const UncheckedIcon = () => <>&deg;F</>;

const ToggleButton = ( props ) => {

    const [toggle, setToggle] = React.useState(false);
    const { defaultChecked, onChange, className } = props;

    React.useEffect(() => {
        if (defaultChecked) {
            setToggle(defaultChecked)
        }
    }, [defaultChecked]);

    const triggerToggle = () => {
        setToggle(!toggle);

        if ( typeof onChange === 'function' ) {
            onChange(!toggle);
        }
    }

    
    const toggleClasses = classNames('wrg-toggle', {
        'wrg-toggle--checked': toggle
    }, className);

    return (
        <div onClick={triggerToggle} className={toggleClasses}>
            <div className="wrg-toggle-container">
                <div className="wrg-toggle-check">
                    <span><CheckedIcon /></span>
                </div>
                <div className="wrg-toggle-uncheck">
                    <span><UncheckedIcon /></span>
                </div>
            </div>
            <div className="wrg-toggle-circle"></div>
            <input type="checkbox" aria-label="Toggle Button" className="wrg-toggle-input" />
        </div>
    );
}

ToggleButton.propTypes = {
    defaultChecked: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func,
    icons: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.shape({
            checked: PropTypes.node,
            unchecked: PropTypes.node
        })
    ])
};

export default ToggleButton;