/*jshint esversion: 6*/
class Elevator {
  constructor(){
    this.floor      = 0;
    this.MINFLOOR   = 0;
    this.MAXFLOOR   = 10;
    this.requests   = [];
    this.requestNumber = 0;

    //mine
    this.direction = 'up';

    this.waitinglist = [];
    this.passengers = [];
    this.requests = [];
    this.running = false;
    this.stopCalled = false;
  }

  start() {
    this.running = true;
    this.stopCalled = false;
    this.clearID = setInterval(this.update.bind(this), 1000);
  }
  stop() {
    this.running = false;
    clearInterval(this.clearID);
  }
  update() {
    console.log("****************************************************");
    if(this.passengers.length)
    {
      if(this.stopCalled)
      {
        this.stopCalled = false;
        clearTimeout(this.clearIDStop);
      }

      console.log("passengers");
      console.log("this.passengers[0].direction",this.passengers[0].person.direction);
      if(this.requests.length>0)
      {
        if(this.requests[0].requestNumber<=this.passengers[0].requestNumber)
        {
          this.direction = (this.requests[0].person.originFloor - this.floor) >= 0 ? 'up' : 'down';
        }
        else {
          this.direction = (this.passengers[0].person.destinationFloor - this.floor) >= 0 ? 'up' : 'down';
        }

      }
      else
      {
        this.direction = (this.passengers[0].person.destinationFloor - this.floor) >= 0 ? 'up' : 'down';
      }


      if(this.direction === 'up')
      {
        console.log("vamos parriba");
        this.floorUp();
      }
      else
      {
        console.log("vamos pabajo");
        this.floorDown();
      }
    }
    else if(this.requests.length)
    {
      if(this.stopCalled)
      {
        this.stopCalled = false;
        clearTimeout(this.clearIDStop);
      }
      console.log("requests");
      this.direction = (this.requests[0].person.originFloor - this.floor) >= 0 ? 'up' : 'down';
      console.log("this.requests[0].direction",this.requests[0].person.direction);

      if(this.direction === 'up')
      {
        console.log("vamos parriba");
        this.floorUp();
      }
      else
      {
        console.log("vamos pabajo");
        this.floorDown();
      }
    }
    else {

      if(!this.stopCalled)
      {
        this.requestNumber = 0;
        this.stopCalled = true;
        this.clearIDStop = setTimeout(this.stop.bind(this),15000);
      }

    }
    this.log();
    console.log("****************************************************");

  }

  _passengersEnter(element) {
    this.passengers.push(element);
    console.log(`${element.person.name} has enter the elevator`);

  }

  _passengersLeave(element) {
    console.log(`${element.person.name} has left the elevator`);
  }

  floorUp() {

    var tempArrayWaitingList = [];
    var tempArrayRequest = [];
    var tempArrayPassengers = [];
    var passengerEnter = false;
    var passengerLeft = false;

    this.waitinglist.forEach(function(element){

      if(this.passengers.length>0 && element.person.originFloor === this.floor && element.person.direction == this.direction)
      {
        this._passengersEnter(element);
        passengerEnter = true;
      }
      else if(this.passengers.length===0 && element.person.originFloor === this.floor && this.requests[0].requestNumber===element.requestNumber)
      {
        this._passengersEnter(element);
        passengerEnter = true;
      }
      else
      {
        tempArrayWaitingList.push(element);
        tempArrayRequest.push(element);
      }

    }.bind(this));

    this.waitinglist = tempArrayWaitingList;
    this.requests = tempArrayRequest;

    this.passengers.forEach(function(element){

      if(element.person.destinationFloor === this.floor)
      {
        passengerLeft = true;
        this._passengersLeave(element);
      }
      else
      {
        tempArrayPassengers.push(element);
      }

    }.bind(this));

    this.passengers = tempArrayPassengers;

    if(this.floor<this.MAXFLOOR && !passengerEnter && !passengerLeft)
    {
      this.floor++;
    }

  }

  floorDown() {

    var tempArrayWaitingList = [];
    var tempArrayRequest = [];
    var tempArrayPassengers = [];
    var passengerEnter = false;
    var passengerLeft = false;

    this.waitinglist.forEach(function(element){

      if(this.passengers.length>0 && element.person.originFloor === this.floor && element.person.direction == this.direction)
      {
        this._passengersEnter(element);
        passengerEnter = true;
      }
      else if(this.passengers.length===0 && element.person.originFloor === this.floor && this.requests[0].requestNumber===element.requestNumber)
      {
        this._passengersEnter(element);
        passengerEnter = true;
      }
      else
      {
        tempArrayWaitingList.push(element);
        tempArrayRequest.push(element);
      }

    }.bind(this));

    this.waitinglist = tempArrayWaitingList;
    this.requests = tempArrayRequest;

    this.passengers.forEach(function(element){

      if(element.person.destinationFloor === this.floor)
      {
        this._passengersLeave(element);
        passengerLeft = true;
      }
      else
      {
        tempArrayPassengers.push(element);
      }

    }.bind(this));

    this.passengers = tempArrayPassengers;

    if(this.floor>this.MINFLOOR && !passengerEnter && !passengerLeft )
    {
      this.floor--;
    }

  }

  call(person) {
    if(!this.running )
    {
      this.start();
    }
    this.requestNumber++;
    this.requests.push({person: person, requestNumber: this.requestNumber } );
    this.waitinglist.push({person: person, requestNumber: this.requestNumber } );


  }

  log() {
    console.log(`Direction: ${this.direction} | Floor: ${this.floor}`);
  }
}

module.exports = Elevator;
