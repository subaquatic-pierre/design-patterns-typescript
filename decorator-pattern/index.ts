class BaseComponent {
  itemName: string;
  price: number;

  constructor(itemName: string, price: number) {
    this.itemName = itemName;
    this.price = price;
  }

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

class ComponentDecorator extends BaseComponent {
  baseComponent: BaseComponent;

  constructor(itemName: string, price: number, baseComponent: BaseComponent) {
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
}

const simpleDesktop = new BaseComponent("Intel Pentium", 100);
const desktopKeyboard = new ComponentDecorator("Keyboard", 20, simpleDesktop);
const desktopKeyboardMouse = new ComponentDecorator(
  "Mouse",
  10,
  desktopKeyboard
);
const desktopMonitor = new ComponentDecorator("LCD Monitor", 65, simpleDesktop);
const desktopKeyboardMouseMonitor = new ComponentDecorator(
  "LCD Monitor",
  65,
  desktopKeyboardMouse
);

simpleDesktop.printProduct();
desktopKeyboard.printProduct();
desktopKeyboardMouse.printProduct();
desktopMonitor.printProduct();
desktopKeyboardMouseMonitor.printProduct();
