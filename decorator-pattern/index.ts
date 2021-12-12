abstract class BaseDesktopComponent {
  itemName: string;
  price: number;

  constructor(itemName: string, price: number) {
    this.itemName = itemName;
    this.price = price;
  }

  abstract getPrice(): number;

  abstract getDescription(): string;

  abstract printProduct(): void;
}

abstract class IComponentDecorator extends BaseDesktopComponent {
  baseComponent: BaseDesktopComponent;

  constructor(
    itemName: string,
    price: number,
    baseComponent: BaseDesktopComponent
  ) {
    super(itemName, price);
    this.baseComponent = baseComponent;
  }

  getPrice(): number {
    return this.baseComponent.getPrice() + this.price;
  }

  getDescription(): string {
    return `${this.baseComponent.getDescription()}, ${this.itemName}($${
      this.price
    })`;
  }

  printProduct(): void {
    console.log(`${this.getDescription()}: $${this.getPrice()}`);
  }
}

class WithKeyboard extends IComponentDecorator {
  constructor(
    baseComponent: BaseDesktopComponent,
    itemName: string = "Keyboard",
    price: number = 20
  ) {
    super(itemName, price, baseComponent);
  }
}

class WithMouse extends IComponentDecorator {
  constructor(
    baseComponent: BaseDesktopComponent,
    itemName: string = "Mouse",
    price: number = 10
  ) {
    super(itemName, price, baseComponent);
  }
}

class WithMonitor extends IComponentDecorator {
  constructor(
    baseComponent: BaseDesktopComponent,
    itemName: string = "LCD Monitor",
    price: number = 35
  ) {
    super(itemName, price, baseComponent);
  }
}

class Desktop extends BaseDesktopComponent {
  getPrice(): number {
    return this.price;
  }

  getDescription(): string {
    return `${this.itemName}($${this.price})`;
  }

  printProduct(): void {
    console.log(`${this.getDescription()}: $${this.getPrice()}`);
  }
}

const simpleDesktop = new Desktop("Intel Pentium", 100);
const desktopKeyboard = new WithKeyboard(simpleDesktop);
const desktopKeyboardMouse = new WithMouse(desktopKeyboard);
const desktopMonitor = new WithMonitor(simpleDesktop);
const desktopKeyboardMouseMonitor = new WithMonitor(desktopKeyboardMouse);

simpleDesktop.printProduct();
desktopKeyboard.printProduct();
desktopKeyboardMouse.printProduct();
desktopMonitor.printProduct();
desktopKeyboardMouseMonitor.printProduct();
