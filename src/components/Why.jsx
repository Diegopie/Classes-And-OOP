import { useEffect, useRef, useState } from 'react'
import { NintendoSwitch } from '../data/how'
import './App.css'
import { Button, Col, Container, FormCheck, FormLabel, Row } from 'react-bootstrap'

function Why() {

  const userSwitch = useRef(null);
  const selectSwitchContainer = useRef(null);

  const installGameValue = useRef()

  // Make this after play games fails to load
  const [allGames, setAllGames] = useState([]);
  const [batteryLife, setBatteryLife] = useState(0);


  const createSwitch = (color) => {
    userSwitch.current = new NintendoSwitch(color, []);
    setAllGames(userSwitch.current.getGamesInstalled())
    setBatteryLife(userSwitch.current.getBatteryLife())
  }

  useEffect(() => {
    if (userSwitch.current === null) {
      return;
    }
    const allButtons = selectSwitchContainer.current.children;

    Array.from(allButtons).forEach((button => {
      button.disabled = true;
    }))

  }, [createSwitch])


  return (
    <main className='mt-5'>
      <Container>
        <h1>Select Your Switch</h1>

      </Container>
      <Container>
        <Row>
          <Col>
            <img className='w-50' src='https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/en_US/products/hardware/nintendo-switch-red-blue/110478-nintendo-switch-neon-blue-neon-red-front-screen-on-1200x675' />
          </Col>
          <Col>
            <Row ref={selectSwitchContainer} className='flex flex-column'>
              <Button className='mt-1 w-25' onClick={() => createSwitch('yellow')}>Yellow</Button>
              <Button className='mt-1 w-25' onClick={() => createSwitch('blue')}>Blue</Button>
              <Button className='mt-1 w-25' onClick={() => createSwitch('pink')}>Pink</Button>
            </Row>
            <Row>
              {userSwitch.current ?
                <Button className='mt-3 w-25' onClick={() => {
                  userSwitch.current = null;
                  setAllGames([]);
                  setBatteryLife(0);

                  const allButtons = selectSwitchContainer.current.children;
                  Array.from(allButtons).forEach((button => {
                    button.disabled = false;
                  }))
                }} >Sell Switch</Button>
                : null
              }
            </Row>
          </Col>
        </Row>
      </Container>

      {userSwitch.current ?
        <Container className='mt-4'>
          <h2>You have a {userSwitch.current._color} Switch</h2>
          <Container>
            <Row>
              <Col xs='5'>
                <Row>
                  Current Battery Life: {batteryLife}
                </Row>
                <Row>
                  <Button variant="outline-primary" className='w-25 mt-3' onClick={() => {
                    userSwitch.current.chargeSwitch();
                    setBatteryLife(userSwitch.current.getBatteryLife());
                  }}>Charge Switch</Button>
                </Row>
              </Col>
              <Col xs='6'>
                <Row>
                  Play Games:
                </Row>
                <Container>
                  {console.log(allGames)}
                  {allGames.length > 0 ?

                    allGames.map((game) => {
                      { console.log(game) }
                      return (
                        <Row xs='3' key={crypto.randomUUID()}>
                          <Button onClick={() => {

                            alert(`${userSwitch.current.playGame(game)}`)
                            setBatteryLife((prev) => {
                              return prev = userSwitch.current.getBatteryLife();
                            })
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
              <form type='submit' onSubmit={(e) => {

                e.preventDefault();

                if (installGameValue.current.value === '') {
                  alert('Must Enter a Game!');
                  return;

                } else if (userSwitch.current.getGamesInstalled().includes(installGameValue.current.value)) {

                  alert(`You already have ${installGameValue.current.value} installed`)
                  return;

                }

                alert(userSwitch.current.installGame(installGameValue.current.value.trim()))
              
                setAllGames((prev) => {
                  console.log(prev);
                  // prev = userSwitch.current.getGamesInstalled();
                  console.log(prev);
                  return prev;
                })


              }}>
                <label htmlFor='installGameValue'>Install A Game</label>
                <input type='text' name='installGameValue' ref={installGameValue} />
                <Button className='m-2' variant='outline-primary' type='submit'> Install Game</Button>
              </form>
            </Row>
          </Container>
        </Container>
        : null
      }



    </main>
  )
}

export default Why
