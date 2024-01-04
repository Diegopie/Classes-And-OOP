import { useEffect, useState } from 'react'
import { NintendoSwitch } from './data/Switch'
import './App.css'
import { Button, Col, Container, FormLabel, Row } from 'react-bootstrap'

function App() {

  const [userSwitch, setUserSwitch] = useState(null);

  const [installGameValue, setInstallGameValue] = useState('');

  // Make this after play games fails to load
  const [allGames, setAllGames] = useState([]);
  const [batteryLife, setBatteryLife] = useState(0);

  const createSwitch = (color) => {
    setUserSwitch((prevState) => {
      prevState = new NintendoSwitch(color.toLowerCase(), [])
        ;
      console.log(prevState.gamesInstalled);
      setAllGames(prevState.gamesInstalled)
      setBatteryLife(prevState.checkBatteryLife())

      return prevState;

    })
  }

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
            <Row>
              <Button className='mt-1 w-25' onClick={() => createSwitch('yellow')}>Yellow</Button>
            </Row>
            <Row>
              <Button className='mt-1 w-25' onClick={() => createSwitch('blue')}>Blue</Button>
            </Row>
            <Row>
              <Button className='mt-1 w-25' onClick={() => createSwitch('pink')}>Pink</Button>
            </Row>
          </Col>
        </Row>
      </Container>

      {userSwitch ?
        <Container>
          <h2>You have a {userSwitch._color} Switch</h2>
          <Container>
            <Row>
              <Col xs='5'>
                <Row>
                  Current Battery Life: {batteryLife}
                </Row>
                <Row>
                  <Button variant="outline-primary" className='w-25 mt-3' onClick={() => {
                    userSwitch.chargeSwitch();
                    setBatteryLife(userSwitch.checkBatteryLife());
                  }}>Charge Switch</Button>
                </Row>
              </Col>
              <Col xs='6'>
                <Row>
                  Play Games:
                </Row>
                <Container>
                  {allGames.length > 0 ?
                    allGames.map((game) => {
                      return (
                        <Row xs='3'>
                          <Button onClick={() => {
                            
                            alert(`${userSwitch.playGame(game)}`)
                            setBatteryLife(userSwitch.checkBatteryLife())
                          }}>{game}</Button>
                        </Row>
                      )
                    })

                    : 'Install a Game!'
                  }
                </Container>
              </Col>
            </Row>
          </Container>
          {/* Install Game */}
          <Container className='mt-5'>
            <Row xs='6'>
              <label htmlFor='installGameValue'>Install A Game</label>
              <input type='text' name='installGameValue' value={installGameValue} onChange={(e) => {
                setInstallGameValue(e.target.value)
              }} />
              <Button
                className='m-2'
                variant='outline-primary'

                onClick={() => {
                  console.log(installGameValue);
                  if (installGameValue === '') {
                    alert('Must Enter a Game!');
                    return;
                  } else if(userSwitch.gamesInstalled.includes(installGameValue)) {
                    alert(`You already have ${installGameValue} installed`)
                    return;
                  }

                  alert(userSwitch.installGame(installGameValue.trim()))
                  setAllGames(userSwitch.gamesInstalled);
                  setInstallGameValue('');
                }}
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
