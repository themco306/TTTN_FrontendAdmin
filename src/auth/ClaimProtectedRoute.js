import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AppRole from '../helpers/AppRole';

function ClaimProtectedRoute({ children, claimType, claimValue }) {
    const navigate = useNavigate();
    const roles = useSelector(state => state.authReducer.user?.roles);

    const claims = useSelector(state => state.authReducer.user?.claims);
    useEffect(() => {
        if (roles.includes(AppRole.SuperAdmin)) {
            return;
        }
        if (claims.length==0) {
            navigate('/403');
            return;
        }
        const foundClaim = claims.find(claim => claim.claimType === claimType);
        if (!foundClaim || !foundClaim.claimValues.includes(claimValue)) {
            navigate('/403');
        }
    }, [claims, claimType, claimValue, navigate]);

    // Trả về children nếu có quyền truy cập
    return children;
}

export default ClaimProtectedRoute;
