import React,{ useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams,useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form, ListGroupItem} from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetails, createProductReview } from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productCostants'


function ProductScreen({match,history}) {
  let navigate = useNavigate();
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  
  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const productReviewCreate = useSelector(state => state.productReviewCreate)
  const { 
    loading: loadingProductReview, 
    error: errorProductReview, 
    success: successProductReview
  } = productReviewCreate || {}

  const {id} = useParams()

  useEffect(()=>{
    if(successProductReview){
      setRating(0)
      setComment('')
      dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
    }

    dispatch(listProductDetails(id))
    

  },[dispatch,id,successProductReview])

  const addToCartHandler = () => {
    
    navigate(`/cart/${id}?qty=${qty}`)
  }
  
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createProductReview(
      id, {
        rating,
        comment
      }
    ))
  }

  return (
    <div>
        
          
                  
            <Link to='/' className='btn btn-light my-3 '>Go back</Link>
            {loading ?
                <Loader/>
                : error
                    ? <Message variant ='danger'>{error}</Message>
                    : (
                        <div>
                              <Row>
                                <Col md={6}>
                                    <Image src={product.image} alt={product.name} fluid/>
                                </Col>


                                <Col md={3}>
                                    <ListGroup variant='flush'>
                                        <ListGroup.Item>
                                          <h3>{product.name}</h3>
                                        </ListGroup.Item>

                                        <ListGroupItem>
                                          <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}/>
                                        </ListGroupItem>

                                        <ListGroup.Item>
                                          Price:{product.price}€
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                          <p id= 'description'>Description:</p> {product.description}
                                        </ListGroup.Item>

                                    </ListGroup>
                                  
                                </Col>
                                <Col md={3}>
                                  <Card>
                                    <ListGroup variant='flush'>

                                      <ListGroupItem>
                                        <Row>
                                          <Col>Price:</Col>
                                          <Col>
                                              <strong>{product.price}€</strong>
                                          </Col>

                                        </Row>
                                      </ListGroupItem>

                                      <ListGroupItem>
                                        <Row>
                                          <Col>Status:</Col>
                                          <Col>
                                              {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                          </Col>

                                        </Row>
                                      </ListGroupItem>

                                      {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                          <Row>
                                            <Col>Quantity:</Col>
                                            <Col xs='auto' className='my-1'>
                                                <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                                                  
                                                  {
                                                    
                                                    [...Array(product.countInStock).keys()].map((x) => (
                                                      <option key = {x+1} value={ x + 1 }>
                                                        {x + 1}
                                                      </option>
                                                    ))
                                                  }

                                                </Form.Control>
                                            </Col>
                                          </Row>
                                      </ListGroup.Item>
                                    )}

                                    <ListGroupItem>

                                      <div className='d-grid gap-2'>
                                        
                                        <Button  type='button' onClick={addToCartHandler} disabled={product.countInStock == 0}> Add to Cart </Button>
                                        
                                      </div>
                                    </ListGroupItem>

                                  </ListGroup>
                                </Card>
                              </Col>
                          </Row>

                          <Row>
                            <Col md={6}>
                              <h4>Reviews</h4>
                              {product.reviews.length === 0 && <Message variant ='info'>No Reviews</Message>}

                              <ListGroup variant='flush'>
                                {product.reviews.map((review) => (
                                  <ListGroup.Item key={(review._id)}>
                                    <strong>{review.name}</strong>
                                    <Rating value={review.rating} color='#f8e825'></Rating>
                                    <p>{review.createdAt.substring(0, 10)}</p>
                                    <p>{review.comment}</p>
                                  </ListGroup.Item>
                                ))}

                                <ListGroup.Item>
                                  <h4> Write a review</h4>

                                  {loadingProductReview && <Loader/>}
                                  {successProductReview && <Message variant='success'> Review Submitted</Message>}
                                  {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}

                                  {userInfo ? (
                                    <Form onSubmit={submitHandler}>
                                          <Form.Group controlId='rating'>
                                            <Form.Label>Rating</Form.Label>
                                            <Form.Control
                                              as='select'
                                              value={rating}
                                              onChange={(e) => setRating(e.target.value)}
                                            >
                                              <option value=''>Select...</option>
                                              <option value='1'>1 - Poor</option>
                                              <option value='2'>2 - fair</option>
                                              <option value='3'>3 - good</option>
                                              <option value='4'>4 - Very Good</option>
                                              <option value='5'>5 - Excellent</option>

                                            </Form.Control>
                                          </Form.Group>

                                          <Form.Group controlId='comment' className='my-3'>
                                            <Form.Label>Review</Form.Label>
                                            <Form.Control 
                                              className='my-3'
                                              as='textarea'
                                              row='5'
                                              value={comment}
                                              onChange={(e) => setComment(e.target.value)}
                                              ></Form.Control>
                                          </Form.Group>

                                          <Button
                                            disabled={loadingProductReview}
                                            type='submit'
                                            variant='primary'
                                          >Submit</Button>
                                    </Form>
                                  ) : (
                                    <Message variant='info'>Please <Link to='/login' >login</Link> to write a review</Message>
                                  )}
                                </ListGroup.Item>

                              </ListGroup>
                            </Col>
                          </Row>

                      </div>
                    )
                  
                
            
            
            }


            
        
    </div>
  )
}

export default ProductScreen
