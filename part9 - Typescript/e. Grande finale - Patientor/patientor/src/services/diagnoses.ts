import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Diagnose } from "../types";

const getAll = () => axios.get<Diagnose[]>(`${apiBaseUrl}/diagnoses`).then(response => response.data);

export default {
    getAll
};