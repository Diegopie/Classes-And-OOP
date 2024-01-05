import { useEffect, useState } from 'react'
import './App.css'
import { Button, Col, Container, Row } from 'react-bootstrap'

function App() {

  const [userSwitch] = useState(false);

  return (
    <main>
      <Container>
        <h1>Select Your Switch</h1>

      </Container>
      <Container>
        <Row>
          <Col>
            <img className='w-50' src='https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/en_US/products/hardware/nintendo-switch-red-blue/110478-nintendo-switch-neon-blue-neon-red-front-screen-on-1200x675' />
          </Col>
          <Col>
            <Row className='flex flex-column'>
              <Button className='mt-1 w-25' >Yellow</Button>
              <Button className='mt-1 w-25' >Blue</Button>
              <Button className='mt-1 w-25' >Pink</Button>           
            </Row>
          </Col>
        </Row>
      </Container>

      {userSwitch ?
        <Container>
          <h2>You have a Switch</h2>
          <Container>
            <Row>
              <Col xs='5'>
                <Row>
                  Current Battery Life:
                </Row>
                <Row>
                  <Button variant="outline-primary" className='w-25 mt-3' >Charge Switch</Button>
                </Row>
              </Col>
              <Col xs='6'>
                <Row>
                  Play Games:
                </Row>
                <Container>
                  {/* TODO: Map Installed Games */}
                </Container>
              </Col>
            </Row>
          </Container>
          {/* Install Game */}
          <Container className='mt-5'>
            <Row xs='6'>
              <label htmlFor='installGameValue'>Install A Game</label>
              <input type='text' name='installGameValue' />
              <Button
                className='m-2'
                variant='outline-primary'
              > Install Game</Button>
            </Row>
          </Container>
        </Container>
        : null
      }



    </main>
  )
}

export default App
