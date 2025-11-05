import { useState } from 'react'
import logoContact from '../../images/R.png'
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function Contact() {

    const navigate = useNavigate();

    const [contactForm , setContactForm] = useState({   
        firstName: '',
        lastName: '',   
        email: '',
        phone: '',
        message: ''
    })

    const [contactFormError,setContactFormError] = useState({
        firstName: '',
        lastName: '',   
        email: '',
        phone: '',
        message: ''
    })

    const handleContactForm = (e) => {
        if(e.target.id==='firstName'){
            setContactForm({...contactForm, firstName:e.target.value})
            setContactFormError({...contactFormError, firstName:
                e.target.value.length===0 ? 'First Name is optional':
                null
            })
        }
        if(e.target.id==='lastName'){
            setContactForm({...contactForm, lastName:e.target.value})
            setContactFormError({...contactFormError, lastName:
                e.target.value.length===0 ? 'First Name is required':
                e.target.value.length<4 ? 'min length is 4 char':
                null
            })
        }
        if(e.target.id==='email'){
            setContactForm({...contactForm, email:e.target.value})
            setContactFormError({...contactFormError, email:
                e.target.value.length===0 ? 'Email Name is equired':
                !e.target.value.includes('@gmail.com') ? 'Email should include @gmail.com':
                null
            })
        }
        if(e.target.id==='phone'){
            setContactForm({...contactForm, phone:e.target.value})
            setContactFormError({...contactFormError, phone:
                e.target.value.length===0 ? 'Phone is optional':
                null
            })
        }
        if(e.target.id==='message'){
            setContactForm({...contactForm, message:e.target.value})
            setContactFormError({...contactFormError, message:
                e.target.value.length<=10 ? 'min length is 10 char':
                e.target.value.length>500 ? 'max length is 500 char':
                null
            })
        }

       // setContactForm({...contactForm, [e.target.id]:e.target.value})
    }   

    const handleSubmitForm = (e) => {
        e.preventDefault();
        console.log(contactForm); 
        toast.success(`Form Submitted Successfully ✔️
thank you ${contactForm.firstName} ${contactForm.lastName}🌷
We will contact you soon ❤️ ...`)
        navigate('/')}


  return (
    <>
      <section className=" w-100 d-flex justify-content-center align-items-center">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-6 col-lg-6 col-xl-5">
              <img
                src={logoContact}
                style={{maxHeight:'350px'}}
                className="img-fluid"
                alt="Sample"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Send Us a Message ❤️</h3>

              <form onSubmit={handleSubmitForm}>
                <div className="row">
                  <div className="col-md-6 mb-4 d-block text-start">
                      <label className="form-label fw-bold ">First Name : </label>
                       <input
                        type="text"
                        id="firstName"
                        className={`form-control form-control-lg ${contactFormError.firstName? 'border-success' :''} `}
                        value={contactForm.firstName}
                        onChange={handleContactForm}
                      />
                      {contactFormError.firstName && <span className='text-success'>{contactFormError.firstName}</span>}
                  </div>
                  <div className="col-md-6 mb-4 d-block text-start">
                      <label className="form-label fw-bold "> Last Name : </label>
                      <input
                        type="text"
                        id="lastName"
                        className={`form-control form-control-lg ${contactFormError.lastName? 'border-danger' :''} `}
                        value={contactForm.lastName}
                        onChange={handleContactForm}
                      />
                       {contactFormError.lastName && <span className='text-danger'>{contactFormError.lastName}</span>}
                    </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-4 d-block text-start">
                      <label className="form-label fw-bold ">Email :</label>
                      <input
                        type="email"
                        id="email"
                        className={`form-control form-control-lg ${contactFormError.email? 'border-danger' :''} `}
                        value={contactForm.email}
                        onChange={handleContactForm}
                      />
                        {contactFormError.email && <span className='text-danger'>{contactFormError.email}</span>} 
                    </div>
      
                  <div className="col-md-6 mb-4 d-block text-start">
                      <label className="form-label fw-bold ">Mobile : </label>
                      <input
                        type="tel"
                        id="phone"
                        className={`form-control form-control-lg ${contactFormError.phone? 'border-success' :''} `}
                        value={contactForm.phone}
                        onChange={handleContactForm}
                      />
                       {contactFormError.phone && <span className='text-success'>{contactFormError.phone}</span>}
                    </div>
                </div>

                
                <div className="mb-4 pb-2">
                  <h5>Message :</h5>
                    <div className="form-outline">
                      <textarea id="message"
                        className={`form-control form-control-lg ${contactFormError.message ? 'border-danger' : ''}`}
                        placeholder="Enter your message"
                        rows={5}
                        value={contactForm.message}
                        onChange={handleContactForm}></textarea>
                      {contactFormError.message && (<span className="text-danger">{contactFormError.message}</span>)}
                    </div>
                  </div>


                <div className="mt-4 pt-2">
                  <input
                    className="btn btn-outline-primary btn-lg"
                    type="submit"
                    value="Submit"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
