import axios from "./axios";

const fetcher = (url: any) => axios.get(url).then((d) => d.data);
export default fetcher;