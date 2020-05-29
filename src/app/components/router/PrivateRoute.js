import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import routes from 'routes';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {

    const token = useSelector(store => store.auth.token);

    return (
        <Route
            {...rest}
            render={() =>
                (token !== null) ? (
                    <Component {...rest} />
                ) : (
                        <Redirect
                            to={{
                                pathname: routes.login,
                                state: { from: rest.location }
                            }}
                        />
                    )
            }
        />
    );
}

export default PrivateRoute;
