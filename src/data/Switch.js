export class NintendoSwitch {
   // Encapsulation
   _color = String;
   _screenSize = 5.5;
   _storageCapacity = 8;
   _maxBattery = 6;
   _batteryLife = this._maxBattery;
   gamesInstalled = Array;

  constructor(color, gamesInstalled) {
    this._color = color;
    this.gamesInstalled = gamesInstalled;
  }

 
  // Abstraction
  installGame(game) {
    this.gamesInstalled.push(game);
    return `Installed ${game}`;
  }

  checkBatteryLife() {
    return this._batteryLife;
  }

  chargeSwitch() {
    this._batteryLife = this._maxBattery;
    return 'Battery Fully Charged!'
  }

   playGame(game) {
     this._batteryLife = this._batteryLife - 2;
    return `Launching ${game}`;;
  }
}

const pink = new NintendoSwitch('Pink', []);
const yellow = new NintendoSwitch('Yellow', []);
const blue = new NintendoSwitch('Blue', ['Mario Kart']);

console.log(blue._color)


// Inheritance
export class NintendoSwitchOled extends NintendoSwitch {
  // Polymorphism
  _screenSize = 7;
  _maxBattery = 10;
  _batteryLife = this._maxBattery;

  constructor(color, gamesInstalled) {
    super(color, gamesInstalled)
  }

  connectEthernet() {
    return 'Data is 1000 Mbps!'
  }

}

const betterSwitch = new NintendoSwitchOled('White', ['Zelda'])
console.log(betterSwitch.playGame(betterSwitch.gamesInstalled[0]));
console.log(betterSwitch.connectEthernet());