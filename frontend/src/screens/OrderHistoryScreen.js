import React, {useContext} from 'react';
import {Helmet} from "react-helmet-async";
import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/LoadingBox";
import {Store} from "../Store";
import {useNavigate} from "react-router-dom";


export default function OrderHistoryScreen() {
    const {state} = useContext(Store);
    const {userInfo} = state;
    const navigate = useNavigate();

    return (
        <div>
            <Helmet>
                <title>Order History</title>
            </Helmet>

            <h1>Order History</h1>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <table className="table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>DATE</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>
                        <th>ACTIONS</th>
                    </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            )}
        </div>
    )
}