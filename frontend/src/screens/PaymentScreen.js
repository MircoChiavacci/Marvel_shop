import React, {useState, useEffect} from 'react'
import { Link, useNavigate,useSearchParams } from 'react-router-dom'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

function PaymentScreen({history}) {

    const navigate = useNavigate()

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const dispatch = useDispatch()


    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    if(!shippingAddress.address){
        navigate('/shipping')
    }


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3/>

      <Form onSubmit={submitHandler}>

        <Form.Group>
            <Form.Label className='my-3' as='legend'>Select Method</Form.Label>
            <Col>
                <Form.Check
                    className='my-4'
                    type='radio'
                    label='PayPal or Credit Card'
                    id='paypal'
                    name='paymentMethod'
                    checked
                    onChange={(e) => setPaymentMethod(e.target.value)}
                >

                </Form.Check>
            </Col>
        </Form.Group>

        <Button className='my-3' type='submit' variant='primary'>
            Continue
        </Button>

      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
