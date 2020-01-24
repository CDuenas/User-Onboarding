import React, { useState, useEffect } from "react";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const AnimalForm = ({ errors, touched, values, status }) => {
    const [user, setUser] = useState([]);




    return (
        <div className="user-form">
            <h1>User Form</h1>
            <Form>
                <Field 
                type="text"
                name="name"
                placeholder="Name"
                value={values.name}
                />
                <Field 
                type="text"
                name="email"
                placeholder="Email"
                value={values.email}
                />
                <Field 
                type="text"
                name="password"
                placeholder="Password"
                value={values.password}
                />
                <Field 
                type="checkbox"
                name="tos"
                value={values.tos}
                />
                <Field 
                type="text"
                name="name"
                placeholder="Name"
                value={values.name}
                />
            </Form>
        </div>
    )
}