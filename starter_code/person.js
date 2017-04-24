/*jshint esversion: 6*/
class Person {
  constructor(name, originFloor, destinationFloor){
    this.name = name;
    this.originFloor = originFloor;
    this.destinationFloor = destinationFloor;
    this.direction = (originFloor - destinationFloor)>0 ? 'down' : 'up'; 
  }
}

module.exports = Person;
