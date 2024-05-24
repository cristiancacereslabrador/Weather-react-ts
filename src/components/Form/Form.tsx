import { useState, ChangeEvent, FormEvent, FocusEvent } from "react";
import { countries } from "../../data/countries";
import styles from "./Form.module.css";
import { SearchType } from "../../types";
import Alert from "../Alert/Alert";

type FormProps = {
  fetchWeather: (search: SearchType) => Promise<void>;
  setNotFound: (value: boolean) => void;
};

export default function Form({ fetchWeather, setNotFound }: FormProps) {
  const [search, setSearch] = useState<SearchType>({
    city: "San Cristobal",
    country: "VE",
  });
  const [alert, setAlert] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    if (e.target.name === "city" && e.target.value === "Las Vegas") {
      setSearch((prev) => ({ ...prev, city: "" }));
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (e.target.name === "city" && e.target.value === "") {
      setSearch((prev) => ({ ...prev, city: "Las Vegas" }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setNotFound(false); //MOD
    e.preventDefault();
    if (Object.values(search).includes("")) {
      setAlert("Todos los campos son obligatorios");
      return;
    }
    try {
      await fetchWeather(search);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {alert && <Alert>{alert}</Alert>}
      <div className={styles.field}>
        <label htmlFor="city" className={styles.title}>
          City:
        </label>
        <input
          id="city"
          type="text"
          name="city"
          // placeholder="City"
          value={search.city}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="country" className={styles.title}>
          Country:
        </label>
        <select
          name="country"
          id="country"
          value={search.country}
          onChange={handleChange}
        >
          <option value="">-- Select a Country --</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      <input className={styles.submit} type="submit" value="Check Climate" />
    </form>
  );
}
