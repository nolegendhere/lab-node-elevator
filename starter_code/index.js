/*jshint esversion: 6*/
const Elevator = require('./elevator.js');
const Person = require('./person.js');

var elevator = new Elevator();

function floorsGenerator()
{

      var firstFloor = Math.floor(Math.random()*elevator.MAXFLOOR);
      var secondFloor;

      do
      {
        secondFloor = Math.floor(Math.random()*elevator.MAXFLOOR);
      }
      while(firstFloor===secondFloor);

      return {originFloor: firstFloor, destinationFloor: secondFloor};
}


class NamePerson{
  constructor(){
    this.numberPerson = 0;
  }

  namesGenerator(){
      return "person"+(this.numberPerson++) ;
  }
}


var namePerson = new NamePerson();



elevator.start();

var count = 0;

var clearIDMain = setInterval(function(){
  var name = namePerson.namesGenerator();
  var floors = floorsGenerator();
  var person = new Person(name,floors.originFloor, floors.destinationFloor );
  elevator.call(person);
  console.log(`${person.name} just called the elevator from ${person.originFloor} to ${person.destinationFloor} with direction ${person.direction}`);
  count++;

  if(count===10)
  {
    clearInterval(clearIDMain);
  }
}.bind(this),2000);
