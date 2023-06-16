import React, {useState, useEffect} from 'react'
import { Link, useNavigate,useSearchParams, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'

function UserEditScreen({location, history}) {
   
    const {id} = useParams()
    const userId = id

    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    
  
    const dispatch = useDispatch()
  
    
    
    const userDetails= useSelector(state => state.userDetails)
    const {error, loading, user} = userDetails

    const userUpdate= useSelector(state => state.userUpdate)
    const {error: errorUpdate, loading : loadingUpdate, success: successUpdate } = userUpdate
  
    useEffect(() => {

       if(successUpdate){
            dispatch({type: USER_UPDATE_RESET})
            navigate('/admin/userlist')
       }else{

           if (!user.name || user._id !== Number(userId)){
            dispatch(getUserDetails(userId))
           }else{
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
           }
       } 

       
       
    },[user, userId, successUpdate, navigate])
  
    const SubmitHandler = (e) => {
      e.preventDefault()
      dispatch(updateUser({_id:user._id, name, email, isAdmin}))
     
    }      

  return (
    <div>
        <Link to='/admin/userlist'>
            Go Back
        </Link>


        <FormContainer>
            <h1>Edit User</h1>

            {loadingUpdate && <Loader/>}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> 
                : (

                    <Form onSubmit={SubmitHandler}>

                            <Form.Group className='my-3' controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control 
                                    
                                    type='name' 
                                    placeholder='Enter Name' 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)}>
                                </Form.Control>
                            </Form.Group>


                            <Form.Group className='my-3' controlId='email'>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control 
                                    
                                    type='email' 
                                    placeholder='Enter Email' 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)}>
                                </Form.Control>
                            </Form.Group>


                            <Form.Group className='my-3' controlId='isAdmin'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    
                                    type='checkbox' 
                                    label='Is Admin' 
                                    checked={isAdmin} 
                                    onChange={(e) => setIsAdmin(e.target.checked)}>
                                </Form.Control>
                            </Form.Group>



                            <Button className='my-3' type='submit' variant='primary'>
                                Update
                            </Button>

                    </Form> 
                )}
        </FormContainer>    
    </div>
    
  )
}

export default UserEditScreen
