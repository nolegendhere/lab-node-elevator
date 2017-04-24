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

    if(this.requests.length)
    {
      if(this.stopCalled)
      {
        this.stopCalled = false;
        clearTimeout(this.clearIDStop);
      }

      if(this.passengers.length)
      {
        if(this.passengers[0].requestNumber === this.requests[0].requestNumber)
        {
          console.log("passenger is request, to destiny of passenger/actual first request");
          if(this.requests[0].person.destinationFloor - this.floor>0)
          {
            this.direction = 'up';
          }
          else if(this.requests[0].person.destinationFloor - this.floor<0)
          {
            this.direction = 'down';
          }

        }
        else
        {
          console.log("passenger isn't request, to origin actual first request");
          if(this.requests[0].person.originFloor - this.floor>0)
          {
            this.direction = 'up';
          }
          else if(this.requests[0].person.originFloor - this.floor<0)
          {
            this.direction = 'down';
          }
        }
      }
      else
      {
        console.log("nopassengers, to origin actual first request");
        if(this.requests[0].person.originFloor - this.floor>0)
        {
          this.direction = 'up';
        }
        else if(this.requests[0].person.originFloor - this.floor<0)
        {
          this.direction = 'down';
        }
      }


      if(this.direction === 'up')
      {
        console.log("go up");
        this.floorUp();
      }
      else
      {
        console.log("go down");
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

  _passengersEnter(element,condition) {
    if(condition)
    {
      this.passengers.unshift(element);
    }
    else {
      this.passengers.push(element);
    }
    console.log(`${element.person.name} has enter the elevator`);

  }

  _passengersLeave(element) {
    console.log(`${element.person.name} has left the elevator`);
    var tempArray = [];
    this.requests.forEach(function(elementCheck){
      if(elementCheck.requestNumber != element.requestNumber)
      {
        elementCheck.nextRequest = false;
        tempArray.push(elementCheck);
      }
    }.bind(this));

    this.requests = tempArray;

    if(this.requests.length)
    {
      this.requests[0].nextRequest = true;
    }
  }

  nextRequest(element)
  {
    for(var i=0; i<this.requests.length;i++)
    {
      if(element.requestNumber === this.requests[i].requestNumber)
      {
        if(this.requests[i-1].nextRequest && element.person.direction===this.requests[0].person.direction/*&& element.direction===this.requests[i-1].direction*/)
        {
          this.requests[i].nextRequest = true;
          return true;
        }
      }

    }

    return false;
  }

  floorUp() {

    var tempArrayWaitingList = [];
    var tempArrayPassengers = [];
    var passengerEnter = false;
    var passengerLeft = false;

    this.waitinglist.forEach(function(element){
      if(element.person.originFloor === this.floor && element.requestNumber === this.requests[0].requestNumber)
      {
        this._passengersEnter(element, true);
        passengerEnter = true;
      }
      else if(element.person.originFloor === this.floor && ((element.person.direction === this.direction && element.person.destinationFloor<=this.requests[0].person.originFloor) || (element.person.direction === this.direction && element.person.destinationFloor<=this.requests[0].person.destinationFloor)))
      {
        this._passengersEnter(element, false);
        passengerEnter = true;
      }
      else if(this.requests.length>1)
      {
        if(element.person.originFloor === this.floor && this.nextRequest(element) && element.person.direction === this.direction)
        {
          this._passengersEnter(element, false);
          passengerEnter = true;
        }
        else {
          tempArrayWaitingList.push(element);
        }

      }
      else
      {
        tempArrayWaitingList.push(element);
      }

    }.bind(this));

    this.waitinglist = tempArrayWaitingList;

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

    if(this.floor<this.MAXFLOOR && !passengerEnter && !passengerLeft)
    {
      this.floor++;
    }

  }

  floorDown() {

    var tempArrayWaitingList = [];
    var tempArrayPassengers = [];
    var passengerEnter = false;
    var passengerLeft = false;

    this.waitinglist.forEach(function(element){
      if(element.person.originFloor === this.floor && element.requestNumber === this.requests[0].requestNumber)
      {
        this._passengersEnter(element, true);
        passengerEnter = true;
      }
      else if(element.person.originFloor === this.floor && ((element.person.direction === this.direction && element.person.destinationFloor>=this.requests[0].person.originFloor) || (element.person.direction === this.direction && element.person.destinationFloor>=this.requests[0].person.destinationFloor)))
      {
        this._passengersEnter(element, false);
        passengerEnter = true;
      }
      else if(this.requests.length>1)
      {
        if(element.person.originFloor === this.floor && this.nextRequest(element) && element.person.direction === this.direction)
        {
          this._passengersEnter(element, false);
          passengerEnter = true;
        }
        else {
          tempArrayWaitingList.push(element);
        }

      }
      else
      {
        tempArrayWaitingList.push(element);
      }

    }.bind(this));

    this.waitinglist = tempArrayWaitingList;

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

    if(this.requests.length)
    {
      this.requests.push({person: person, requestNumber: this.requestNumber, nextRequest: false } );
      this.waitinglist.push({person: person, requestNumber: this.requestNumber, nextRequest: false } );
    }
    else {
      this.requests.push({person: person, requestNumber: this.requestNumber, nextRequest: true } );
      this.waitinglist.push({person: person, requestNumber: this.requestNumber, nextRequest: true } );
    }

    this.requestNumber++;


  }

  log() {
    console.log(`Direction: ${this.direction} | Floor: ${this.floor}`);
  }
}

module.exports = Elevator;
