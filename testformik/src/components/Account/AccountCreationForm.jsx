import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'

const AccountCreationForm = () => {
    return (
        <div>
            <h1>Création du compte</h1>
            <Formik
                initialValues={{
                fullname: '',
                email: '',
                password: ''
                }}
                validationSchema={Yup.object({
                fullname: Yup.string()
                    .max(15, 'Doit être composé de 15 caractères ou moins')
                    .required('Requis'),
                email: Yup.string()
                    .max(20, 'Doit être composé de 20 caractères ou moins')
                    .required('Requis'),
                password: Yup.string()
                    .max(16, 'Doit être composé de 16 caractères ou moins')
                    .required('Requis')
                })}
                onSubmit={(values => {
                alert(JSON.stringify(values, null, 2))
                })
            }
            >   
                <Form className='form1'>
                <label htmlFor="fullname">Nom complet</label>
                <Field
                    type="text"
                    name="fullname" 
                />
                <div style={{ color: 'red', fontSize: '16px', marginBottom: '5px' }}>
                    <ErrorMessage name="fullname" />
                </div>
                
                <label htmlFor='email'>Email</label>
                <Field
                    type="email"
                    name="email" 
                />
                <div style={{ color: 'red', fontSize: '16px', marginBottom: '5px' }}>
                    <ErrorMessage name="email" />
                </div>
                

                <label htmlFor='password'>Mot de passe</label>
                <Field
                    type="password"
                    name="password"
                />
                <div style={{ color: 'red', fontSize: '16px', marginBottom: '5px' }}>
                    <ErrorMessage name="password" />
                </div>
                <button type="submit">S'inscrire</button>
                </Form> 
            </Formik>
        </div>
    )
}

export default AccountCreationForm