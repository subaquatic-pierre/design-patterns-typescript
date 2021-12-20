abstract class IPizza {
  name: string = "Pizza";
  dough: string = "Thick";
  toppings: string[] = [];

  getName(): string {
    return this.name;
  }

  prepare(): void {
    console.log("Preparing Pizza");
    console.log(this.getName());
    console.log(`Pizza Base:\n${this.dough}`);
    console.log("Adding toppings: ");
    this.toppings.forEach((topping) => {
      console.log(topping);
    });
  }
  bake(): void {
    console.log("Baking Pizza");
  }
  cut(): void {
    console.log("Cutting Pizza");
  }
  box(): void {
    console.log("Boxing Pizza");
  }
}

class BasicPizza extends IPizza {
  constructor() {
    super();
    this.name = "Basic Pizza";
    this.dough = "Thin or Thick Crust";
    this.toppings = ["Cheese"];
  }
}

class NYStylePeperoni extends IPizza {
  constructor() {
    super();
    this.name = "NY Style Peperoni Pizza";
    this.dough = "Thin Crust";
    this.toppings = ["Tomato, Peperoni"];
  }
}

class NYStyleVeggie extends IPizza {
  constructor() {
    super();
    this.name = "NY Veggie";
    this.dough = "Thin Crust";
    this.toppings = ["Carrot", "Cucumber"];
  }
}

class ChicagoStylePeperoni extends IPizza {
  constructor() {
    super();
    this.name = "Chicago Style Peperoni";
    this.dough = "Deep Dish Style";
    this.toppings = ["Peperoni", "Cheese"];
  }
}

class ChicagoStyleVeggie extends IPizza {
  constructor() {
    super();
    this.name = "Chicago Style Veggie";
    this.dough = "Deep Dish Style";
    this.toppings = ["Peppers", "Cheese"];
  }
}

abstract class IPizzaStore {
  storeName: string = "Basic Store";

  orderPizza(type: string): IPizza {
    const pizza: IPizza = this.createPizza(type);
    pizza.prepare();
    pizza.bake();
    pizza.cut();
    pizza.box();

    return pizza;
  }

  abstract createPizza(type: string): IPizza;
}

class NYPizzaStore extends IPizzaStore {
  createPizza(type: string): IPizza {
    switch (type) {
      case "NY Style Peperoni Pizza":
        return new NYStylePeperoni();
      case "NY Veggie":
        return new NYStyleVeggie();
      default:
        return new BasicPizza();
    }
  }
}

class ChicagoPizzaStore extends IPizzaStore {
  createPizza(type: string): IPizza {
    switch (type) {
      case "Chicago Style Veggie":
        return new ChicagoStyleVeggie();
      case "Chicago Style Peperoni":
        return new ChicagoStylePeperoni();
      default:
        return new BasicPizza();
    }
  }
}

function mainFactory() {
  const nyPizzaStore = new NYPizzaStore();
  const chicagoPizzaStore = new ChicagoPizzaStore();

  nyPizzaStore.orderPizza("NY Style Peperoni Pizza");
  chicagoPizzaStore.orderPizza("Chicago Style Veggie");
}

mainFactory();
