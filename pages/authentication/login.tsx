import React, { useEffect, useState } from 'react'
import { Lock, Mail } from 'react-feather'
import { Card, CardBody, Col, Container, Row } from 'reactstrap'
import { toast } from 'react-toastify'
import Img from '../../components/Common/Image'
import { useForm } from 'react-hook-form'
import EmailField from '../../components/custom-components/forms/EmailField'
import PasswordField from '../../components/custom-components/forms/PasswordField'
import loginImage from '../../public/assets/custom-images/login/login.jpg'
import { signIn } from 'next-auth/react'
import RequireGuest from '../../features/auth/components/RequireGuest'
import { authData } from '../../features/auth/data/authData'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const LogIn = () => {
    // const schema = yup.object({
    //     email: yup
    //         .string()
    //         .required()
    //         .matches(/^[A-Za-z0-9._%+-]+@remarkestate\.com$/),
    //     password: yup.string().required(),
    //     user_type: yup.string(),
    // })

    const {
        formState: { errors },
        handleSubmit,
        register,
        formState: { isSubmitting },
        setValue,
        getValues,
        setFocus,
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
            user_type: 'agent',
        },
    })

    useEffect(() => {
        setInterval(() => {
            document.querySelectorAll('input').forEach((el) => {})
        }, 1000)
    }, [])

    const [showpassword, setShowpassword] = useState(false)

    async function onLoginFormSubmit(values: any) {
        const formsValues = {
            email: values.email,
            password: values.password,
            userType: values.user_type,
        }
        if (
            formsValues.userType != 'admin' 
            &&
            !/^[A-Za-z0-9._%+-]+@remarkestate\.com$/.test(formsValues.email)
        ) {
            toast.error('Invalid email!')
            return
        }

        const signInResult: any = await signIn('credentials', {
            ...formsValues,
            redirect: false,
        })
        if (signInResult.ok) {
            toast.success(authData.messages.login)
            return
        }
        toast.error('Please check your email and password!')
    }
    // useEffect(() => {
    //   setTimeout(() => {
    //     ["email","password"]?.forEach((item) => {
    //       document.getElementsByName(item)[0].addEventListener("focus", (e) => {
    //         console.log(e.target.value)
    //       });
    //     });
    //   }, 2000);
    // }, []);

    return (
        <div className="authentication-box">
            <Container fluid={true} className="container-fluid">
                <Row className="log-in">
                    <Col
                        xxl="3"
                        xl="4"
                        lg="5"
                        md="6"
                        sm="8"
                        className="form-login"
                    >
                        <Card className="card">
                            <CardBody className="card-body">
                                <div className="title-3 text-start">
                                    <h2>Log in</h2>
                                </div>
                                <form
                                    onSubmit={handleSubmit(onLoginFormSubmit)}
                                    className="custom-login-form"
                                >
                                    <div className="form-group mb-2">
                                        <div className="input-group gap-2">
                                            <div className="input-group-prepend">
                                                <Mail
                                                    size={20}
                                                    className="mt-1"
                                                />
                                            </div>
                                            <EmailField
                                                name="email"
                                                placeholder="agent@example.com"
                                                register={register}
                                                errors={errors}
                                                label="Email"
                                                showLabel={false}
                                                containerClassName="flex-grow-1"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group mb-2">
                                        <div className="input-group gap-2">
                                            <div className="input-group-prepend">
                                                <Lock
                                                    size={20}
                                                    className="mt-1"
                                                />
                                            </div>
                                            <PasswordField
                                                type={`${
                                                    showpassword
                                                        ? 'text'
                                                        : 'password'
                                                }`}
                                                name="password"
                                                placeholder="password"
                                                register={register}
                                                errors={errors}
                                                label="Password"
                                                showLabel={false}
                                                containerClassName="flex-grow-1"
                                            />
                                            <div className="input-group-apend custom-password-eye-btn">
                                                <i
                                                    id="pwd-icon"
                                                    className={`far fa-eye${
                                                        !showpassword
                                                            ? '-slash'
                                                            : ''
                                                    } mt-2`}
                                                    onClick={() => {
                                                        setShowpassword(
                                                            !showpassword
                                                        )
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="d-flex">
                    <label className="d-block mb-0" htmlFor="chk-ani">
                      <input
                        className="checkbox_animated"
                        id="chk-ani"
                        type="checkbox"
                      />{" "}
                      Remember me
                    </label>
                    <Link
                      href="https://sheltos-react.vercel.app/pages/other-pages/forgot-password"
                      className="font-rubik"
                    >
                      Forgot password ?
                    </Link>
                  </div> */}

                                    <div className="d-flex flex-column align-items-start input-group">
                                        <hr
                                            className="w-100"
                                            style={{
                                                borderTop: '1px solide #cecece',
                                            }}
                                        />
                                        <div className="login-type-choices d-flex justify-content-between align-self-stretch align-items-center mb-0">
                                            <h3 className="h6 mb-0">
                                                Login as
                                            </h3>
                                            <div className="d-flex mb-0 gap-3">
                                                <div className="pill-radio-button">
                                                    <input
                                                        type="radio"
                                                        value="agent"
                                                        id="agent-type"
                                                        {...register(
                                                            'user_type'
                                                        )}
                                                    />
                                                    <label htmlFor="agent-type">
                                                        Agent
                                                    </label>
                                                </div>
                                                <div className="pill-radio-button">
                                                    <input
                                                        type="radio"
                                                        value="admin"
                                                        id="admin-type"
                                                        {...register(
                                                            'user_type'
                                                        )}
                                                    />
                                                    <label htmlFor="admin-type">
                                                        Admin
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        <hr
                                            className="w-100"
                                            style={{
                                                borderTop: '1px solide #cecece',
                                            }}
                                        />
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="btn btn-gradient btn-pill me-sm-3 me-2"
                                            disabled={isSubmitting}
                                        >
                                            Log in
                                        </button>
                                        {/* <Link href="/authentication/signup" className="btn btn-dashed btn-pill">Create Account</Link> */}
                                    </div>
                                </form>
                                {/* <div className="divider">
                  <h6>or</h6>
                </div>
                <div>
                  <h6>Log in with</h6>
                  <Row className="social-connect">
                    <Col sm="6">
                      <Link
                        href="https://www.facebook.com/"
                        className="btn btn-social btn-flat facebook p-0"
                      >
                        <i className="fab fa-facebook-f" />
                        <span>Facebook</span>
                      </Link>
                    </Col>
                    <Col sm="6">
                      <Link
                        href="https://twitter.com/"
                        className="btn btn-social btn-flat twitter p-0"
                      >
                        <i className="fab fa-twitter" />
                        <span>Twitter</span>
                      </Link>
                    </Col>
                    <Col sm="6">
                      <Link
                        href="https://accounts.google.com/"
                        className="btn btn-social btn-flat google p-0"
                      >
                        <i className="fab fa-google" />
                        <span>Google</span>
                      </Link>
                    </Col>
                    <Col sm="6">
                      <Link
                        href="https://www.linkedin.com/"
                        className="btn btn-social btn-flat linkedin p-0"
                      >
                        <i className="fab fa-linkedin-in" />
                        <span>Linkedin</span>
                      </Link>
                    </Col>
                  </Row>
                </div> */}
                            </CardBody>
                        </Card>
                    </Col>
                    <Col
                        xxl="7"
                        xl="7"
                        lg="6"
                        className="offset-xxl-1 auth-img"
                    >
                        <Img src={loginImage.src} alt="" className="bg-img" />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default LogIn

LogIn.getLayout = function getLayout(LogIn: any) {
    return <RequireGuest>{LogIn}</RequireGuest>
}
