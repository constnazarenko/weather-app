import { put, takeLatest } from "redux-saga/effects";
import { REMOVE_LOADING_SPINNER, SET_LOADING_SPINNER } from "../const";
import { LoadDBAction } from "./actions";
import { City } from "./component";
import { DB_FETCH_JSON, DB_FETCH_JSON_SUCCESS } from "./const";

const fetchWeather = (url) => fetch(url).then((r) => r.json());

//TODO: this API fetch definitely needs improvement and better fail checks
//TODO: also this API is not suitable for such usage, thus it is used here for demo purposes only
const fetchAttributes = (url) =>
  fetch(url)
    .then((r) => r.json())
    .then((r) => {
      const photo =
        r._embedded?.["city:search-results"]?.[0]?._embedded?.["city:item"]
          ._embedded?.["city:urban_area"]?._embedded?.["ua:images"]?.photos?.[0]
          .image.mobile;
      const tzOffset =
        r._embedded?.["city:search-results"]?.[0]?._embedded?.["city:item"]
          ._embedded?.["city:timezone"]?._embedded?.["tz:offsets-now"]
          ?.total_offset_min;
      return { photo, tzOffset };
    });

const getCitysPhotos = async (city, key): Promise<City> => {
  let weather;
  try {
    weather = await fetchWeather(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
    );
  } catch (e) {
    weather = { error: "city not found" };
  }
  const attrs = await fetchAttributes(
    `https://api.teleport.org/api/cities/?search=${city}&embed=city:search-results/city:item/city:urban_area/ua:images&embedcity:timezone&embed=city:search-results/city:item/city:timezone/tz:offsets-now`
  );
  return { name: city, weather, photo: attrs.photo, tzOffset: attrs.tzOffset };
};

const searchCitiesWithPhotos = (city: string, key: string): Promise<City[]> => {
  return fetch(
    `https://api.teleport.org/api/cities/?search=${city}&embed=city:search-results/city:item/city:urban_area/ua:images&embedcity:timezone&embed=city:search-results/city:item/city:timezone/tz:offsets-now`
  )
    .then((r) => r.json())
    .then((r) => {
      return r._embedded?.["city:search-results"].map(async (city) => {
        const name = city._embedded?.["city:item"]?.full_name;

        let weather;
        try {
          weather = await fetchWeather(
            `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${key}`
          );
        } catch (e) {
          weather = { error: "city not found" };
        }
        return {
          weather,
          name,
          photo:
            city._embedded?.["city:item"]?._embedded?.["city:urban_area"]
              ?._embedded?.["ua:images"]?.photos?.[0]?.image.mobile,
          tzOffset:
            city._embedded?.["city:item"]?._embedded?.["city:timezone"]
              ?._embedded?.["tz:offsets-now"]?.total_offset_min,
        };
      });
    });
};

function* load(action: LoadDBAction) {
  yield put({ type: SET_LOADING_SPINNER });

  //TODO: key should be hidden on backend or frontback. But since we don't have one and it's only an example...
  const key = "1827d8bc8210ab01b28b1546b538dd9d";

  let requests = [];
  if (action.payload.cityName) {
    requests = yield searchCitiesWithPhotos(action.payload.cityName, key);
  } else {
    const cities = [
      "Kyiv",
      "Tel Aviv",
      "Paris",
      "London",
      "New York",
      "Madrid",
      "Warsaw",
      "Sidney",
      "Berlin",
    ];
    for (let i = 0; i < cities.length; i++) {
      requests.push(getCitysPhotos(cities[i], key));
    }
  }
  const results = yield Promise.all(requests);

  yield put({ type: DB_FETCH_JSON_SUCCESS, payload: results });

  yield put({ type: REMOVE_LOADING_SPINNER });
}

async function sleep(ms: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("wake up!");
    }, ms);
  });
}
export default function* sagas() {
  yield takeLatest(DB_FETCH_JSON, load);
}
