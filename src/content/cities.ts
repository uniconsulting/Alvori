export type RussiaCity = {
  value: string;
  label: string;
  lat: number;
  lon: number;
};

export const RUSSIA_CITIES: RussiaCity[] = [
  { value: 'ulyanovsk', label: 'Ульяновск', lat: 54.3142, lon: 48.4031 },
  { value: 'moscow', label: 'Москва', lat: 55.7558, lon: 37.6176 },
  { value: 'saint-petersburg', label: 'Санкт-Петербург', lat: 59.9343, lon: 30.3351 },
  { value: 'kazan', label: 'Казань', lat: 55.7961, lon: 49.1064 },
  { value: 'nizhny-novgorod', label: 'Нижний Новгород', lat: 56.3269, lon: 44.0065 },
  { value: 'samara', label: 'Самара', lat: 53.1959, lon: 50.1008 },
  { value: 'saratov', label: 'Саратов', lat: 51.5331, lon: 46.0342 },
  { value: 'volgograd', label: 'Волгоград', lat: 48.708, lon: 44.5133 },
  { value: 'voronezh', label: 'Воронеж', lat: 51.672, lon: 39.1843 },
  { value: 'yaroslavl', label: 'Ярославль', lat: 57.6261, lon: 39.8845 },
  { value: 'tver', label: 'Тверь', lat: 56.8587, lon: 35.9176 },
  { value: 'tula', label: 'Тула', lat: 54.1931, lon: 37.6175 },
  { value: 'ryazan', label: 'Рязань', lat: 54.6292, lon: 39.7364 },
  { value: 'vladimir', label: 'Владимир', lat: 56.1291, lon: 40.4066 },
  { value: 'ivanovo', label: 'Иваново', lat: 56.9972, lon: 40.9714 },
  { value: 'kostroma', label: 'Кострома', lat: 57.768, lon: 40.9269 },
  { value: 'kaluga', label: 'Калуга', lat: 54.5138, lon: 36.2612 },
  { value: 'smolensk', label: 'Смоленск', lat: 54.7826, lon: 32.0453 },
  { value: 'belgorod', label: 'Белгород', lat: 50.5954, lon: 36.5879 },
  { value: 'kursk', label: 'Курск', lat: 51.7304, lon: 36.1926 },
  { value: 'lipetsk', label: 'Липецк', lat: 52.6102, lon: 39.5947 },
  { value: 'tambov', label: 'Тамбов', lat: 52.7212, lon: 41.4523 },
  { value: 'penza', label: 'Пенза', lat: 53.1959, lon: 45.0183 },
  { value: 'saransk', label: 'Саранск', lat: 54.1838, lon: 45.1749 },
  { value: 'cheboksary', label: 'Чебоксары', lat: 56.1439, lon: 47.2489 },
  { value: 'yoshkar-ola', label: 'Йошкар-Ола', lat: 56.6324, lon: 47.8958 },
  { value: 'kirov', label: 'Киров', lat: 58.6035, lon: 49.6679 },
  { value: 'perm', label: 'Пермь', lat: 58.0105, lon: 56.2502 },
  { value: 'izhevsk', label: 'Ижевск', lat: 56.8526, lon: 53.2045 },
  { value: 'naberezhnye-chelny', label: 'Набережные Челны', lat: 55.7436, lon: 52.3958 },
  { value: 'ufa', label: 'Уфа', lat: 54.7388, lon: 55.9721 },
  { value: 'ekaterinburg', label: 'Екатеринбург', lat: 56.8389, lon: 60.6057 },
  { value: 'chelyabinsk', label: 'Челябинск', lat: 55.1644, lon: 61.4368 },
  { value: 'tyumen', label: 'Тюмень', lat: 57.153, lon: 65.5343 },
  { value: 'kurgan', label: 'Курган', lat: 55.4444, lon: 65.3161 },
  { value: 'orenburg', label: 'Оренбург', lat: 51.7682, lon: 55.0969 },
  { value: 'magnitogorsk', label: 'Магнитогорск', lat: 53.4072, lon: 58.9791 },
  { value: 'rostov-on-don', label: 'Ростов-на-Дону', lat: 47.2357, lon: 39.7015 },
  { value: 'krasnodar', label: 'Краснодар', lat: 45.0355, lon: 38.9753 },
  { value: 'stavropol', label: 'Ставрополь', lat: 45.0448, lon: 41.969 },
  { value: 'astrakhan', label: 'Астрахань', lat: 46.3497, lon: 48.04 },
  { value: 'sochi', label: 'Сочи', lat: 43.5855, lon: 39.7231 },
  { value: 'novorossiysk', label: 'Новороссийск', lat: 44.7235, lon: 37.7686 },
  { value: 'kaliningrad', label: 'Калининград', lat: 54.7104, lon: 20.4522 },
  { value: 'murmansk', label: 'Мурманск', lat: 68.9585, lon: 33.0827 },
  { value: 'arkhangelsk', label: 'Архангельск', lat: 64.5393, lon: 40.5187 },
  { value: 'petrozavodsk', label: 'Петрозаводск', lat: 61.7849, lon: 34.3469 },
  { value: 'pskov', label: 'Псков', lat: 57.8194, lon: 28.3318 },
  { value: 'veliky-novgorod', label: 'Великий Новгород', lat: 58.5215, lon: 31.2755 },
  { value: 'vologda', label: 'Вологда', lat: 59.2205, lon: 39.8915 },
  { value: 'cherepovets', label: 'Череповец', lat: 59.1269, lon: 37.9092 },
];

export function findCityByValue(value: string) {
  return RUSSIA_CITIES.find((city) => city.value === value);
}
