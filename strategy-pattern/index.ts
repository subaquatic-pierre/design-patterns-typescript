interface ITravelManner {
  performTravel: () => void;
}

abstract class Person {
  firstName: string;
  lastName: string;
  travelManner: ITravelManner;

  constructor(
    firstName: string,
    lastName: string,
    travelManner: ITravelManner
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.travelManner = travelManner;
  }

  /*
  This is the main purpose for strategy pattern,
  travel method can be called on any derived class
  and the implementation of the travel algorithm is 
  abstracted away. The algorithms are grouped together
  by the use of the interface ITravelManner which requires that the algorithm
  have the performTravel method which is called in this method
  */
  travel() {
    // For display only
    console.log(`${this.firstName} ${this.lastName}`);

    // -----
    // Main use of Strategy pattern here
    this.travelManner.performTravel();
    // -----

    // For display only
    console.log("----------");
  }
}

// ------
// Person derived classes
// ------

class RichPerson extends Person {
  // Only used for differentiation
  bar() {
    console.log("I dont have to work, I can be on holiday all the time");
  }
}

class PoorPerson extends Person {
  // Only used for differentiation
  foo() {
    console.log("I have to work for money");
  }
}

// ------
// ITravelManner algorithms
// ------

class TravelByCar implements ITravelManner {
  performTravel() {
    // Do algorithm work here
    console.log("Travel by car, vroom vroom");
  }
}

class TravelByPlane implements ITravelManner {
  performTravel() {
    // Do algorithm work here
    console.log("Fly by plane, fly fly");
  }
}

function main() {
  // Define characters
  const kevin = new RichPerson("Kevin", "Drama", new TravelByPlane());
  const george = new PoorPerson("George", "Federal", new TravelByCar());
  const beth = new PoorPerson("Beth", "Gollie", new TravelByPlane());

  // Perform main program methods
  kevin.travel();
  george.travel();
  // Benefits of strategy pattern are clear here
  // Beth is able to travel by plane even though they
  // are a poor person
  beth.travel();
}

main();
