// Interface only used to define weather object
interface IWeatherObject {
  temp: number;
  humidity: number;
  pressure: number;
}

// Abstract class simulating interface to program displays to
abstract class IWeatherDisplay {
  weatherData: IWeatherData;

  constructor(weatherData: WeatherData) {
    this.weatherData = weatherData;
  }

  abstract updateState(): void;
  abstract updateDisplay(): void;
}

abstract class IWeatherData {
  temp: number;
  humidity: number;
  pressure: number;
  subscriberList: IWeatherDisplay[];

  constructor(subscriberList: IWeatherDisplay[] = []) {
    this.temp = 0;
    this.humidity = 0;
    this.pressure = 0;
    this.subscriberList = subscriberList;
  }

  abstract getTemp(): number;
  abstract getHumidity(): number;
  abstract getPressure(): number;
  abstract getWeather(): IWeatherObject;

  abstract setWeather(temp: number, humidity: number, pressure: number): void;
  abstract stateChanged(): void;
  abstract notifyListeners(): void;

  abstract addSubscriber(subscriber: IWeatherDisplay): void;
  abstract removeSubscriber(subscriber: IWeatherDisplay): void;
}

class WeatherData extends IWeatherData {
  setWeather(temp: number, humidity: number, pressure: number) {
    this.temp = temp;
    this.humidity = humidity;
    this.pressure = pressure;
    this.stateChanged();
  }

  // Listeners are notified of changes here
  notifyListeners(): void {
    this.subscriberList.forEach((display) => {
      display.updateState();
    });
  }

  // Any time state is changed this method is called
  stateChanged(): void {
    this.notifyListeners();
  }

  // Add or remove subscribers with next 2 methods
  addSubscriber(subscriber: IWeatherDisplay): void {
    this.subscriberList.push(subscriber);
  }

  removeSubscriber(subscriber: IWeatherDisplay): void {
    const elIndex = this.subscriberList.indexOf(subscriber);
    this.subscriberList.splice(elIndex, 1);
  }

  // Simple getter methods for listeners to pull data they need
  getHumidity(): number {
    return this.humidity;
  }
  getTemp(): number {
    return this.temp;
  }

  getPressure(): number {
    return this.pressure;
  }
  getWeather(): IWeatherObject {
    return {
      temp: this.temp,
      humidity: this.humidity,
      pressure: this.pressure,
    };
  }
}

class CurrentWeatherDisplay extends IWeatherDisplay {
  currentTemp: number | undefined = undefined;
  currentHumidity: number | undefined = undefined;
  currentPressure: number | undefined = undefined;

  updateState() {
    if (this.weatherData !== undefined) {
      this.currentTemp = this.weatherData.getTemp();
      this.currentHumidity = this.weatherData.getHumidity();
      this.currentPressure = this.weatherData.getPressure();
    }
    this.updateDisplay();
  }

  updateDisplay() {
    const displayData: string = `
    -----
    Current Temp: ${this.currentTemp} C
    Current Humidity: ${this.currentHumidity}%
    Current Pressure: ${this.currentPressure}hpa
    -----
    `;
    console.log(displayData);
  }
}

class AverageWeatherDisplay extends IWeatherDisplay {
  tempHistory: number[] = [];
  humidityHistory: number[] = [];
  pressureHistory: number[] = [];

  updateState() {
    this.tempHistory.push(this.weatherData.getTemp());
    this.humidityHistory.push(this.weatherData.getHumidity());
    this.pressureHistory.push(this.weatherData.getPressure());
    this.updateDisplay();
  }

  getAverage(dataSet: number[]): number {
    return Number(
      (dataSet.reduce((a, b) => a + b) / dataSet.length).toFixed(2)
    );
  }

  updateDisplay() {
    const displayData: string = `
    -----
    Average Temp: ${this.getAverage(this.tempHistory)} C
    Average Humidity: ${this.getAverage(this.humidityHistory)}%
    Average Pressure: ${this.getAverage(this.pressureHistory)}hpa
    -----
      `;
    console.log(displayData);
  }
}

function mainObserver() {
  const weatherData = new WeatherData();
  const currentWeatherDisplay = new CurrentWeatherDisplay(weatherData);
  const averageWeatherDisplay = new AverageWeatherDisplay(weatherData);

  weatherData.addSubscriber(currentWeatherDisplay);
  weatherData.addSubscriber(averageWeatherDisplay);

  weatherData.setWeather(30, 90, 1090);
  weatherData.setWeather(24, 70, 700);

  weatherData.removeSubscriber(currentWeatherDisplay);
  weatherData.setWeather(16, 42, 900);

  weatherData.addSubscriber(currentWeatherDisplay);
  weatherData.setWeather(10, 67, 1230);
}

mainObserver();
