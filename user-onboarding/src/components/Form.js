import React, { useState, useEffect } from "react";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = ({ errors, touched, values, status, handleSubmit }) => {
    const [users, setUsers] = useState([{ name: 'chris', email:'chris@LS.com' , password: 'hadsfg'}]);

    useEffect(() => {
        status && setUsers([...users, status]);
      }, [status]);


    return (
        <div className="user-form">
            <h1>User Form</h1>
            <Form onSubmit={handleSubmit}>
                <Field 
                type="text"
                name="name"
                placeholder="Name"
                value={values.name}
                />
                {touched.name && errors.name && <p>{errors.name}</p>}

                <Field 
                type="text"
                name="email"
                placeholder="Email"
                value={values.email}
                />
                {touched.email && errors.email && <p>{errors.email}</p>}

                <Field 
                type="text"
                name="password"
                placeholder="Password"
                value={values.password}
                />
                {touched.password && errors.password && <p>{errors.password}</p>}

                <label>
                    Do you agree to the terms of service?
                    <Field type="checkbox" name="tos" />
                </label>

                <button type="button" onClick={handleSubmit}>Submit</button>
            </Form>

            {users.map(user => (
                <ul>
                    <li>Name: {user.name}</li>
                    <li>Email: {user.email}</li>
                    <li>Password: {user.password}</li>
                </ul> 
            ))}
        </div>
    );
};

const FormikUserForm = withFormik({
    mapPropsToValues: ({ name, email, password, tos }) => {
        return {
            name: name || "",
            email:  email || "",
            password: password || "",
            tos: tos || false
        };
    },


    validationSchema: Yup.object().shape({
        name: Yup.string().required("Please provide your name!"),
        email: Yup.string().required("Please provide your email-address"),
        password: Yup.string().required("Please enter your password"),
        tos: Yup.bool()
    }),

    handleSubmit:(values, { setStatus, resetForm , setSubmitting}) => {
        console.log(values);
        axios
            .post("https://reqres.in/api/users", values)

            .then(res => {
                console.log("Succes:", res);
                setStatus(res.data);
                resetForm();
                setSubmitting(false);
            })
            .catch(err => {
                console.log("Error:", err);
                setSubmitting(false);
            });
    }
})(UserForm);


export default FormikUserForm;