/*jshint esversion: 6*/
class Elevator {
  constructor(){
    this.floor      = 0;
    this.MAXFLOOR   = 10;
    this.requests   = [];

    //mine
    this.direction = 'up';
  }

  start() {
    this.clearID = setInterval(this.update.bind(this), 1000);
  }
  stop() {
    clear(this.clearID);
  }
  update() {
    this.log();
    //this.floorUp();
    // this.floorDown();
  }
  _passengersEnter() { }
  _passengersLeave() { }

  floorUp() {
    if(this.floor<this.MAXFLOOR)
    {
      this.floor++;
    }
  }
  floorDown() {
    if(this.floor>0)
    {
      this.floor--;
    }
  }
  call(person) {
    this.requests.push(person);
  }

  log() {
    console.log(`Direction: ${this.direction} | Floor: ${this.floor}`);
  }
}

module.exports = Elevator;
